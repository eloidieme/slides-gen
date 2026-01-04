# TICKET-008: Generate Command Implementation

## Priority
CRITICAL - Core functionality

## Status
Pending

## Description
Implement the main `slides-gen generate` command that orchestrates the entire slide generation workflow.

## Dependencies
- TICKET-002 (Core Types)
- TICKET-003 (Content Analyzer)
- TICKET-004 (Marp Generator)
- TICKET-005 (Marp Compiler)
- TICKET-006 (CLI Framework)
- TICKET-009 (Config Loader)

## Acceptance Criteria

- [ ] Loads config from file
- [ ] Analyzes content directory
- [ ] Generates Marp markdown
- [ ] Compiles to output formats
- [ ] Shows progress with spinners
- [ ] Handles all error scenarios
- [ ] Supports all CLI options
- [ ] Validates inputs before processing
- [ ] Integration test for full workflow

## Technical Details

### Files to Create

#### `src/cli/commands/generate.ts`
```typescript
import { Command } from 'commander';

export const generateCommand = new Command('generate')
  .description('Generate slides from markdown content')
  .argument('[content-dir]', 'Content directory', './content')
  .option('-c, --config <path>', 'Config file', './config.yaml')
  .option('-o, --output <path>', 'Output directory', './output')
  .option('-f, --format <format>', 'Output format (html|pdf|all)', 'html')
  .option('-t, --theme <theme>', 'Theme override')
  .option('--no-compile', 'Generate markdown only')
  .action(async (contentDir, options) => {
    // Orchestrate: load config -> analyze -> generate -> compile
  });
```

## Workflow

1. Load and validate config
2. Create ContentAnalyzer and analyze content
3. Create MarpGenerator and generate markdown
4. Save markdown to temp/output
5. If compile flag, invoke MarpCompiler
6. Show success message with output paths

## Definition of Done

- [ ] Full workflow working end-to-end
- [ ] All options supported
- [ ] Progress indicators shown
- [ ] Error messages helpful
- [ ] Integration test passes
- [ ] Can generate real presentation

## Estimated Complexity
Medium-High - Orchestrates multiple components
