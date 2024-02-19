import { type AllEnvironmentVariabls, type Environment } from './config';
import { readEnvironment } from './read-process-env';
import { exit } from 'process';
import {
	isDevelopmentEnvironment,
	isProductionEnvironment,
	isTestEnvironment,
} from './environment-checkers';

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

console.log(
	`Attempting to load environment variables (type='${process.env.NODE_ENV}').`
);

const ENV_FILE_PATH = '.env';
const NATIVE_ENV_FLAG = 'Y';
const optionalEnvFilePath =
	process.env.IS_NATIVE === NATIVE_ENV_FLAG ? ENV_FILE_PATH : undefined;
if (optionalEnvFilePath !== undefined) {
	console.log(
		'Development environment is native (reading from statically configured .env file)'
	);
}

let environment: Environment;
// development environment is supplied to NODE_ENV by docker-compose
if (isDevelopmentEnvironment()) {
	environment = readEnvironment(optionalEnvFilePath);
}
// testing environment reads from an .env.test file
else if (isTestEnvironment()) {
	const TEST_ENV_FILE_PATH = '.env.test';
	environment = readEnvironment(TEST_ENV_FILE_PATH);
}
// production environment is supplied by IaC
else if (isProductionEnvironment()) {
	environment = readEnvironment(optionalEnvFilePath);
	// exit if environment is unknown
} else {
	console.error(`Unknown environment specified '${process.env.NODE_ENV}'`);
	exit(1);
}

const SUFFIXES_TO_MASK = ['SECRET', 'TOKEN', 'KEY'];

console.log('Successfully loaded environment variables:');
for (const key in environment) {
	const shouldMask = SUFFIXES_TO_MASK.some((suffix) => key.includes(suffix));
	const printValue = shouldMask
		? '****' + environment[key as AllEnvironmentVariabls]?.slice(-4)
		: environment[key as AllEnvironmentVariabls];
	console.log(`\t ${key} -> ${printValue}`);
}
console.log('');

export const values = environment;
