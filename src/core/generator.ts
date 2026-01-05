/**
 * Marp markdown generator
 * Converts slide plans into Marp-compatible markdown
 */

import type { SlidesConfig, SlidePlan, AnySlide } from '../types/index.js';
import { TitleSlideGenerator } from '../slide-types/title.js';
import { ContentSlideGenerator } from '../slide-types/content.js';
import { SectionSlideGenerator } from '../slide-types/section.js';
import { CodeSlideGenerator } from '../slide-types/code.js';
import { DiagramSlideGenerator } from '../slide-types/diagram.js';

/**
 * Generates Marp-compatible markdown from slide plans
 */
export class MarpGenerator {
  private titleGenerator = new TitleSlideGenerator();
  private contentGenerator = new ContentSlideGenerator();
  private sectionGenerator = new SectionSlideGenerator();
  private codeGenerator = new CodeSlideGenerator();
  private diagramGenerator = new DiagramSlideGenerator();

  /**
   * Generate Marp frontmatter from configuration
   * @param config - Presentation configuration
   * @returns Marp frontmatter string
   */
  generateFrontmatter(config: SlidesConfig): string {
    const parts: string[] = [];

    parts.push('---');
    parts.push('marp: true');
    parts.push(`theme: ${config.theme}`);
    parts.push(`size: ${config.aspectRatio}`);
    parts.push(`paginate: ${config.pageNumbers}`);

    if (config.footer) {
      // Escape quotes in footer
      const escapedFooter = config.footer.replace(/"/g, '\\"');
      parts.push(`footer: "${escapedFooter}"`);
    }

    parts.push('---');

    return parts.join('\n');
  }

  /**
   * Generate markdown for a single slide
   * @param slide - Slide data
   * @returns Markdown string
   */
  generateSlide(slide: AnySlide): string {
    switch (slide.type) {
      case 'title':
        return this.titleGenerator.generate(slide);
      case 'content':
        return this.contentGenerator.generate(slide);
      case 'section':
        return this.sectionGenerator.generate(slide);
      case 'code':
        return this.codeGenerator.generate(slide);
      case 'diagram':
        return this.diagramGenerator.generate(slide);
    }
  }

  /**
   * Generate complete Marp markdown from a slide plan
   * @param plan - Complete slide plan
   * @returns Marp markdown string
   */
  generate(plan: SlidePlan): string {
    const parts: string[] = [];

    // Add frontmatter
    parts.push(this.generateFrontmatter(plan.config));
    parts.push('');

    // Generate each slide
    const slideMarkdown = plan.slides.map((slide) =>
      this.generateSlide(slide as AnySlide)
    );

    // Join slides with separator
    parts.push(slideMarkdown.join('\n\n---\n\n'));

    return parts.join('\n');
  }
}
