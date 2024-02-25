import { read } from '@packages/environment';
export * from '@packages/environment';

type RequiredEnvironmentVariables =
	| 'API_PORT'
	| 'GOOGLE_CLIENT_ID'
	| 'GOOGLE_CLIENT_SECRET'
	| 'GOOGLE_REDIRECT_URI'
	| 'WEB_APP_URL';

type OptionalEnvironmentVariables = never;

export const values = read<RequiredEnvironmentVariables, OptionalEnvironmentVariables>(
	{
		API_PORT: 'The port rest-api will listen to.',
		GOOGLE_CLIENT_ID:
			'Unique identifier for your application, provided by Google when you register your application in the Google Cloud Console',
		GOOGLE_CLIENT_SECRET:
			" A secret key provided by Google to authenticate your application, used in the OAuth flow to secure communication with Google's servers.",
		GOOGLE_REDIRECT_URI:
			'The URL to which Google will redirect users after they have authenticated, must match one of the URIs registered in the Google Cloud Console.',
		WEB_APP_URL: 'The URL to redirect to on authentication success or failure',
	},
	{
		// no optional env variables
	}
);
