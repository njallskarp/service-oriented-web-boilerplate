import { Environments } from './environment-types';

/**
 * Check if running in a production environment
 *
 * @returns true if environment is production
 */
export const isProductionEnvironment = (): boolean => {
	return process.env.NODE_ENV === Environments.PRODUCTION;
};

/**
 * Check if running in a test environment
 *
 * @returns true if environment is test
 */
export const isTestEnvironment = (): boolean => {
	return process.env.NODE_ENV === Environments.TEST;
};

/**
 * Check if running in a development environment
 *
 * @returns true if environment is development
 */
export const isDevelopmentEnvironment = (): boolean => {
	return process.env.NODE_ENV === Environments.DEVELOPMENT;
};

/**
 * Check if current execution is dry run
 *
 * @returns true if current execution is dry run
 */
export const isDryRun = (): boolean => {
	const DRY_RUN_FLAG = 'Y';
	return process.env.DRY_RUN === DRY_RUN_FLAG;
};

/**
 * Check if the environment should read from a native
 * configuration.
 *
 * @returns true if should read native
 */
export const shouldReadNative = (): boolean => {
	const NATIVE_ENV_FLAG = 'Y';
	return process.env.IS_NATIVE === NATIVE_ENV_FLAG;
};
