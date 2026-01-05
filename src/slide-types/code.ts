/**
 * Code slide generator
 */

import type { CodeSlide } from '../types/index.js';
import type { SlideGenerator } from './base.js';

/**
 * Generates Marp markdown for code slides with syntax highlighting
 */
export class CodeSlideGenerator implements SlideGenerator<CodeSlide> {
  /**
   * Generate a code slide
   * @param slide - Code slide data
   * @returns Marp markdown string
   */
  generate(slide: CodeSlide): string {
    const parts: string[] = [];

    // Add heading if present
    if (slide.heading) {
      parts.push(`## ${slide.heading}`);
      parts.push('');
    }

    // Add code block with language
    parts.push(`\`\`\`${slide.language}`);
    parts.push(slide.code);
    parts.push('```');

    return parts.join('\n');
  }
}
