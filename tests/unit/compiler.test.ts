import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';
import type { SlidesConfig } from '../../src/types/index.js';
import { MarpCompiler } from '../../src/core/compiler.js';

describe('MarpCompiler', () => {
  const testDir = resolve(process.cwd(), 'tests/fixtures/compiler-output');
  const testMarkdown = resolve(
    process.cwd(),
    'tests/fixtures/sample-content/basic.md'
  );

  beforeEach(() => {
    // Create test output directory
    if (!existsSync(testDir)) {
      mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up test output directory
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe('compileToHTML()', () => {
    it('should compile markdown to HTML', async () => {
      const compiler = new MarpCompiler();
      const outputPath = join(testDir, 'output.html');

      const result = await compiler.compileToHTML(testMarkdown, outputPath);

      expect(result).toBe(outputPath);
      expect(existsSync(outputPath)).toBe(true);
    });

    it('should create output directory if it does not exist', async () => {
      const compiler = new MarpCompiler();
      const nestedDir = join(testDir, 'nested', 'deep');
      const outputPath = join(nestedDir, 'output.html');

      await compiler.compileToHTML(testMarkdown, outputPath);

      expect(existsSync(outputPath)).toBe(true);
    });

    it('should throw error for non-existent input file', async () => {
      const compiler = new MarpCompiler();
      const outputPath = join(testDir, 'output.html');

      await expect(
        compiler.compileToHTML('/non/existent/file.md', outputPath)
      ).rejects.toThrow();
    });

    it('should handle markdown with mermaid diagrams', async () => {
      const compiler = new MarpCompiler();
      const markdownWithDiagram = join(testDir, 'diagram.md');
      const outputPath = join(testDir, 'diagram.html');

      // Create test markdown with mermaid
      writeFileSync(
        markdownWithDiagram,
        `---
marp: true
---

# Test

\`\`\`mermaid
graph TD
  A --> B
\`\`\`
`
      );

      await compiler.compileToHTML(markdownWithDiagram, outputPath);

      expect(existsSync(outputPath)).toBe(true);
    });
  });

  describe('compileToPDF()', () => {
    it.skip('should compile markdown to PDF (requires Chrome/Edge)', async () => {
      // Skipped: PDF generation requires Chrome or Edge to be installed
      // This test should pass in CI/CD with browser installed
      const compiler = new MarpCompiler();
      const outputPath = join(testDir, 'output.pdf');

      const result = await compiler.compileToPDF(testMarkdown, outputPath);

      expect(result).toBe(outputPath);
      expect(existsSync(outputPath)).toBe(true);
    });

    it.skip('should create output directory if it does not exist (requires Chrome/Edge)', async () => {
      // Skipped: PDF generation requires Chrome or Edge to be installed
      const compiler = new MarpCompiler();
      const nestedDir = join(testDir, 'nested', 'deep');
      const outputPath = join(nestedDir, 'output.pdf');

      await compiler.compileToPDF(testMarkdown, outputPath);

      expect(existsSync(outputPath)).toBe(true);
    });

    it('should throw error for non-existent input file', async () => {
      const compiler = new MarpCompiler();
      const outputPath = join(testDir, 'output.pdf');

      await expect(
        compiler.compileToPDF('/non/existent/file.md', outputPath)
      ).rejects.toThrow();
    });
  });

  describe('compile()', () => {
    it('should compile to HTML when format is html', async () => {
      const config: SlidesConfig = {
        theme: 'default',
        aspectRatio: '16:9',
        transition: 'fade',
        pageNumbers: true,
        tone: 'professional',
        slideTypes: ['title', 'content'],
        imageStrategy: 'placeholder',
        diagramEngine: 'mermaid',
        outputDir: testDir,
        formats: ['html'],
      };

      const compiler = new MarpCompiler();
      const outputPath = join(testDir, 'output.html');

      const result = await compiler.compile(
        testMarkdown,
        outputPath,
        'html',
        config
      );

      expect(result).toBe(outputPath);
      expect(existsSync(outputPath)).toBe(true);
    });

    it.skip('should compile to PDF when format is pdf (requires Chrome/Edge)', async () => {
      // Skipped: PDF generation requires Chrome or Edge to be installed
      const config: SlidesConfig = {
        theme: 'default',
        aspectRatio: '16:9',
        transition: 'fade',
        pageNumbers: true,
        tone: 'professional',
        slideTypes: ['title', 'content'],
        imageStrategy: 'placeholder',
        diagramEngine: 'mermaid',
        outputDir: testDir,
        formats: ['pdf'],
      };

      const compiler = new MarpCompiler();
      const outputPath = join(testDir, 'output.pdf');

      const result = await compiler.compile(
        testMarkdown,
        outputPath,
        'pdf',
        config
      );

      expect(result).toBe(outputPath);
      expect(existsSync(outputPath)).toBe(true);
    });

    it('should apply theme from config', async () => {
      const config: SlidesConfig = {
        theme: 'gaia',
        aspectRatio: '16:9',
        transition: 'fade',
        pageNumbers: true,
        tone: 'professional',
        slideTypes: ['title'],
        imageStrategy: 'placeholder',
        diagramEngine: 'mermaid',
        outputDir: testDir,
        formats: ['html'],
      };

      const compiler = new MarpCompiler();
      const outputPath = join(testDir, 'themed.html');

      await compiler.compile(testMarkdown, outputPath, 'html', config);

      expect(existsSync(outputPath)).toBe(true);
      // Note: In real implementation, we'd verify theme is applied
      // This would require reading the HTML and checking for theme markers
    });

    it('should handle pptx format (skip for MVP)', async () => {
      const config: SlidesConfig = {
        theme: 'default',
        aspectRatio: '16:9',
        transition: 'fade',
        pageNumbers: false,
        tone: 'professional',
        slideTypes: ['content'],
        imageStrategy: 'placeholder',
        diagramEngine: 'mermaid',
        outputDir: testDir,
        formats: ['pptx'],
      };

      const compiler = new MarpCompiler();
      const outputPath = join(testDir, 'output.pptx');

      // PPTX support is post-MVP, should throw or skip
      await expect(
        compiler.compile(testMarkdown, outputPath, 'pptx', config)
      ).rejects.toThrow(/not supported|pptx/i);
    });
  });

  describe('validation', () => {
    it('should validate input file exists', async () => {
      const compiler = new MarpCompiler();
      const outputPath = join(testDir, 'output.html');

      await expect(
        compiler.compileToHTML('/invalid/path.md', outputPath)
      ).rejects.toThrow();
    });

    it('should handle compilation errors gracefully', async () => {
      const compiler = new MarpCompiler();
      const malformedMarkdown = join(testDir, 'malformed.md');
      const outputPath = join(testDir, 'output.html');

      // Create potentially problematic markdown
      writeFileSync(malformedMarkdown, 'Just some text without frontmatter');

      // Should still compile (Marp is forgiving)
      // or throw a clear error
      const result = await compiler.compileToHTML(
        malformedMarkdown,
        outputPath
      );

      expect(result).toBe(outputPath);
    });
  });
});
