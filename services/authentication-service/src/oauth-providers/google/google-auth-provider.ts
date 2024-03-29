import { type AuthProvider, type OAauthProviders, type TokenData, type UserResponseFromToken } from '../../types';
import * as env from '../../environment';
import { type GoogleTokenResult, type GoogleUserResult } from './interfaces';
import axios from 'axios';

/**
 * Provides authentication services using Google's OAuth2 for web server applications.
 * This class contains methods to generate the authentication URL, exchange the authorization
 * code for tokens, and retrieve user information from Google's servers using the obtained tokens.
 */
export class GoogleAuthProvider implements AuthProvider {
	// URLs
	private static readonly AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
	private static readonly TOKEN_URL = 'https://oauth2.googleapis.com/token';
	private static readonly USER_INFO_URL = ' https://www.googleapis.com/oauth2/v1/userinfo';

	// scopes
	private static readonly SCOPES = [
		'https://www.googleapis.com/auth/userinfo.profile',
		'https://www.googleapis.com/auth/userinfo.email',
	];

	/**
	 * Generates the URL to redirect users for Google's OAuth2 authentication.
	 * @returns The URL where users can authenticate with their Google account.
	 */
	getAuthUrl(): string {
		const RESPONSE_TYPE = 'code';
		const ACCESS_TYPE = 'online';

		const params = new URLSearchParams({
			response_type: RESPONSE_TYPE,
			client_id: env.values.GOOGLE_CLIENT_ID,
			redirect_uri: env.values.GOOGLE_REDIRECT_URI,
			scope: GoogleAuthProvider.SCOPES.join(' '),
			access_type: ACCESS_TYPE,
		});

		return `${GoogleAuthProvider.AUTH_URL}?${params.toString()}`;
	}

	/**
	 * Exchanges the authorization code for an access token, ID token, and refresh token.
	 * @param code - The authorization code received from Google after user authentication.
	 * @returns A Promise that resolves to the token data including access token, ID token, refresh token, and others.
	 */
	async getToken(code: string): Promise<TokenData> {
		const GRANT_TYPE = 'authorization_code';
		const CONTENT_TYPE_HEADER_NAME = 'Content-Type';
		const CONTENT_TYPE_VALUE = 'application/x-www-form-urlencoded';

		const params = new URLSearchParams({
			code,
			client_id: env.values.GOOGLE_CLIENT_ID,
			client_secret: env.values.GOOGLE_CLIENT_SECRET,
			grant_type: GRANT_TYPE,
			redirect_uri: env.values.GOOGLE_REDIRECT_URI,
		});

		const response = await axios.post<GoogleTokenResult>(GoogleAuthProvider.TOKEN_URL, params.toString(), {
			headers: {
				[CONTENT_TYPE_HEADER_NAME]: CONTENT_TYPE_VALUE,
			},
		});

		const PROVIDER: OAauthProviders = 'google';
		return {
			provider: PROVIDER,
			accessToken: response.data.access_token,
			expiresIn: response.data.expires_in,
			scope: response.data.scope,
			idToken: response.data.id_token,
			refreshToken: response.data.refresh_token,
		};
	}

	/**
	 * Retrieves the user's profile information from Google's servers using the access token and ID token.
	 * @param accessToken - The access token obtained from Google.
	 * @param idToken - The ID token obtained from Google.
	 * @returns A Promise that resolves to the user's profile information.
	 */
	async getUserProfileFromServer(accessToken: string, idToken: string): Promise<UserResponseFromToken> {
		const ALT_VALUE = 'json';
		const params = new URLSearchParams({
			alt: ALT_VALUE,
			access_token: accessToken,
		});

		const response = await axios.get<GoogleUserResult>(`${GoogleAuthProvider.USER_INFO_URL}?${params.toString()}`, {
			headers: {
				Authorization: `Bearer ${idToken}`,
			},
		});

		return {
			oauth: {
				iss: response.data.iss,
				azp: response.data.azp,
				aud: response.data.aud,
				sub: response.data.sub,
				exp: response.data.exp,
				iat: response.data.iat,
			},
			email: response.data.email,
			emailVerified: response.data.verified_email,
			picture: response.data.picture,
			name: response.data.name,
			givenName: response.data.given_name,
			familyName: response.data.family_name,
			locale: response.data.locale,
		};
	}
}
