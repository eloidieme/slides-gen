/**
 * Diagram slide generator
 */

import type { DiagramSlide } from '../types/index.js';
import type { SlideGenerator } from './base.js';

/**
 * Generates Marp markdown for diagram slides (Mermaid)
 */
export class DiagramSlideGenerator implements SlideGenerator<DiagramSlide> {
  /**
   * Generate a diagram slide
   * @param slide - Diagram slide data
   * @returns Marp markdown string
   */
  generate(slide: DiagramSlide): string {
    const parts: string[] = [];

    // Add heading if present
    if (slide.heading) {
      parts.push(`## ${slide.heading}`);
      parts.push('');
    }

    // Add mermaid diagram
    parts.push('```mermaid');
    parts.push(slide.diagram);
    parts.push('```');

    return parts.join('\n');
  }
}
