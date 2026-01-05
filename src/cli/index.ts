#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
  .name('slides-gen')
  .description('AI-powered slide generation from markdown')
  .version('0.1.0');

program.parse();
