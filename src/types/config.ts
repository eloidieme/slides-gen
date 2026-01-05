/**
 * Supported slide types in the MVP
 */
export type SlideType = 'title' | 'content' | 'section' | 'code' | 'diagram';

/**
 * Supported output formats
 */
export type OutputFormat = 'html' | 'pdf' | 'pptx';

/**
 * Main configuration for slide generation
 */
export interface SlidesConfig {
  /** Theme name (e.g., 'default', 'gaia', 'uncover') */
  theme: string;
  /** Presentation aspect ratio */
  aspectRatio: '16:9' | '4:3';
  /** Slide transition effect */
  transition: 'fade' | 'slide' | 'none';
  /** Show page numbers on slides */
  pageNumbers: boolean;
  /** Optional footer text for all slides */
  footer?: string;
  /** Presentation tone for AI-generated content */
  tone: 'professional' | 'casual' | 'technical' | 'creative' | 'academic';
  /** Allowed slide types for this presentation */
  slideTypes: SlideType[];
  /** Strategy for handling images */
  imageStrategy: 'placeholder' | 'mcp_unsplash' | 'local';
  /** MCP server URL for image generation (if using mcp_unsplash) */
  imageMcpServer?: string;
  /** Diagram rendering engine (only mermaid supported in MVP) */
  diagramEngine: 'mermaid';
  /** Output directory for generated slides */
  outputDir: string;
  /** Output formats to generate */
  formats: OutputFormat[];
}

/**
 * Per-slide frontmatter configuration
 * Allows overriding presentation-level settings on a per-slide basis
 */
export interface SlideFrontmatter {
  /** Slide type override */
  type?: SlideType;
  /** Slide title */
  title?: string;
  /** Author name (typically for title slides) */
  author?: string;
  /** Date (typically for title slides) */
  date?: string;
  /** Theme override for this slide */
  theme?: string;
  /** Background color or image URL */
  background?: string;
  /** Custom CSS class for this slide */
  class?: string;
  /** Inline CSS styles for this slide */
  style?: string;
  /** Allow any custom frontmatter fields */
  [key: string]: unknown;
}
