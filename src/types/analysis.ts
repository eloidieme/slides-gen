import type { SlideType, SlideFrontmatter } from './config.js';

/**
 * Result of content analysis phase
 * Contains all information extracted from source markdown files
 */
export interface ContentAnalysis {
  /** All analyzed markdown files */
  files: AnalyzedFile[];
  /** Total number of slides across all files */
  totalSlides: number;
  /** Suggested presentation structure */
  suggestedStructure: SlideStructure;
  /** Required images identified in the content */
  images: ImageRequirement[];
  /** Required diagrams identified in the content */
  diagrams: DiagramRequirement[];
  /** Code blocks identified in the content */
  codeBlocks: CodeBlock[];
}

/**
 * A single analyzed markdown file
 */
export interface AnalyzedFile {
  /** File path relative to project root */
  path: string;
  /** Raw file content */
  content: string;
  /** File-level frontmatter (if present) */
  frontmatter?: SlideFrontmatter;
  /** Parsed slides from this file */
  slides: ParsedSlide[];
}

/**
 * A single parsed slide from markdown
 */
export interface ParsedSlide {
  /** Slide content (markdown) */
  content: string;
  /** Slide-level frontmatter (if present) */
  frontmatter?: SlideFrontmatter;
  /** Line number where this slide starts in the source file */
  lineNumber: number;
}

/**
 * Suggested presentation structure
 */
export interface SlideStructure {
  /** Whether a title slide is present/needed */
  hasTitle: boolean;
  /** Major sections in the presentation */
  sections: Section[];
  /** Estimated presentation duration in minutes */
  estimatedDuration?: number;
}

/**
 * A section within the presentation
 */
export interface Section {
  /** Section title */
  title: string;
  /** Number of slides in this section */
  slideCount: number;
  /** Slide types used in this section */
  types: SlideType[];
}

/**
 * Requirement for an image on a slide
 */
export interface ImageRequirement {
  /** Index of the slide that needs this image */
  slideIndex: number;
  /** Search query for finding/generating the image */
  query: string;
  /** Alt text for accessibility */
  alt: string;
}

/**
 * Requirement for a diagram on a slide
 */
export interface DiagramRequirement {
  /** Index of the slide that needs this diagram */
  slideIndex: number;
  /** Diagram type (e.g., 'flowchart', 'sequence', 'graph') */
  type: string;
  /** Diagram content/definition (Mermaid syntax) */
  content: string;
}

/**
 * A code block found in the content
 */
export interface CodeBlock {
  /** Index of the slide containing this code */
  slideIndex: number;
  /** Programming language */
  language: string;
  /** Code content */
  code: string;
  /** Whether to show line numbers */
  lineNumbers?: boolean;
}
