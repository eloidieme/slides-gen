/**
 * Title slide generator
 */

import type { TitleSlide } from '../types/index.js';
import type { SlideGenerator } from './base.js';

/**
 * Generates Marp markdown for title slides
 */
export class TitleSlideGenerator implements SlideGenerator<TitleSlide> {
  /**
   * Generate a title slide
   * @param slide - Title slide data
   * @returns Marp markdown string
   */
  generate(slide: TitleSlide): string {
    const parts: string[] = [];

    // Add lead class for centered layout
    parts.push('<!-- _class: lead -->');
    parts.push('');

    // Add title
    parts.push(`# ${slide.title}`);

    // Add subtitle if present
    if (slide.subtitle) {
      parts.push('');
      parts.push(`## ${slide.subtitle}`);
    }

    // Add author if present
    if (slide.author) {
      parts.push('');
      parts.push(slide.author);
    }

    // Add date if present
    if (slide.date) {
      parts.push('');
      parts.push(slide.date);
    }

    return parts.join('\n');
  }
}
