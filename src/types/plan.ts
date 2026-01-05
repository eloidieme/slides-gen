import type { SlidesConfig, SlideType, SlideFrontmatter } from './config.js';

/**
 * Complete slide generation plan
 * This is the output of the planning phase and input to the generation phase
 */
export interface SlidePlan {
  /** Ordered list of planned slides */
  slides: PlannedSlide[];
  /** Configuration for this presentation */
  config: SlidesConfig;
  /** Presentation-level metadata */
  metadata: PresentationMetadata;
}

/**
 * A single planned slide
 */
export interface PlannedSlide {
  /** Slide type */
  type: SlideType;
  /** Generated markdown content for this slide */
  content: string;
  /** Slide index in the presentation (0-based) */
  index: number;
  /** Optional slide-level metadata */
  metadata?: SlideFrontmatter;
}

/**
 * Metadata about the overall presentation
 */
export interface PresentationMetadata {
  /** Presentation title */
  title?: string;
  /** Author name */
  author?: string;
  /** Presentation date */
  date?: string;
  /** Total number of slides */
  totalSlides: number;
  /** Estimated duration in minutes */
  estimatedDuration?: number;
  /** Tags for categorization */
  tags?: string[];
}
