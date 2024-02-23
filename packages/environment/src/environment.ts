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
 * Reads environment values from file if either:
 * 	- user asks for native mode (read from .env)
 *  - user is running tests (read from .env.test)
 *
 * Otherwise, we assume that the process env already
 * contains the required environment variables.
 */
const optionallyReadNativeEnv = (): void => {
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

/**
 * Prints out all the environment variables while
 * masking out secrets, tokens, and keys.
 *
 * @param environment An environment dictionary
 */
const consoleLogEnv = <
	RequiredKeys extends ConstStringUnion,
	OptionalKeys extends ConstStringUnion,
>(
	environment: Environment<RequiredKeys, OptionalKeys>
): void => {
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

/**
 * Reads, validates, and returns env as a statically typed object.
 *
 * @param requiredKeysDescription A dictionary of environment variables (keys) with descriptions (values)
 * @param optionalKeysDescription A dictionary of environment variables (keys) with descriptions (values)
 * @returns
 */
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
