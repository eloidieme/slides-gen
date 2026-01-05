/**
 * Preview command - Preview generated slides
 */

import { Command } from 'commander';
import { logger } from '../utils/logger.js';

export const previewCommand = new Command('preview')
  .description('Preview generated slides in browser')
  .argument('[file]', 'HTML file to preview')
  .option('-p, --port <port>', 'Port number', '3000')
  .action((file: string, options: { port: string }) => {
    logger.info(`Starting preview server on port ${options.port}`);
    if (file) {
      logger.debug(`File: ${file}`);
    }
    logger.warn('Command not yet implemented (TICKET-010)');
  });
