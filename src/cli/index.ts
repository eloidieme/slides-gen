#!/usr/bin/env node
import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { generateCommand } from './commands/generate.js';
import { previewCommand } from './commands/preview.js';
import { validateCommand } from './commands/validate.js';

const program = new Command();

program
  .name('slides-gen')
  .description('AI-powered slide generation from markdown')
  .version('0.1.0');

// Add commands
program.addCommand(initCommand);
program.addCommand(generateCommand);
program.addCommand(previewCommand);
program.addCommand(validateCommand);

program.parse();
