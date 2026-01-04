# TICKET-009: Configuration Loader

## Priority
HIGH

## Status
Pending

## Description
Implement configuration loader that reads and validates YAML config files.

## Dependencies
- TICKET-001 (Project Setup)
- TICKET-002 (Core Types)

## Acceptance Criteria

- [ ] Loads config from YAML file
- [ ] Validates config structure
- [ ] Provides sensible defaults
- [ ] Merges with CLI option overrides
- [ ] Clear error messages for invalid config
- [ ] Type-safe config object returned
- [ ] Tests for all scenarios

## Technical Details

### Files to Create

#### `src/cli/utils/config-loader.ts`
```typescript
import { readFile } from 'fs/promises';
import YAML from 'yaml';
import type { SlidesConfig } from '../../types/config.js';

export async function loadConfig(
  configPath: string
): Promise<SlidesConfig>;

export function getDefaultConfig(): SlidesConfig;

export function validateConfig(config: unknown): SlidesConfig;

export function mergeConfig(
  base: SlidesConfig,
  overrides: Partial<SlidesConfig>
): SlidesConfig;
```

### Default Config

```typescript
export function getDefaultConfig(): SlidesConfig {
  return {
    theme: 'default',
    aspectRatio: '16:9',
    transition: 'fade',
    pageNumbers: true,
    tone: 'professional',
    slideTypes: ['title', 'content', 'section', 'code', 'diagram'],
    imageStrategy: 'placeholder',
    diagramEngine: 'mermaid',
    outputDir: './output',
    formats: ['html'],
  };
}
```

## Implementation Steps (TDD)

1. **Test**: Test default config
2. **Implement**: getDefaultConfig()
3. **Test**: Test loading valid config file
4. **Implement**: loadConfig() with YAML parsing
5. **Test**: Test validation with invalid config
6. **Implement**: validateConfig() with type checking
7. **Test**: Test config merging
8. **Implement**: mergeConfig()

## Definition of Done

- [ ] Config loader implemented
- [ ] Validation working
- [ ] Default config provided
- [ ] Merging works correctly
- [ ] Error messages clear
- [ ] All tests passing

## Estimated Complexity
Low-Medium

## Notes
- Use YAML library for parsing
- Consider using Zod for runtime validation
- Helpful error messages are crucial
