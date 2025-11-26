/**
 * Retrieves an environment variable by key.
 *
 * An empty string ("") is treated as *no default*,
 * and throws error.
 *
 * @param key - The name of the environment variable.
 * @param defaultValue - Optional fallback value. Must be a non-empty string.
 * @returns The resolved environment variable value.
 * @throws If the environment variable is missing and no valid default is provided.
 */

export const getEnv = (key: string, defaultValue: string = ""): string => {
	const value = process.env[key];

	if (value === undefined) {
		if (defaultValue != "") {
			return defaultValue;
		}
		throw new Error(`Enviroment variable ${key} is not set`);
	}
	return value;
};
