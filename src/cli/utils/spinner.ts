/**
 * Spinner utility for showing progress
 */

import ora, { Ora } from 'ora';

/**
 * Create and manage a spinner for long-running operations
 * @param text - Initial spinner text
 * @returns Ora spinner instance
 */
export function createSpinner(text: string): Ora {
  return ora(text);
}

/**
 * Run an async operation with a spinner
 * @param text - Spinner text
 * @param fn - Async function to execute
 * @returns Result of the async function
 */
export async function withSpinner<T>(
  text: string,
  fn: () => Promise<T>
): Promise<T> {
  const spinner = ora(text).start();
  try {
    const result = await fn();
    spinner.succeed();
    return result;
  } catch (error) {
    spinner.fail();
    throw error;
  }
}
