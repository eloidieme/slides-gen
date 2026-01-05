/**
 * Base interface for slide generators
 */

import type { Slide } from '../types/index.js';

/**
 * Interface for generating markdown from slide data
 */
export interface SlideGenerator<T extends Slide = Slide> {
  /**
   * Generate Marp-compatible markdown for a slide
   * @param slide - Slide data
   * @returns Markdown string
   */
  generate(slide: T): string;
}
