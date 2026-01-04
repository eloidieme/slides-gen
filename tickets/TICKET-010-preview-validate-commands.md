# TICKET-010: Preview and Validate Commands

## Priority
MEDIUM

## Status
Pending

## Description
Implement the preview and validate commands for development workflow.

## Dependencies
- TICKET-006 (CLI Framework)
- TICKET-009 (Config Loader)

## Acceptance Criteria

### Preview Command
- [ ] Opens generated HTML in default browser
- [ ] Finds HTML file in output directory
- [ ] Handles missing file gracefully
- [ ] Cross-platform (macOS, Linux, Windows)

### Validate Command
- [ ] Validates config.yaml syntax and structure
- [ ] Checks content directory exists
- [ ] Validates markdown files can be parsed
- [ ] Reports specific issues found
- [ ] Exit code 0 for valid, 1 for invalid

## Technical Details

### Files to Create

#### `src/cli/commands/preview.ts`
```typescript
import { Command } from 'commander';
import open from 'open'; // or use native methods

export const previewCommand = new Command('preview')
  .description('Open generated slides in browser')
  .argument('[file]', 'HTML file to preview', './output/slides.html')
  .action(async (file: string) => {
    // Open in browser
  });
```

#### `src/cli/commands/validate.ts`
```typescript
import { Command } from 'commander';

export const validateCommand = new Command('validate')
  .description('Validate content and configuration')
  .argument('[content-dir]', 'Content directory', './content')
  .option('-c, --config <path>', 'Config file', './config.yaml')
  .action(async (contentDir, options) => {
    // Validate config and content
  });
```

## Definition of Done

- [ ] Preview command opens browser
- [ ] Validate command checks all aspects
- [ ] Both commands tested
- [ ] Error messages helpful
- [ ] Works cross-platform

## Estimated Complexity
Low

## Notes
- Preview: use `open` package or platform-specific commands
- Validate: reuse config-loader and analyzer validation
