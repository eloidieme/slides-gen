# TICKET-006: CLI Framework Setup

## Priority
HIGH

## Status
Pending

## Description
Set up Commander.js CLI framework with proper command structure, help text, and version info.

## Dependencies
- TICKET-001 (Project Setup)

## Acceptance Criteria

- [ ] Commander.js configured
- [ ] Version flag works (`--version`)
- [ ] Help flag works (`--help`)
- [ ] Command structure in place
- [ ] Logger utility with colors (chalk)
- [ ] Spinner utility (ora)
- [ ] Error handling middleware

## Technical Details

### Files to Create/Modify

#### `src/cli/index.ts`
```typescript
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

program.addCommand(initCommand);
program.addCommand(generateCommand);
program.addCommand(previewCommand);
program.addCommand(validateCommand);

program.parse();
```

#### `src/cli/utils/logger.ts`
```typescript
import chalk from 'chalk';

export const logger = {
  info: (msg: string) => console.log(chalk.blue('ℹ'), msg),
  success: (msg: string) => console.log(chalk.green('✓'), msg),
  error: (msg: string) => console.error(chalk.red('✗'), msg),
  warn: (msg: string) => console.warn(chalk.yellow('⚠'), msg),
};
```

## Implementation Steps (TDD)

1. **Test**: Create `tests/integration/cli.test.ts`
2. **Implement**: Set up Commander.js structure
3. **Test**: Test version and help output
4. **Implement**: Add logger and utilities

## Definition of Done

- [ ] CLI runs and shows help
- [ ] Version flag works
- [ ] Logger utility created
- [ ] Spinner utility created
- [ ] Command stubs in place

## Estimated Complexity
Low

## Notes
- Commands will be implemented in separate tickets
- Focus on structure here
