/**
 * Logger utility with colored output
 */

/* eslint-disable no-console */
import chalk from 'chalk';

/**
 * Styled logger for CLI output
 */
export const logger = {
  /**
   * Log an informational message
   * @param msg - Message to log
   */
  info: (msg: string): void => {
    console.log(chalk.blue('ℹ'), msg);
  },

  /**
   * Log a success message
   * @param msg - Message to log
   */
  success: (msg: string): void => {
    console.log(chalk.green('✓'), msg);
  },

  /**
   * Log an error message
   * @param msg - Message to log
   */
  error: (msg: string): void => {
    console.error(chalk.red('✗'), msg);
  },

  /**
   * Log a warning message
   * @param msg - Message to log
   */
  warn: (msg: string): void => {
    console.warn(chalk.yellow('⚠'), msg);
  },

  /**
   * Log a debug message (dimmed)
   * @param msg - Message to log
   */
  debug: (msg: string): void => {
    console.log(chalk.dim(msg));
  },
};
