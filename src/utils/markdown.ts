/**
 * Utility functions for parsing and manipulating markdown content
 */

/**
 * Split markdown content into individual slides by the separator (---)
 * @param content - Raw markdown content
 * @returns Array of slide content strings
 */
export function splitIntoSlides(content: string): string[] {
  // Split by standalone --- on its own line
  const slides = content.split(/\n---\n/);

  // Trim whitespace and filter out empty slides
  return slides
    .map((slide) => slide.trim())
    .filter((slide) => slide.length > 0 || slides.length === 1);
}

/**
 * Extract all headings from markdown content
 * Excludes headings inside code blocks
 * @param content - Markdown content
 * @returns Array of heading text (without # symbols)
 */
export function extractHeadings(content: string): string[] {
  const headings: string[] = [];

  // Remove code blocks first to avoid matching headings inside them
  const withoutCodeBlocks = content.replace(/```[\s\S]*?```/g, '');

  // Match markdown headings (# to ######)
  const headingRegex = /^#{1,6}\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(withoutCodeBlocks)) !== null) {
    headings.push(match[1].trim());
  }

  return headings;
}

/**
 * Count words in text content
 * Strips markdown syntax and counts actual words
 * @param content - Text content to count
 * @returns Number of words
 */
export function countWords(content: string): number {
  if (!content || content.trim().length === 0) {
    return 0;
  }

  // Remove markdown syntax
  let text = content;

  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, '');

  // Remove inline code
  text = text.replace(/`[^`]+`/g, '');

  // Remove links but keep link text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // Remove images
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '');

  // Remove bold/italic markers
  text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
  text = text.replace(/(\*|_)(.*?)\1/g, '$2');

  // Remove headings markers
  text = text.replace(/^#{1,6}\s+/gm, '');

  // Remove list markers
  text = text.replace(/^\s*[-*+]\s+/gm, '');
  text = text.replace(/^\s*\d+\.\s+/gm, '');

  // Split by whitespace and count
  const words = text
    .split(/\s+/)
    .filter((word) => word.length > 0 && /\w/.test(word));

  return words.length;
}
