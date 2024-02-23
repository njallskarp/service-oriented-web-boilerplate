import { read } from '@monorepo/environment';
export * from '@monorepo/environment';

type RequiredEnvironmentVariables = 'API_PORT' | 'DB_URL' | 'AUTH_SERVICE_URL';
type OptionalEnvironmentVariables = 'EXAMPLE';

export const values = read<
	RequiredEnvironmentVariables,
	OptionalEnvironmentVariables
>(
	{
		API_PORT: 'The port rest-api will listen to.',
		DB_URL: 'Connection string for the DB storing records for models',
		AUTH_SERVICE_URL: 'Url for the Auth Service',
	},
	{
		EXAMPLE: 'This is how you would add and describe an optional variable.',
	}
);
