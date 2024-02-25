import * as env from '../../environment';

export class GoogleAuthProvider implements IAuthProvider {
	private static readonly GOOGLE_AUTH_URL =
		'https://accounts.google.com/o/oauth2/v2/auth';
	private static readonly GOOGLE_SCOPE =
		'https://www.googleapis.com/auth/userinfo.profile';
	private static readonly GOOGLE_TOKEN_URL =
		'https://oauth2.googleapis.com/token';
	private static readonly GOOGLE_CLIENT_ID = env.values.GOOGLE_CLIENT_ID;

	getAuthUrl(): string {
		const params = new URLSearchParams({
			response_type: 'code',
			client_id: env.values.GOOGLE_CLIENT_ID,
			redirect_uri: encodeURIComponent(env.values.GOOGLE_REDIRECT_URI),
			scope: encodeURIComponent(GoogleAuthProvider.GOOGLE_SCOPE),
			access_type: 'online',
		});

		return `${GoogleAuthProvider.GOOGLE_AUTH_URL}?${params.toString()}`;
	}

	async getToken(code: string): Promise<any> {
		return null;
	}

	async getUserProfile(accessToken: string): Promise<IUserProfile> {
		return {
			id: '',
			name: '',
			email: '',
			avatarUrl: '',
		};
	}
}
