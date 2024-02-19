import { Environments } from './environment-types';

export const isProductionEnvironment = (): boolean => {
	return process.env.NODE_ENV === Environments.PRODUCTION;
};

export const isTestEnvironment = (): boolean => {
	return process.env.NODE_ENV === Environments.TEST;
};

export const isDevelopmentEnvironment = (): boolean => {
	return process.env.NODE_ENV === Environments.DEVELOPMENT;
};

export const isDryRun = (): boolean => {
	const DRY_RUN_FLAG = 'Y';
	return process.env.DRY_RUN === DRY_RUN_FLAG;
};
