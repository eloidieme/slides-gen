# TICKET-004: Marp Markdown Generator

## Priority
HIGH - Core feature

## Status
Pending

## Description
Implement the generator that converts analyzed content and slide plans into Marp-compatible markdown with proper directives, themes, and formatting.

## Dependencies
- TICKET-001 (Project Setup)
- TICKET-002 (Core Types)
- TICKET-003 (Content Analyzer)

## Acceptance Criteria

- [ ] Generates valid Marp markdown with directives
- [ ] Supports all MVP slide types (title, content, section, code, diagram)
- [ ] Applies theme configuration correctly
- [ ] Handles page numbers and footers
- [ ] Preserves code block syntax highlighting
- [ ] Preserves Mermaid diagrams
- [ ] Generates proper Marp frontmatter
- [ ] Output validates with Marp CLI
- [ ] All slide types have unit tests
- [ ] Test coverage >= 85%

## Technical Details

### Files to Create

#### `src/core/generator.ts`
Main generator with methods:
- `generate(plan: SlidePlan): string` - Generate complete Marp markdown
- `generateSlide(slide: AnySlide): string` - Generate single slide
- `generateFrontmatter(config: SlidesConfig): string` - Generate Marp directives

#### `src/slide-types/base.ts`
```typescript
export interface SlideGenerator {
  generate(slide: Slide): string;
}
```

#### `src/slide-types/title.ts`
```typescript
export class TitleSlideGenerator implements SlideGenerator {
  generate(slide: TitleSlide): string {
    // Generate title slide markdown
  }
}
```

Similar files for: `content.ts`, `section.ts`, `code.ts`, `diagram.ts`

### Implementation Steps (TDD)

1. **Test**: Create `tests/unit/generator.test.ts`
   ```typescript
   describe('MarpGenerator', () => {
     it('should generate Marp frontmatter', () => {
       const config: SlidesConfig = {
         theme: 'default',
         aspectRatio: '16:9',
         // ...
       };
       const generator = new MarpGenerator();
       const result = generator.generateFrontmatter(config);
       expect(result).toContain('---');
       expect(result).toContain('marp: true');
       expect(result).toContain('theme: default');
     });
   });
   ```

2. **Implement**: Create MarpGenerator class with frontmatter generation

3. **Test**: Test title slide generation
   ```typescript
   it('should generate title slide', () => {
     const slide: TitleSlide = {
       type: 'title',
       content: '',
       title: 'My Presentation',
       subtitle: 'A great talk',
     };
     const generator = new TitleSlideGenerator();
     const result = generator.generate(slide);
     expect(result).toContain('# My Presentation');
     expect(result).toContain('## A great talk');
   });
   ```

4. **Implement**: Create TitleSlideGenerator

5. **Test**: Test content slide generation
   ```typescript
   it('should generate content slide with bullets', () => {
     const slide: ContentSlide = {
       type: 'content',
       content: '',
       heading: 'Key Points',
       bullets: ['Point 1', 'Point 2'],
     };
     const generator = new ContentSlideGenerator();
     const result = generator.generate(slide);
     expect(result).toContain('## Key Points');
     expect(result).toContain('- Point 1');
     expect(result).toContain('- Point 2');
   });
   ```

6. **Implement**: Create ContentSlideGenerator

7. **Test**: Test code slide generation
   ```typescript
   it('should generate code slide with syntax highlighting', () => {
     const slide: CodeSlide = {
       type: 'code',
       content: '',
       language: 'typescript',
       code: 'const x = 1;',
     };
     const generator = new CodeSlideGenerator();
     const result = generator.generate(slide);
     expect(result).toContain('```typescript');
     expect(result).toContain('const x = 1;');
     expect(result).toContain('```');
   });
   ```

8. **Implement**: Create CodeSlideGenerator

9. **Test**: Test diagram slide generation
   ```typescript
   it('should generate mermaid diagram slide', () => {
     const slide: DiagramSlide = {
       type: 'diagram',
       content: '',
       engine: 'mermaid',
       diagram: 'graph TD\nA-->B',
     };
     const generator = new DiagramSlideGenerator();
     const result = generator.generate(slide);
     expect(result).toContain('```mermaid');
     expect(result).toContain('graph TD');
   });
   ```

10. **Implement**: Create DiagramSlideGenerator

11. **Test**: Integration test with Marp CLI validation
    ```typescript
    it('should generate valid Marp markdown', async () => {
      const plan = createTestPlan();
      const generator = new MarpGenerator();
      const markdown = generator.generate(plan);

      // Write to temp file and validate with Marp
      await fs.writeFile('/tmp/test.md', markdown);
      // Validation happens in compiler
    });
    ```

12. **Implement**: Complete MarpGenerator with all slide types

## Marp Directives Reference

Frontmatter example:
```markdown
---
marp: true
theme: default
size: 16:9
paginate: true
footer: 'My Presentation'
---
```

Slide directives:
```markdown
<!-- _class: lead -->
<!-- _paginate: false -->
<!-- _backgroundColor: #123 -->
```

## Definition of Done

- [ ] MarpGenerator class implemented
- [ ] All 5 slide type generators implemented
- [ ] Generates valid Marp markdown (verified manually)
- [ ] All slide types tested
- [ ] Edge cases handled (empty content, special characters)
- [ ] Test coverage >= 85%
- [ ] JSDoc comments on all public methods

## Estimated Complexity
Medium - Requires understanding Marp syntax

## Notes
- Marp docs: https://marpit.marp.app/
- Use template literals for markdown generation
- Escape special markdown characters in content
- Test with actual Marp CLI in integration tests
