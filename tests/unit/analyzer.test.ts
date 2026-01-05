import { describe, it, expect } from 'vitest';
import { resolve } from 'path';
import { ContentAnalyzer } from '../../src/core/analyzer.js';

describe('ContentAnalyzer', () => {
  describe('parseMarkdown()', () => {
    it('should split markdown by triple dash', () => {
      const markdown = '# Slide 1\n---\n# Slide 2';
      const analyzer = new ContentAnalyzer();
      const result = analyzer.parseMarkdown(markdown);
      expect(result).toHaveLength(2);
      expect(result[0].content).toContain('Slide 1');
      expect(result[1].content).toContain('Slide 2');
    });

    it('should handle single slide without separator', () => {
      const markdown = '# Single Slide\nContent';
      const analyzer = new ContentAnalyzer();
      const result = analyzer.parseMarkdown(markdown);
      expect(result).toHaveLength(1);
      expect(result[0].content).toBe(markdown);
    });

    it('should handle empty content', () => {
      const markdown = '';
      const analyzer = new ContentAnalyzer();
      const result = analyzer.parseMarkdown(markdown);
      expect(result).toHaveLength(1);
    });

    it('should track line numbers correctly', () => {
      const markdown = 'Line 1\nLine 2\n---\nLine 4\nLine 5';
      const analyzer = new ContentAnalyzer();
      const result = analyzer.parseMarkdown(markdown);
      expect(result[0].lineNumber).toBe(1);
      expect(result[1].lineNumber).toBe(4);
    });
  });

  describe('detectSlideType()', () => {
    it('should detect title slide from first heading', () => {
      const content = '# Main Title\n## Subtitle';
      const analyzer = new ContentAnalyzer();
      const type = analyzer.detectSlideType(content);
      expect(type).toBe('title');
    });

    it('should detect section slide', () => {
      const content = '# Section Title';
      const analyzer = new ContentAnalyzer();
      const type = analyzer.detectSlideType(content);
      // A single H1 can be either title or section, depends on context
      expect(['title', 'section']).toContain(type);
    });

    it('should detect code slide', () => {
      const content = '```javascript\nconst x = 1;\n```';
      const analyzer = new ContentAnalyzer();
      const type = analyzer.detectSlideType(content);
      expect(type).toBe('code');
    });

    it('should detect diagram slide', () => {
      const content = '```mermaid\ngraph TD\nA --> B\n```';
      const analyzer = new ContentAnalyzer();
      const type = analyzer.detectSlideType(content);
      expect(type).toBe('diagram');
    });

    it('should detect content slide with bullets', () => {
      const content = '## Heading\n\n- Point 1\n- Point 2';
      const analyzer = new ContentAnalyzer();
      const type = analyzer.detectSlideType(content);
      expect(type).toBe('content');
    });

    it('should default to content for plain text', () => {
      const content = 'Just some plain text';
      const analyzer = new ContentAnalyzer();
      const type = analyzer.detectSlideType(content);
      expect(type).toBe('content');
    });
  });

  describe('extractCodeBlocks()', () => {
    it('should detect code blocks with language', () => {
      const content = 'Text\n```typescript\nconst x = 1;\n```\nMore text';
      const analyzer = new ContentAnalyzer();
      const blocks = analyzer.extractCodeBlocks(content, 0);
      expect(blocks).toHaveLength(1);
      expect(blocks[0].language).toBe('typescript');
      expect(blocks[0].code).toContain('const x = 1');
      expect(blocks[0].slideIndex).toBe(0);
    });

    it('should detect multiple code blocks', () => {
      const content = '```js\ncode1\n```\nText\n```python\ncode2\n```';
      const analyzer = new ContentAnalyzer();
      const blocks = analyzer.extractCodeBlocks(content, 0);
      expect(blocks).toHaveLength(2);
      expect(blocks[0].language).toBe('js');
      expect(blocks[1].language).toBe('python');
    });

    it('should handle code blocks without language', () => {
      const content = '```\nplain code\n```';
      const analyzer = new ContentAnalyzer();
      const blocks = analyzer.extractCodeBlocks(content, 0);
      expect(blocks).toHaveLength(1);
      expect(blocks[0].language).toBe('');
    });

    it('should not include mermaid blocks', () => {
      const content = '```mermaid\ngraph TD\n```';
      const analyzer = new ContentAnalyzer();
      const blocks = analyzer.extractCodeBlocks(content, 0);
      expect(blocks).toHaveLength(0);
    });

    it('should return empty array when no code blocks', () => {
      const content = 'No code here';
      const analyzer = new ContentAnalyzer();
      const blocks = analyzer.extractCodeBlocks(content, 0);
      expect(blocks).toHaveLength(0);
    });

    it('should preserve code formatting', () => {
      const content = '```js\nfunction test() {\n  return 1;\n}\n```';
      const analyzer = new ContentAnalyzer();
      const blocks = analyzer.extractCodeBlocks(content, 0);
      expect(blocks[0].code).toContain('function test()');
      expect(blocks[0].code).toContain('  return 1;');
    });
  });

  describe('extractDiagrams()', () => {
    it('should detect mermaid diagrams', () => {
      const content = '```mermaid\ngraph TD\nA-->B\n```';
      const analyzer = new ContentAnalyzer();
      const diagrams = analyzer.extractDiagrams(content, 0);
      expect(diagrams).toHaveLength(1);
      expect(diagrams[0].type).toBe('mermaid');
      expect(diagrams[0].content).toContain('graph TD');
      expect(diagrams[0].slideIndex).toBe(0);
    });

    it('should detect multiple mermaid diagrams', () => {
      const content =
        '```mermaid\ngraph TD\n```\nText\n```mermaid\nsequenceDiagram\n```';
      const analyzer = new ContentAnalyzer();
      const diagrams = analyzer.extractDiagrams(content, 0);
      expect(diagrams).toHaveLength(2);
    });

    it('should return empty array when no diagrams', () => {
      const content = 'No diagrams here';
      const analyzer = new ContentAnalyzer();
      const diagrams = analyzer.extractDiagrams(content, 0);
      expect(diagrams).toHaveLength(0);
    });

    it('should preserve diagram content', () => {
      const content = '```mermaid\ngraph TD\n  A --> B\n  B --> C\n```';
      const analyzer = new ContentAnalyzer();
      const diagrams = analyzer.extractDiagrams(content, 0);
      expect(diagrams[0].content).toContain('A --> B');
      expect(diagrams[0].content).toContain('B --> C');
    });
  });

  describe('analyzeFile()', () => {
    it('should analyze markdown file with frontmatter', async () => {
      const filePath = resolve(
        process.cwd(),
        'tests/fixtures/sample-content/basic.md'
      );
      const analyzer = new ContentAnalyzer();
      const result = await analyzer.analyzeFile(filePath);

      expect(result.path).toBe(filePath);
      expect(result.frontmatter?.title).toBe('Test Presentation');
      expect(result.frontmatter?.author).toBe('Test Author');
      expect(result.slides.length).toBeGreaterThan(0);
    });

    it('should analyze markdown file without frontmatter', async () => {
      const filePath = resolve(
        process.cwd(),
        'tests/fixtures/sample-content/no-frontmatter.md'
      );
      const analyzer = new ContentAnalyzer();
      const result = await analyzer.analyzeFile(filePath);

      expect(result.path).toBe(filePath);
      expect(result.frontmatter).toBeUndefined();
      expect(result.slides.length).toBeGreaterThan(0);
    });

    it('should handle empty file gracefully', async () => {
      const filePath = resolve(
        process.cwd(),
        'tests/fixtures/sample-content/empty.md'
      );
      const analyzer = new ContentAnalyzer();
      const result = await analyzer.analyzeFile(filePath);

      expect(result.path).toBe(filePath);
      expect(result.slides).toHaveLength(1);
    });

    it('should detect code blocks in file', async () => {
      const filePath = resolve(
        process.cwd(),
        'tests/fixtures/sample-content/code-only.md'
      );
      const analyzer = new ContentAnalyzer();
      const result = await analyzer.analyzeFile(filePath);

      // File has JS and Python code blocks
      const hasCodeSlides = result.slides.some(
        (s) =>
          s.content.includes('```javascript') || s.content.includes('```python')
      );
      expect(hasCodeSlides).toBe(true);
    });
  });

  describe('analyzeDirectory()', () => {
    it('should analyze all markdown files in directory', async () => {
      const dirPath = resolve(process.cwd(), 'tests/fixtures/sample-content');
      const analyzer = new ContentAnalyzer();
      const result = await analyzer.analyzeDirectory(dirPath);

      expect(result.files.length).toBeGreaterThan(0);
      expect(result.totalSlides).toBeGreaterThan(0);
      expect(result.suggestedStructure).toBeDefined();
    });

    it('should aggregate code blocks from all files', async () => {
      const dirPath = resolve(process.cwd(), 'tests/fixtures/sample-content');
      const analyzer = new ContentAnalyzer();
      const result = await analyzer.analyzeDirectory(dirPath);

      // We have code blocks in our fixtures
      expect(result.codeBlocks.length).toBeGreaterThan(0);
    });

    it('should aggregate diagrams from all files', async () => {
      const dirPath = resolve(process.cwd(), 'tests/fixtures/sample-content');
      const analyzer = new ContentAnalyzer();
      const result = await analyzer.analyzeDirectory(dirPath);

      // We have mermaid diagrams in our fixtures
      expect(result.diagrams.length).toBeGreaterThan(0);
    });

    it('should detect if title slide exists', async () => {
      const dirPath = resolve(process.cwd(), 'tests/fixtures/sample-content');
      const analyzer = new ContentAnalyzer();
      const result = await analyzer.analyzeDirectory(dirPath);

      expect(result.suggestedStructure.hasTitle).toBeDefined();
    });
  });
});
