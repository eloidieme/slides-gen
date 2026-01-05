/**
 * Marp compiler wrapper
 * Compiles markdown files to various output formats using Marp CLI
 */

import { existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { marpCli } from '@marp-team/marp-cli';
import type { SlidesConfig, OutputFormat } from '../types/index.js';

/**
 * Wrapper for Marp CLI to compile markdown to various formats
 */
export class MarpCompiler {
  /**
   * Compile markdown to HTML format
   * @param markdownPath - Path to input markdown file
   * @param outputPath - Path for output HTML file
   * @returns Path to generated HTML file
   */
  async compileToHTML(
    markdownPath: string,
    outputPath: string
  ): Promise<string> {
    // Validate input file exists
    if (!existsSync(markdownPath)) {
      throw new Error(`Input file not found: ${markdownPath}`);
    }

    // Ensure output directory exists
    const outputDir = dirname(outputPath);
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    // Run Marp CLI
    const exitCode = await marpCli([
      markdownPath,
      '--html',
      '--output',
      outputPath,
      '--allow-local-files',
    ]);

    if (exitCode !== 0) {
      throw new Error(`Marp compilation failed with exit code ${exitCode}`);
    }

    return outputPath;
  }

  /**
   * Compile markdown to PDF format
   * @param markdownPath - Path to input markdown file
   * @param outputPath - Path for output PDF file
   * @returns Path to generated PDF file
   */
  async compileToPDF(
    markdownPath: string,
    outputPath: string
  ): Promise<string> {
    // Validate input file exists
    if (!existsSync(markdownPath)) {
      throw new Error(`Input file not found: ${markdownPath}`);
    }

    // Ensure output directory exists
    const outputDir = dirname(outputPath);
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    // Run Marp CLI with PDF output
    const exitCode = await marpCli([
      markdownPath,
      '--html',
      '--pdf',
      '--output',
      outputPath,
      '--allow-local-files',
    ]);

    if (exitCode !== 0) {
      throw new Error(`Marp PDF compilation failed with exit code ${exitCode}`);
    }

    return outputPath;
  }

  /**
   * Compile markdown to specified format
   * @param markdownPath - Path to input markdown file
   * @param outputPath - Path for output file
   * @param format - Output format (html, pdf, pptx)
   * @param config - Presentation configuration
   * @returns Path to generated file
   */
  async compile(
    markdownPath: string,
    outputPath: string,
    format: OutputFormat,
    _config: SlidesConfig
  ): Promise<string> {
    // Compile based on format
    switch (format) {
      case 'html':
        return this.compileToHTML(markdownPath, outputPath);
      case 'pdf':
        return this.compileToPDF(markdownPath, outputPath);
      case 'pptx':
        throw new Error('PPTX format is not supported in MVP');
    }
  }
}
