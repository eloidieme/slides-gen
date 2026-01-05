/**
 * Section slide generator
 */

import type { SectionSlide } from '../types/index.js';
import type { SlideGenerator } from './base.js';

/**
 * Generates Marp markdown for section divider slides
 */
export class SectionSlideGenerator implements SlideGenerator<SectionSlide> {
  /**
   * Generate a section slide
   * @param slide - Section slide data
   * @returns Marp markdown string
   */
  generate(slide: SectionSlide): string {
    const parts: string[] = [];

    // Disable pagination on section slides
    parts.push('<!-- _paginate: false -->');

    // Add lead class for centered layout
    parts.push('<!-- _class: lead -->');

    // Add background color if specified
    if (slide.background) {
      parts.push(`<!-- _backgroundColor: ${slide.background} -->`);
    }

    parts.push('');

    // Add section title
    parts.push(`# ${slide.title}`);

    return parts.join('\n');
  }
}
