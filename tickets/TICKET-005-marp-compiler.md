# TICKET-005: Marp Compiler Wrapper

## Priority
HIGH - Core feature

## Status
Pending

## Description
Implement a wrapper around Marp CLI to compile markdown files to HTML, PDF, and PPTX formats.

## Dependencies
- TICKET-001 (Project Setup)
- TICKET-002 (Core Types)

## Acceptance Criteria

- [ ] Can invoke Marp CLI programmatically
- [ ] Supports HTML output
- [ ] Supports PDF output
- [ ] Supports PPTX output (post-MVP, skip for now)
- [ ] Applies theme from config
- [ ] Handles errors gracefully
- [ ] Shows progress/spinner during compilation
- [ ] Returns output file path(s)
- [ ] Unit tests for compiler logic
- [ ] Integration test with real Marp CLI

## Technical Details

### Files to Create

#### `src/core/compiler.ts`
```typescript
export class MarpCompiler {
  async compile(
    markdownPath: string,
    outputPath: string,
    format: OutputFormat,
    config: SlidesConfig
  ): Promise<string>;

  async compileToHTML(markdownPath: string, outputPath: string): Promise<string>;
  async compileToPDF(markdownPath: string, outputPath: string): Promise<string>;
}
```

### Implementation Steps (TDD)

1. **Test**: Create `tests/unit/compiler.test.ts`
2. **Implement**: Basic MarpCompiler class using child_process
3. **Test**: Test HTML compilation
4. **Implement**: HTML compilation logic
5. **Test**: Test PDF compilation
6. **Implement**: PDF compilation logic
7. **Test**: Integration test with real file

## Definition of Done

- [ ] MarpCompiler class implemented
- [ ] HTML compilation working
- [ ] PDF compilation working
- [ ] Error handling implemented
- [ ] Progress indication (spinner)
- [ ] Tests passing
- [ ] Validates Marp CLI is installed

## Estimated Complexity
Medium

## Notes
- Use `@marp-team/marp-cli` programmatic API or spawn process
- Check Marp CLI installation on first use
- Handle missing dependencies gracefully
