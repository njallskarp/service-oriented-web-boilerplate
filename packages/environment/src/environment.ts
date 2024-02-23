import { getValues } from './read-process-env';
import { isTestEnvironment, shouldReadNative } from './environment-checkers';
import type {
	ConstStringUnion,
	Environment,
	EnvkeysDescription,
} from './types';
import dotenv from 'dotenv';

// export environment checkers to be used throughout application
export * from './environment-checkers';

/**
 * This file is responsible for checking the environment
 * and loading environment variables from the correct source
 * based on the value of NODE_ENV
 *
 * The default behavior is to read environment variables that
 * have already been passed to NODE_ENV. This is done by
 * docker, docker-compose, and github work flows to name a few.
 *
 * There are a few exceptions. Sometimes users might want to request
 * to run native (environment variable IS_NATIVE is set to 'Y'). This means
 * that they want to read from a `.env` file instead.
 *
 * During testing the environment variables should be read from `.env.test`.
 */

const optionallyReadNativeEnv = () => {
	if (isTestEnvironment()) {
		const TEST_ENV_FILE_PATH = '.env.test';
		dotenv.config({
			path: TEST_ENV_FILE_PATH,
		});
	} else if (shouldReadNative()) {
		const ENV_FILE_PATH = '.env';
		console.log(
			'Development environment is native (reading from statically configured .env file)'
		);
		dotenv.config({
			path: ENV_FILE_PATH,
		});
	}
};

const consoleLogEnv = <
	RequiredKeys extends ConstStringUnion,
	OptionalKeys extends ConstStringUnion,
>(
	environment: Environment<RequiredKeys, OptionalKeys>
) => {
	const SUFFIXES_TO_MASK = ['SECRET', 'TOKEN', 'KEY'];

	console.log('Successfully loaded environment variables:');
	for (const key in environment) {
		const shouldMask = SUFFIXES_TO_MASK.some((suffix) =>
			key.includes(suffix)
		);
		const printValue = shouldMask
			? '****' +
				environment[key as RequiredKeys | OptionalKeys]?.slice(-4)
			: environment[key as RequiredKeys | OptionalKeys];
		console.log(`\t ${key} -> ${printValue}`);
	}
	console.log('');
};

export function read<
	RequiredKeys extends ConstStringUnion,
	OptionalKeys extends ConstStringUnion,
>(
	requiredKeysDescription: EnvkeysDescription<RequiredKeys>,
	optionalKeysDescription: EnvkeysDescription<OptionalKeys>
): Environment<RequiredKeys, OptionalKeys> {
	console.log(
		`Attempting to load environment variables (type='${process.env.NODE_ENV}').`
	);

	optionallyReadNativeEnv();

	const environment: Environment<RequiredKeys, OptionalKeys> = getValues(
		requiredKeysDescription,
		optionalKeysDescription
	);

	consoleLogEnv(environment);

	return environment;
}
