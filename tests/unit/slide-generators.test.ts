import { describe, it, expect } from 'vitest';
import type {
  TitleSlide,
  ContentSlide,
  SectionSlide,
  CodeSlide,
  DiagramSlide,
} from '../../src/types/index.js';
import { TitleSlideGenerator } from '../../src/slide-types/title.js';
import { ContentSlideGenerator } from '../../src/slide-types/content.js';
import { SectionSlideGenerator } from '../../src/slide-types/section.js';
import { CodeSlideGenerator } from '../../src/slide-types/code.js';
import { DiagramSlideGenerator } from '../../src/slide-types/diagram.js';

describe('Slide Generators', () => {
  describe('TitleSlideGenerator', () => {
    it('should generate title slide with title and subtitle', () => {
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

    it('should generate title slide with author and date', () => {
      const slide: TitleSlide = {
        type: 'title',
        content: '',
        title: 'My Presentation',
        author: 'John Doe',
        date: '2024-01-01',
      };
      const generator = new TitleSlideGenerator();
      const result = generator.generate(slide);

      expect(result).toContain('# My Presentation');
      expect(result).toContain('John Doe');
      expect(result).toContain('2024-01-01');
    });

    it('should generate title slide without optional fields', () => {
      const slide: TitleSlide = {
        type: 'title',
        content: '',
        title: 'My Presentation',
      };
      const generator = new TitleSlideGenerator();
      const result = generator.generate(slide);

      expect(result).toContain('# My Presentation');
    });

    it('should add lead class directive for centering', () => {
      const slide: TitleSlide = {
        type: 'title',
        content: '',
        title: 'My Presentation',
      };
      const generator = new TitleSlideGenerator();
      const result = generator.generate(slide);

      expect(result).toContain('<!-- _class: lead -->');
    });
  });

  describe('ContentSlideGenerator', () => {
    it('should generate content slide with heading and bullets', () => {
      const slide: ContentSlide = {
        type: 'content',
        content: '',
        heading: 'Key Points',
        bullets: ['Point 1', 'Point 2', 'Point 3'],
      };
      const generator = new ContentSlideGenerator();
      const result = generator.generate(slide);

      expect(result).toContain('## Key Points');
      expect(result).toContain('- Point 1');
      expect(result).toContain('- Point 2');
      expect(result).toContain('- Point 3');
    });

    it('should generate content slide without heading', () => {
      const slide: ContentSlide = {
        type: 'content',
        content: '',
        bullets: ['Point 1', 'Point 2'],
      };
      const generator = new ContentSlideGenerator();
      const result = generator.generate(slide);

      expect(result).toContain('- Point 1');
      expect(result).toContain('- Point 2');
      expect(result).not.toContain('##');
    });

    it('should use provided content if bullets not specified', () => {
      const slide: ContentSlide = {
        type: 'content',
        content: 'This is custom content\n\nWith multiple paragraphs',
      };
      const generator = new ContentSlideGenerator();
      const result = generator.generate(slide);

      expect(result).toContain('This is custom content');
      expect(result).toContain('With multiple paragraphs');
    });

    it('should support two-column layout', () => {
      const slide: ContentSlide = {
        type: 'content',
        content: '',
        heading: 'Comparison',
        bullets: ['Left item', 'Right item'],
        layout: 'two-column',
      };
      const generator = new ContentSlideGenerator();
      const result = generator.generate(slide);

      expect(result).toContain('<!-- _class: two-column -->');
    });
  });

  describe('SectionSlideGenerator', () => {
    it('should generate section slide with title', () => {
      const slide: SectionSlide = {
        type: 'section',
        content: '',
        title: 'Introduction',
      };
      const generator = new SectionSlideGenerator();
      const result = generator.generate(slide);

      expect(result).toContain('# Introduction');
      expect(result).toContain('<!-- _class: lead -->');
    });

    it('should generate section slide with background', () => {
      const slide: SectionSlide = {
        type: 'section',
        content: '',
        title: 'Chapter 2',
        background: '#1e3a8a',
      };
      const generator = new SectionSlideGenerator();
      const result = generator.generate(slide);

      expect(result).toContain('# Chapter 2');
      expect(result).toContain('<!-- _backgroundColor: #1e3a8a -->');
    });

    it('should disable pagination on section slides', () => {
      const slide: SectionSlide = {
        type: 'section',
        content: '',
        title: 'Section',
      };
      const generator = new SectionSlideGenerator();
      const result = generator.generate(slide);

      expect(result).toContain('<!-- _paginate: false -->');
    });
  });

  describe('CodeSlideGenerator', () => {
    it('should generate code slide with syntax highlighting', () => {
      const slide: CodeSlide = {
        type: 'code',
        content: '',
        language: 'typescript',
        code: 'const x = 1;\nconsole.log(x);',
      };
      const generator = new CodeSlideGenerator();
      const result = generator.generate(slide);

      expect(result).toContain('```typescript');
      expect(result).toContain('const x = 1;');
      expect(result).toContain('console.log(x);');
      expect(result).toContain('```');
    });

    it('should generate code slide with heading', () => {
      const slide: CodeSlide = {
        type: 'code',
        content: '',
        language: 'javascript',
        code: 'function hello() {}',
        heading: 'Example Function',
      };
      const generator = new CodeSlideGenerator();
      const result = generator.generate(slide);

      expect(result).toContain('## Example Function');
      expect(result).toContain('```javascript');
    });

    it('should handle code without language specified', () => {
      const slide: CodeSlide = {
        type: 'code',
        content: '',
        language: '',
        code: 'plain text code',
      };
      const generator = new CodeSlideGenerator();
      const result = generator.generate(slide);

      expect(result).toContain('```');
      expect(result).toContain('plain text code');
    });

    it('should preserve code indentation and formatting', () => {
      const slide: CodeSlide = {
        type: 'code',
        content: '',
        language: 'python',
        code: 'def hello():\n    print("world")\n    return True',
      };
      const generator = new CodeSlideGenerator();
      const result = generator.generate(slide);

      expect(result).toContain('def hello():');
      expect(result).toContain('    print("world")');
      expect(result).toContain('    return True');
    });
  });

  describe('DiagramSlideGenerator', () => {
    it('should generate mermaid diagram slide', () => {
      const slide: DiagramSlide = {
        type: 'diagram',
        content: '',
        engine: 'mermaid',
        diagram: 'graph TD\n  A --> B\n  B --> C',
      };
      const generator = new DiagramSlideGenerator();
      const result = generator.generate(slide);

      expect(result).toContain('```mermaid');
      expect(result).toContain('graph TD');
      expect(result).toContain('A --> B');
      expect(result).toContain('```');
    });

    it('should generate diagram slide with heading', () => {
      const slide: DiagramSlide = {
        type: 'diagram',
        content: '',
        engine: 'mermaid',
        diagram: 'sequenceDiagram\n  A->>B: Hello',
        heading: 'System Architecture',
      };
      const generator = new DiagramSlideGenerator();
      const result = generator.generate(slide);

      expect(result).toContain('## System Architecture');
      expect(result).toContain('```mermaid');
      expect(result).toContain('sequenceDiagram');
    });

    it('should preserve diagram formatting', () => {
      const slide: DiagramSlide = {
        type: 'diagram',
        content: '',
        engine: 'mermaid',
        diagram: 'flowchart LR\n  A[Start] --> B{Decision}\n  B -->|Yes| C[OK]',
      };
      const generator = new DiagramSlideGenerator();
      const result = generator.generate(slide);

      expect(result).toContain('flowchart LR');
      expect(result).toContain('A[Start] --> B{Decision}');
      expect(result).toContain('B -->|Yes| C[OK]');
    });
  });
});
