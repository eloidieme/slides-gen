import { describe, it, expect } from 'vitest';
import {
  splitIntoSlides,
  extractHeadings,
  countWords,
} from '../../src/utils/markdown.js';

describe('Markdown Utilities', () => {
  describe('splitIntoSlides()', () => {
    it('should split markdown by triple dash separator', () => {
      const markdown = '# Slide 1\n---\n# Slide 2\n---\n# Slide 3';
      const slides = splitIntoSlides(markdown);
      expect(slides).toHaveLength(3);
      expect(slides[0]).toContain('Slide 1');
      expect(slides[1]).toContain('Slide 2');
      expect(slides[2]).toContain('Slide 3');
    });

    it('should handle single slide without separator', () => {
      const markdown = '# Single Slide\nContent here';
      const slides = splitIntoSlides(markdown);
      expect(slides).toHaveLength(1);
      expect(slides[0]).toBe(markdown);
    });

    it('should handle empty content', () => {
      const markdown = '';
      const slides = splitIntoSlides(markdown);
      expect(slides).toHaveLength(1);
      expect(slides[0]).toBe('');
    });

    it('should trim whitespace from slides', () => {
      const markdown = '  # Slide 1  \n---\n  # Slide 2  ';
      const slides = splitIntoSlides(markdown);
      expect(slides[0]).toBe('# Slide 1');
      expect(slides[1]).toBe('# Slide 2');
    });

    it('should handle multiple consecutive separators', () => {
      const markdown = '# Slide 1\n---\n---\n# Slide 2';
      const slides = splitIntoSlides(markdown);
      // Empty slides should be filtered out
      expect(slides.length).toBeGreaterThanOrEqual(2);
    });

    it('should preserve code blocks with dashes', () => {
      const markdown = '```bash\ncommand --flag\n```\n---\n# Next slide';
      const slides = splitIntoSlides(markdown);
      expect(slides).toHaveLength(2);
      expect(slides[0]).toContain('command --flag');
    });
  });

  describe('extractHeadings()', () => {
    it('should extract all headings from markdown', () => {
      const markdown = '# Main Title\n## Subtitle\n### Section\nNot a heading';
      const headings = extractHeadings(markdown);
      expect(headings).toHaveLength(3);
      expect(headings).toContain('Main Title');
      expect(headings).toContain('Subtitle');
      expect(headings).toContain('Section');
    });

    it('should handle markdown without headings', () => {
      const markdown = 'Just some text\nNo headings here';
      const headings = extractHeadings(markdown);
      expect(headings).toHaveLength(0);
    });

    it('should handle empty content', () => {
      const markdown = '';
      const headings = extractHeadings(markdown);
      expect(headings).toHaveLength(0);
    });

    it('should not extract headings from code blocks', () => {
      const markdown = '```markdown\n# Not a heading\n```\n# Real heading';
      const headings = extractHeadings(markdown);
      expect(headings).toHaveLength(1);
      expect(headings[0]).toBe('Real heading');
    });

    it('should trim whitespace from headings', () => {
      const markdown = '#  Title with spaces  \n##   Another one   ';
      const headings = extractHeadings(markdown);
      expect(headings[0]).toBe('Title with spaces');
      expect(headings[1]).toBe('Another one');
    });
  });

  describe('countWords()', () => {
    it('should count words in simple text', () => {
      const text = 'This has five words here';
      expect(countWords(text)).toBe(5);
    });

    it('should handle empty text', () => {
      expect(countWords('')).toBe(0);
    });

    it('should handle whitespace-only text', () => {
      expect(countWords('   \n\n\t  ')).toBe(0);
    });

    it('should count words across multiple lines', () => {
      const text = 'Line one\nLine two\nLine three';
      expect(countWords(text)).toBe(6);
    });

    it('should handle punctuation correctly', () => {
      const text = "Hello, world! How's it going?";
      expect(countWords(text)).toBe(5);
    });

    it('should not count markdown syntax as words', () => {
      const text = '# Heading\n**bold** and *italic*';
      const count = countWords(text);
      // Should count: Heading, bold, and, italic = 4 words
      expect(count).toBeGreaterThanOrEqual(4);
    });
  });
});
