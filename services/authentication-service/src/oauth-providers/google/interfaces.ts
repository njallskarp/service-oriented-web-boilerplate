export interface GoogleTokenResult {
	access_token: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
	id_token: string;
}

export interface GoogleUserResult {
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	locale: string;
	email: string;
	verified_email: boolean;
	id: string;
	iss: string;
	azp: string;
	aud: string;
	sub: string;
	exp: number;
	iat: number;
}
