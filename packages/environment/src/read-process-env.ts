import { exit } from 'process';
import {
	type ConstStringUnion,
	type Environment,
	type EnvkeysDescription,
} from './types';

/**
 * Read value from the node process environment. If
 * the value does not exist, then return undefined
 *
 *
 *
 * @param variableName The environment variable name
 * @returns the value or undefined
 */
const getEnvironmentVariableValue = (
	variableName: string
): string | undefined => {
	return process.env[variableName];
};

/**
 * Returns a validated environment object
 * with (at least) all the required environment
 * variables with values
 *
 * @param requiredKeysDescription A dictionary of environment variables (keys) with descriptions (values)
 * @param optionalKeysDescription A dictionary of environment variables (keys) with descriptions (values)
 * @returns
 */
export const getEnvironmentObject = <
	RequiredKeys extends ConstStringUnion,
	OptionalKeys extends ConstStringUnion,
>(
	requiredKeysDescription: EnvkeysDescription<RequiredKeys>,
	optionalKeysDescription: EnvkeysDescription<OptionalKeys>
): Environment<RequiredKeys, OptionalKeys> => {
	const output: Partial<Record<RequiredKeys | OptionalKeys, string>> = {};

	for (const key in requiredKeysDescription) {
		const value = getEnvironmentVariableValue(key);
		if (value === undefined) {
			console.error(
				`Stopping process. Please add '${key}' (${requiredKeysDescription[key]}) to your environment.`
			);
			exit(1);
		}
		output[key] = value;
	}

	for (const key in optionalKeysDescription) {
		const value = getEnvironmentVariableValue(key);
		if (value !== undefined) {
			output[key as OptionalKeys] = value;
		}
	}

	return output as Environment<RequiredKeys, OptionalKeys>;
};
