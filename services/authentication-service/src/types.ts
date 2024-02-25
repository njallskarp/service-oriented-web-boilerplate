export const authProviders = {
	google: 'Oauth2 by Google',
};

export type OAauthProviders = keyof typeof authProviders;

export interface AuthProvider {
	getAuthUrl: () => string;
	getToken: (code: string) => Promise<TokenData>;
	getUserProfileFromServer: (accessToken: string, idToken: string) => Promise<UserResponseFromToken>;
}

export interface TokenData {
	accessToken: string;
	expiresIn: number;
	scope: string;
	idToken: string;
	provider: OAauthProviders;
	refreshToken: string;
}

export interface UserResponseFromToken {
	oauth: {
		iss: string;
		azp: string;
		aud: string;
		sub: string;
		exp: number;
		iat: number;
	};
	email: string;
	emailVerified: boolean;
	picture?: string;
	name: string;
	givenName?: string;
	familyName?: string;
	locale?: string;
}
