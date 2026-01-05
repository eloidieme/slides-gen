/**
 * Content analyzer for parsing and analyzing markdown files
 */

import { readdir, readFile } from 'fs/promises';
import { resolve, extname } from 'path';
import matter from 'gray-matter';
import type {
  ContentAnalysis,
  AnalyzedFile,
  ParsedSlide,
  SlideStructure,
  Section,
  CodeBlock,
  DiagramRequirement,
  SlideType,
} from '../types/index.js';
import {
  splitIntoSlides,
  extractHeadings,
  countWords,
} from '../utils/markdown.js';

/**
 * Analyzes markdown content to extract slides and metadata
 */
export class ContentAnalyzer {
  /**
   * Parse markdown content into individual slides
   * @param content - Raw markdown content (without frontmatter)
   * @returns Array of parsed slides with metadata
   */
  parseMarkdown(content: string): ParsedSlide[] {
    const slideContents = splitIntoSlides(content);
    let currentLine = 1;

    return slideContents.map((slideContent) => {
      const slide: ParsedSlide = {
        content: slideContent,
        lineNumber: currentLine,
      };

      // Track line number for next slide
      currentLine += slideContent.split('\n').length + 1; // +1 for separator

      return slide;
    });
  }

  /**
   * Detect the type of slide based on its content
   * @param content - Slide content
   * @returns Detected slide type
   */
  detectSlideType(content: string): SlideType {
    const trimmed = content.trim();

    // Check for mermaid diagrams first (most specific)
    if (/```mermaid/i.test(trimmed)) {
      return 'diagram';
    }

    // Check for code blocks (but not mermaid)
    if (/```\w*\n/.test(trimmed)) {
      return 'code';
    }

    const headings = extractHeadings(content);

    // Title slide detection: has both H1 and H2, or H1 with subtitle pattern
    if (headings.length >= 2 && /^#\s/.test(trimmed)) {
      const lines = trimmed.split('\n').filter((l) => l.trim());
      // Check if first two lines are H1 and H2
      if (/^#\s/.test(lines[0]) && /^##\s/.test(lines[1])) {
        return 'title';
      }
    }

    // Section slide: single H1 heading, minimal content
    if (headings.length === 1 && /^#\s/.test(trimmed)) {
      const wordCount = countWords(content);
      if (wordCount < 15) {
        return 'section';
      }
    }

    // Content slide: has bullet points or numbered lists
    if (/^\s*[-*+]\s/m.test(content) || /^\s*\d+\.\s/m.test(content)) {
      return 'content';
    }

    // Default to content for everything else
    return 'content';
  }

  /**
   * Extract code blocks from content
   * @param content - Markdown content
   * @param slideIndex - Index of the slide
   * @returns Array of code blocks found
   */
  extractCodeBlocks(content: string, slideIndex: number): CodeBlock[] {
    const codeBlocks: CodeBlock[] = [];
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      const language = match[1] || '';
      const code = match[2];

      // Skip mermaid blocks (those are diagrams)
      if (language.toLowerCase() === 'mermaid') {
        continue;
      }

      codeBlocks.push({
        slideIndex,
        language,
        code: code.trim(),
        lineNumbers: true,
      });
    }

    return codeBlocks;
  }

  /**
   * Extract diagram requirements from content
   * @param content - Markdown content
   * @param slideIndex - Index of the slide
   * @returns Array of diagram requirements
   */
  extractDiagrams(content: string, slideIndex: number): DiagramRequirement[] {
    const diagrams: DiagramRequirement[] = [];
    const mermaidRegex = /```mermaid\n([\s\S]*?)```/gi;
    let match;

    while ((match = mermaidRegex.exec(content)) !== null) {
      const diagramContent = match[1].trim();

      diagrams.push({
        slideIndex,
        type: 'mermaid',
        content: diagramContent,
      });
    }

    return diagrams;
  }

  /**
   * Analyze a single markdown file
   * @param filePath - Path to the markdown file
   * @returns Analyzed file data
   */
  async analyzeFile(filePath: string): Promise<AnalyzedFile> {
    const fileContent = await readFile(filePath, 'utf-8');

    // Parse frontmatter
    const { data: frontmatter, content } = matter(fileContent);

    // Parse slides from content
    const slides = this.parseMarkdown(content);

    return {
      path: filePath,
      content: fileContent,
      frontmatter:
        Object.keys(frontmatter).length > 0 ? frontmatter : undefined,
      slides,
    };
  }

  /**
   * Analyze a directory of markdown files
   * @param dirPath - Path to the directory
   * @returns Complete content analysis
   */
  async analyzeDirectory(dirPath: string): Promise<ContentAnalysis> {
    // Find all markdown files
    const entries = await readdir(dirPath, { withFileTypes: true });
    const markdownFiles = entries
      .filter((entry) => entry.isFile() && extname(entry.name) === '.md')
      .map((entry) => resolve(dirPath, entry.name));

    // Analyze each file
    const files = await Promise.all(
      markdownFiles.map((file) => this.analyzeFile(file))
    );

    // Aggregate data
    let totalSlides = 0;
    const allCodeBlocks: CodeBlock[] = [];
    const allDiagrams: DiagramRequirement[] = [];
    const sections: Section[] = [];
    let hasTitle = false;

    files.forEach((file) => {
      file.slides.forEach((slide, index) => {
        totalSlides++;

        // Extract code blocks and diagrams
        const codeBlocks = this.extractCodeBlocks(slide.content, index);
        const diagrams = this.extractDiagrams(slide.content, index);

        allCodeBlocks.push(...codeBlocks);
        allDiagrams.push(...diagrams);

        // Check for title slide
        const slideType = this.detectSlideType(slide.content);
        if (slideType === 'title' && !hasTitle) {
          hasTitle = true;
        }

        // Build sections (simplified - group by H1 headings)
        const headings = extractHeadings(slide.content);
        if (headings.length > 0 && slideType === 'section') {
          sections.push({
            title: headings[0],
            slideCount: 1,
            types: [slideType],
          });
        }
      });
    });

    const suggestedStructure: SlideStructure = {
      hasTitle,
      sections,
      estimatedDuration: Math.ceil(totalSlides * 1.5), // Rough estimate: 1.5 min per slide
    };

    return {
      files,
      totalSlides,
      suggestedStructure,
      images: [], // Image detection will be added in future tickets
      diagrams: allDiagrams,
      codeBlocks: allCodeBlocks,
    };
  }
}
