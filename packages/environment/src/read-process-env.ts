import { exit } from 'process';
import dotenv from 'dotenv';
import {
	ConstStringUnion,
	Environment,
	EnvkeysDescription,
	PartialEnvironment,
} from './types';

const getRequiredEnvValue = <RequiredKeys extends ConstStringUnion>(
	key: RequiredKeys,
	requiredKeysDescription: Record<RequiredKeys, string>
): string => {
	if (!(key in process.env)) {
		console.error(
			`Stopping process. Please add '${key}' (${requiredKeysDescription[key as RequiredKeys]}) to your environment.`
		);
		exit(1);
	}
	return process.env[key] as string;
};

const getOptionalEnvValue = <OptionalKeys extends ConstStringUnion>(
	key: OptionalKeys
): string | undefined => {
	return process.env[key];
};

export const getValues = <
	RequiredKeys extends ConstStringUnion,
	OptionalKeys extends ConstStringUnion,
>(
	requiredKeysDescription: EnvkeysDescription<RequiredKeys>,
	optionalKeysDescription: EnvkeysDescription<OptionalKeys>
): Environment<RequiredKeys, OptionalKeys> => {
	const output: Partial<Record<RequiredKeys | OptionalKeys, string>> = {};

	for (const key in requiredKeysDescription) {
		output[key as RequiredKeys] = getRequiredEnvValue<RequiredKeys>(
			key as RequiredKeys,
			requiredKeysDescription
		);
	}

	for (const key in optionalKeysDescription) {
		const value = getOptionalEnvValue(key as OptionalKeys);
		if (value !== undefined) {
			output[key as OptionalKeys] = value;
		}
	}

	return output as Environment<RequiredKeys, OptionalKeys>;
};
