import type { SlideType, SlideFrontmatter } from './config.js';

/**
 * Base slide interface
 * All slide types extend this interface
 */
export interface Slide {
  /** Slide type discriminator */
  type: SlideType;
  /** Raw markdown content for this slide */
  content: string;
  /** Optional frontmatter metadata */
  metadata?: SlideFrontmatter;
  /** Slide index in the presentation (0-based) */
  index?: number;
}

/**
 * Title slide - typically the first slide of a presentation
 */
export interface TitleSlide extends Slide {
  type: 'title';
  /** Main title text */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Author name */
  author?: string;
  /** Presentation date */
  date?: string;
}

/**
 * Content slide - standard slide with bullet points and text
 */
export interface ContentSlide extends Slide {
  type: 'content';
  /** Optional heading for the slide */
  heading?: string;
  /** Bullet point items */
  bullets?: string[];
  /** Layout variant */
  layout?: 'default' | 'two-column' | 'center';
}

/**
 * Section slide - divider slide between major sections
 */
export interface SectionSlide extends Slide {
  type: 'section';
  /** Section title */
  title: string;
  /** Optional background color or image */
  background?: string;
}

/**
 * Code slide - displays syntax-highlighted code
 */
export interface CodeSlide extends Slide {
  type: 'code';
  /** Programming language for syntax highlighting */
  language: string;
  /** Code content to display */
  code: string;
  /** Optional heading above the code */
  heading?: string;
  /** Line numbers or ranges to highlight (e.g., "2-4,6") */
  highlight?: string;
}

/**
 * Diagram slide - displays a diagram (Mermaid in MVP)
 */
export interface DiagramSlide extends Slide {
  type: 'diagram';
  /** Diagram rendering engine */
  engine: 'mermaid';
  /** Diagram definition (Mermaid syntax) */
  diagram: string;
  /** Optional heading above the diagram */
  heading?: string;
}

/**
 * Discriminated union of all slide types
 * Use this when you need to work with any slide type
 */
export type AnySlide =
  | TitleSlide
  | ContentSlide
  | SectionSlide
  | CodeSlide
  | DiagramSlide;
