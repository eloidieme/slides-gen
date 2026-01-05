/**
 * Init command - Initialize a new slides project
 */

import { Command } from 'commander';
import { logger } from '../utils/logger.js';

export const initCommand = new Command('init')
  .description('Initialize a new slides project')
  .argument('[name]', 'Project name', 'my-slides')
  .action((name: string) => {
    logger.info(`Initializing project: ${name}`);
    logger.warn('Command not yet implemented (TICKET-007)');
  });
