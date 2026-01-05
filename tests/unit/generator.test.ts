import { describe, it, expect } from 'vitest';
import type {
  SlidesConfig,
  SlidePlan,
  TitleSlide,
  ContentSlide,
} from '../../src/types/index.js';
import { MarpGenerator } from '../../src/core/generator.js';

describe('MarpGenerator', () => {
  describe('generateFrontmatter()', () => {
    it('should generate Marp frontmatter with basic config', () => {
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

      const generator = new MarpGenerator();
      const result = generator.generateFrontmatter(config);

      expect(result).toContain('---');
      expect(result).toContain('marp: true');
      expect(result).toContain('theme: default');
      expect(result).toContain('size: 16:9');
      expect(result).toContain('paginate: true');
    });

    it('should include footer when provided', () => {
      const config: SlidesConfig = {
        theme: 'gaia',
        aspectRatio: '4:3',
        transition: 'slide',
        pageNumbers: false,
        footer: 'My Presentation © 2024',
        tone: 'casual',
        slideTypes: ['content'],
        imageStrategy: 'placeholder',
        diagramEngine: 'mermaid',
        outputDir: './output',
        formats: ['pdf'],
      };

      const generator = new MarpGenerator();
      const result = generator.generateFrontmatter(config);

      expect(result).toContain('footer: "My Presentation © 2024"');
      expect(result).toContain('paginate: false');
      expect(result).toContain('size: 4:3');
    });

    it('should handle theme name correctly', () => {
      const config: SlidesConfig = {
        theme: 'uncover',
        aspectRatio: '16:9',
        transition: 'none',
        pageNumbers: true,
        tone: 'technical',
        slideTypes: ['code'],
        imageStrategy: 'local',
        diagramEngine: 'mermaid',
        outputDir: './slides',
        formats: ['html', 'pdf'],
      };

      const generator = new MarpGenerator();
      const result = generator.generateFrontmatter(config);

      expect(result).toContain('theme: uncover');
    });

    it('should close frontmatter with ---', () => {
      const config: SlidesConfig = {
        theme: 'default',
        aspectRatio: '16:9',
        transition: 'fade',
        pageNumbers: true,
        tone: 'professional',
        slideTypes: ['title'],
        imageStrategy: 'placeholder',
        diagramEngine: 'mermaid',
        outputDir: './output',
        formats: ['html'],
      };

      const generator = new MarpGenerator();
      const result = generator.generateFrontmatter(config);

      expect(result).toMatch(/^---\n/);
      expect(result).toMatch(/\n---$/);
    });
  });

  describe('generateSlide()', () => {
    it('should generate title slide', () => {
      const slide: TitleSlide = {
        type: 'title',
        content: '',
        title: 'Test Presentation',
        subtitle: 'Subtitle',
      };

      const generator = new MarpGenerator();
      const result = generator.generateSlide(slide);

      expect(result).toContain('# Test Presentation');
      expect(result).toContain('## Subtitle');
    });

    it('should generate content slide', () => {
      const slide: ContentSlide = {
        type: 'content',
        content: '',
        heading: 'Key Points',
        bullets: ['Point 1', 'Point 2'],
      };

      const generator = new MarpGenerator();
      const result = generator.generateSlide(slide);

      expect(result).toContain('## Key Points');
      expect(result).toContain('- Point 1');
    });
  });

  describe('generate()', () => {
    it('should generate complete Marp markdown', () => {
      const plan: SlidePlan = {
        config: {
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
        },
        slides: [
          {
            type: 'title',
            content: '',
            index: 0,
          } as TitleSlide,
          {
            type: 'content',
            content: '',
            index: 1,
          } as ContentSlide,
        ],
        metadata: {
          totalSlides: 2,
          title: 'Test',
        },
      };

      const generator = new MarpGenerator();
      const result = generator.generate(plan);

      // Should have frontmatter
      expect(result).toContain('marp: true');

      // Should have slide separator
      expect(result).toContain('\n---\n');

      // Should be valid markdown
      expect(result.length).toBeGreaterThan(0);
    });

    it('should separate slides with --- separator', () => {
      const plan: SlidePlan = {
        config: {
          theme: 'default',
          aspectRatio: '16:9',
          transition: 'fade',
          pageNumbers: true,
          tone: 'professional',
          slideTypes: ['content'],
          imageStrategy: 'placeholder',
          diagramEngine: 'mermaid',
          outputDir: './output',
          formats: ['html'],
        },
        slides: [
          {
            type: 'content',
            content: '',
            index: 0,
          } as ContentSlide,
          {
            type: 'content',
            content: '',
            index: 1,
          } as ContentSlide,
          {
            type: 'content',
            content: '',
            index: 2,
          } as ContentSlide,
        ],
        metadata: {
          totalSlides: 3,
        },
      };

      const generator = new MarpGenerator();
      const result = generator.generate(plan);

      const separators = result.match(/\n---\n/g);
      expect(separators).not.toBeNull();
      // Should have 2 separators for 3 slides (between slides, not after last one)
      expect(separators!.length).toBeGreaterThanOrEqual(2);
    });

    it('should handle empty slide plan', () => {
      const plan: SlidePlan = {
        config: {
          theme: 'default',
          aspectRatio: '16:9',
          transition: 'fade',
          pageNumbers: false,
          tone: 'professional',
          slideTypes: [],
          imageStrategy: 'placeholder',
          diagramEngine: 'mermaid',
          outputDir: './output',
          formats: ['html'],
        },
        slides: [],
        metadata: {
          totalSlides: 0,
        },
      };

      const generator = new MarpGenerator();
      const result = generator.generate(plan);

      // Should still have frontmatter
      expect(result).toContain('marp: true');
      expect(result).toContain('---');
    });

    it('should generate valid markdown for all slide types', () => {
      const plan: SlidePlan = {
        config: {
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
        },
        slides: [
          {
            type: 'title',
            content: '',
            title: 'Title',
            index: 0,
          } as TitleSlide,
          {
            type: 'content',
            content: '',
            bullets: ['Point'],
            index: 1,
          } as ContentSlide,
        ],
        metadata: {
          totalSlides: 2,
        },
      };

      const generator = new MarpGenerator();
      const result = generator.generate(plan);

      expect(result).toContain('# Title');
      expect(result).toContain('- Point');
    });
  });
});
