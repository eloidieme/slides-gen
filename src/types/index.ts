/**
 * Core type definitions for slides-gen
 * This file provides a central export point for all types
 */

// Config types
export type {
  SlidesConfig,
  SlideType,
  OutputFormat,
  SlideFrontmatter,
} from './config.js';

// Slide types
export type {
  Slide,
  TitleSlide,
  ContentSlide,
  SectionSlide,
  CodeSlide,
  DiagramSlide,
  AnySlide,
} from './slide.js';

// Analysis types
export type {
  ContentAnalysis,
  AnalyzedFile,
  ParsedSlide,
  SlideStructure,
  Section,
  ImageRequirement,
  DiagramRequirement,
  CodeBlock,
} from './analysis.js';

// Plan types
export type { SlidePlan, PlannedSlide, PresentationMetadata } from './plan.js';
