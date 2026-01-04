# TICKET-007: Init Command Implementation

## Priority
HIGH

## Status
Pending

## Description
Implement the `slides-gen init` command that scaffolds a new presentation project.

## Dependencies
- TICKET-001 (Project Setup)
- TICKET-006 (CLI Framework)

## Acceptance Criteria

- [ ] Creates project directory structure
- [ ] Copies default config.yaml template
- [ ] Creates sample content markdown file
- [ ] Creates output directory
- [ ] Creates .gitignore
- [ ] Shows success message with next steps
- [ ] Handles existing directory gracefully
- [ ] Validates project name
- [ ] Tests for all scenarios

## Technical Details

### Files to Create

#### `src/cli/commands/init.ts`
```typescript
import { Command } from 'commander';

export const initCommand = new Command('init')
  .description('Initialize a new slides project')
  .argument('[project-name]', 'Project name', 'my-slides')
  .action(async (projectName: string) => {
    // Implementation
  });
```

#### `templates/config.yaml`
Default configuration template

#### `templates/sample-content.md`
Sample markdown with all slide types

## Implementation Steps (TDD)

1. **Test**: Test project creation
2. **Implement**: Directory creation logic
3. **Test**: Test config file creation
4. **Implement**: Copy template files
5. **Test**: Test error handling (existing dir)
6. **Implement**: Error handling

## Definition of Done

- [ ] Command works end-to-end
- [ ] Creates valid project structure
- [ ] Template files included
- [ ] Error handling complete
- [ ] Tests passing

## Estimated Complexity
Low-Medium
