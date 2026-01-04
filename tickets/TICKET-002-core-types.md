# TICKET-002: Core Type Definitions

## Priority
HIGH - Required by all other features

## Status
Pending

## Description
Define all TypeScript types and interfaces that will be used throughout the application. This includes config types, slide types, analysis results, and utility types.

## Dependencies
- TICKET-001 (Project Setup)

## Acceptance Criteria

- [ ] Config type definitions complete and exported
- [ ] Slide type definitions complete and exported
- [ ] Content analysis type definitions complete
- [ ] All types are strict (no `any`)
- [ ] Types have JSDoc documentation
- [ ] Types compile without errors
- [ ] Test file validates type usage

## Technical Details

### Files to Create

#### `src/types/config.ts`
```typescript
/**
 * Main configuration for slide generation
 */
export interface SlidesConfig {
  theme: string;
  aspectRatio: '16:9' | '4:3';
  transition: 'fade' | 'slide' | 'none';
  pageNumbers: boolean;
  footer?: string;
  tone: 'professional' | 'casual' | 'technical' | 'creative' | 'academic';
  slideTypes: SlideType[];
  imageStrategy: 'placeholder' | 'mcp_unsplash' | 'local';
  imageMcpServer?: string;
  diagramEngine: 'mermaid';
  outputDir: string;
  formats: OutputFormat[];
}

export type SlideType = 'title' | 'content' | 'section' | 'code' | 'diagram';
export type OutputFormat = 'html' | 'pdf' | 'pptx';

/**
 * Per-slide frontmatter configuration
 */
export interface SlideFrontmatter {
  type?: SlideType;
  title?: string;
  author?: string;
  date?: string;
  theme?: string;
  background?: string;
  class?: string;
  style?: string;
  [key: string]: unknown; // Allow custom fields
}
```

#### `src/types/slide.ts`
```typescript
/**
 * Base slide interface
 */
export interface Slide {
  type: SlideType;
  content: string;
  metadata?: SlideFrontmatter;
  index?: number;
}

/**
 * Individual slide type interfaces
 */
export interface TitleSlide extends Slide {
  type: 'title';
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
}

export interface ContentSlide extends Slide {
  type: 'content';
  heading?: string;
  bullets?: string[];
  layout?: 'default' | 'two-column' | 'center';
}

export interface SectionSlide extends Slide {
  type: 'section';
  title: string;
  background?: string;
}

export interface CodeSlide extends Slide {
  type: 'code';
  language: string;
  code: string;
  heading?: string;
  highlight?: string; // e.g., "2-4,6"
}

export interface DiagramSlide extends Slide {
  type: 'diagram';
  engine: 'mermaid';
  diagram: string;
  heading?: string;
}

export type AnySlide = TitleSlide | ContentSlide | SectionSlide | CodeSlide | DiagramSlide;
```

#### `src/types/analysis.ts`
```typescript
/**
 * Result of content analysis
 */
export interface ContentAnalysis {
  files: AnalyzedFile[];
  totalSlides: number;
  suggestedStructure: SlideStructure;
  images: ImageRequirement[];
  diagrams: DiagramRequirement[];
  codeBlocks: CodeBlock[];
}

export interface AnalyzedFile {
  path: string;
  content: string;
  frontmatter?: SlideFrontmatter;
  slides: ParsedSlide[];
}

export interface ParsedSlide {
  content: string;
  frontmatter?: SlideFrontmatter;
  lineNumber: number;
}

export interface SlideStructure {
  hasTitle: boolean;
  sections: Section[];
  estimatedDuration?: number; // minutes
}

export interface Section {
  title: string;
  slideCount: number;
  types: SlideType[];
}

export interface ImageRequirement {
  slideIndex: number;
  query: string;
  alt: string;
}

export interface DiagramRequirement {
  slideIndex: number;
  type: string; // mermaid diagram type
  content: string;
}

export interface CodeBlock {
  slideIndex: number;
  language: string;
  code: string;
  lineNumbers?: boolean;
}
```

#### `src/types/plan.ts`
```typescript
/**
 * Slide generation plan
 */
export interface SlidePlan {
  slides: PlannedSlide[];
  config: SlidesConfig;
  metadata: PresentationMetadata;
}

export interface PlannedSlide {
  type: SlideType;
  content: string;
  index: number;
  metadata?: SlideFrontmatter;
}

export interface PresentationMetadata {
  title?: string;
  author?: string;
  date?: string;
  totalSlides: number;
  estimatedDuration?: number;
  tags?: string[];
}
```

### Implementation Steps (TDD)

1. **Test**: Create `tests/unit/types.test.ts`
   ```typescript
   import { describe, it, expectTypeOf } from 'vitest';
   import type { SlidesConfig, Slide, ContentAnalysis } from '../src/types';

   describe('Type Definitions', () => {
     it('should have valid SlidesConfig type', () => {
       const config: SlidesConfig = {
         theme: 'default',
         aspectRatio: '16:9',
         transition: 'fade',
         pageNumbers: true,
         tone: 'professional',
         slideTypes: ['title', 'content'],
         imageStrategy: 'placeholder',
         diagramEngine: 'mermaid',
         outputDir: './output',
         formats: ['html'],
       };
       expectTypeOf(config).toMatchTypeOf<SlidesConfig>();
     });

     // More type validation tests...
   });
   ```

2. **Implement**: Create all type files
   - Start with `config.ts`
   - Then `slide.ts`
   - Then `analysis.ts`
   - Finally `plan.ts`

3. **Verify**: Run type checker
   ```bash
   npm run typecheck
   npm test -- types
   ```

## Definition of Done

- [ ] All type files created in `src/types/`
- [ ] All types exported via barrel export (`src/types/index.ts`)
- [ ] Types compile without errors
- [ ] Test file validates correct type usage
- [ ] All types have JSDoc comments
- [ ] No `any` types used (except in specific allowed cases)
- [ ] Types are strict and well-constrained

## Estimated Complexity
Low-Medium - Type definition is straightforward

## Notes
- These types form the contract for the entire application
- Be strict with types to catch bugs early
- Use discriminated unions for slide types (type field)
- Consider using Zod or similar for runtime validation later
