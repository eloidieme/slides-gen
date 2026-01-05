/**
 * Content slide generator
 */

import type { ContentSlide } from '../types/index.js';
import type { SlideGenerator } from './base.js';

/**
 * Generates Marp markdown for content slides
 */
export class ContentSlideGenerator implements SlideGenerator<ContentSlide> {
  /**
   * Generate a content slide
   * @param slide - Content slide data
   * @returns Marp markdown string
   */
  generate(slide: ContentSlide): string {
    const parts: string[] = [];

    // Add layout class if specified
    if (slide.layout && slide.layout !== 'default') {
      parts.push(`<!-- _class: ${slide.layout} -->`);
      parts.push('');
    }

    // Add heading if present
    if (slide.heading) {
      parts.push(`## ${slide.heading}`);
      parts.push('');
    }

    // Add bullets if present
    if (slide.bullets && slide.bullets.length > 0) {
      slide.bullets.forEach((bullet) => {
        parts.push(`- ${bullet}`);
      });
    } else if (slide.content) {
      // Use provided content if no bullets
      parts.push(slide.content);
    }

    return parts.join('\n');
  }
}
