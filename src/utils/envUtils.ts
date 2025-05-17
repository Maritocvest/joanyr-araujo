
/**
 * Utility to get environment variables with fallbacks
 * @param key The environment variable key
 * @param defaultValue A fallback value if the env variable is not found
 * @returns The environment variable value or the default
 */
export const getEnvVariable = (key: string, defaultValue: string = ''): string => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }
  return defaultValue;
};
