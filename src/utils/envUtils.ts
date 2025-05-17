
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
  
  // Special case for OpenAI API key
  if (key === 'OPENAI_API_KEY') {
    return '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';
  }
  
  return defaultValue;
};
