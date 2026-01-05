import { describe, it, expectTypeOf } from 'vitest';
import type {
  SlidesConfig,
  SlideType,
  OutputFormat,
  SlideFrontmatter,
  Slide,
  TitleSlide,
  ContentSlide,
  SectionSlide,
  CodeSlide,
  DiagramSlide,
  AnySlide,
  ContentAnalysis,
  AnalyzedFile,
  ParsedSlide,
  SlideStructure,
  Section,
  ImageRequirement,
  DiagramRequirement,
  CodeBlock,
  SlidePlan,
  PlannedSlide,
  PresentationMetadata,
} from '../../src/types';

describe('Type Definitions', () => {
  describe('Config Types', () => {
    it('should have valid SlidesConfig type', () => {
      const config: SlidesConfig = {
        theme: 'default',
        aspectRatio: '16:9',
        transition: 'fade',
        pageNumbers: true,
        tone: 'professional',
        slideTypes: ['title', 'content'],
        imageStrategy: 'placeholder',
        diagramEngine: 'mermaid',
        outputDir: './output',
        formats: ['html'],
      };
      expectTypeOf(config).toMatchTypeOf<SlidesConfig>();
    });

    it('should enforce aspectRatio literal types', () => {
      expectTypeOf<'16:9'>().toMatchTypeOf<SlidesConfig['aspectRatio']>();
      expectTypeOf<'4:3'>().toMatchTypeOf<SlidesConfig['aspectRatio']>();
    });

    it('should enforce SlideType union', () => {
      expectTypeOf<'title'>().toMatchTypeOf<SlideType>();
      expectTypeOf<'content'>().toMatchTypeOf<SlideType>();
      expectTypeOf<'section'>().toMatchTypeOf<SlideType>();
      expectTypeOf<'code'>().toMatchTypeOf<SlideType>();
      expectTypeOf<'diagram'>().toMatchTypeOf<SlideType>();
    });

    it('should enforce OutputFormat union', () => {
      expectTypeOf<'html'>().toMatchTypeOf<OutputFormat>();
      expectTypeOf<'pdf'>().toMatchTypeOf<OutputFormat>();
      expectTypeOf<'pptx'>().toMatchTypeOf<OutputFormat>();
    });

    it('should have valid SlideFrontmatter type', () => {
      const frontmatter: SlideFrontmatter = {
        type: 'title',
        title: 'My Presentation',
        author: 'John Doe',
        customField: 'custom value',
      };
      expectTypeOf(frontmatter).toMatchTypeOf<SlideFrontmatter>();
    });
  });

  describe('Slide Types', () => {
    it('should have valid TitleSlide type', () => {
      const slide: TitleSlide = {
        type: 'title',
        content: '# Title\n## Subtitle',
        title: 'My Title',
        subtitle: 'My Subtitle',
        author: 'John Doe',
        date: '2024-01-01',
      };
      expectTypeOf(slide).toMatchTypeOf<TitleSlide>();
    });

    it('should have valid ContentSlide type', () => {
      const slide: ContentSlide = {
        type: 'content',
        content: '- Point 1\n- Point 2',
        heading: 'Main Points',
        bullets: ['Point 1', 'Point 2'],
        layout: 'default',
      };
      expectTypeOf(slide).toMatchTypeOf<ContentSlide>();
    });

    it('should have valid SectionSlide type', () => {
      const slide: SectionSlide = {
        type: 'section',
        content: '# Section Title',
        title: 'Section Title',
        background: '#ff0000',
      };
      expectTypeOf(slide).toMatchTypeOf<SectionSlide>();
    });

    it('should have valid CodeSlide type', () => {
      const slide: CodeSlide = {
        type: 'code',
        content: '```js\ncode\n```',
        language: 'javascript',
        code: 'console.log("hello")',
        heading: 'Example Code',
        highlight: '2-4',
      };
      expectTypeOf(slide).toMatchTypeOf<CodeSlide>();
    });

    it('should have valid DiagramSlide type', () => {
      const slide: DiagramSlide = {
        type: 'diagram',
        content: '```mermaid\ngraph TD\n```',
        engine: 'mermaid',
        diagram: 'graph TD\nA --> B',
        heading: 'Architecture',
      };
      expectTypeOf(slide).toMatchTypeOf<DiagramSlide>();
    });

    it('should support AnySlide discriminated union', () => {
      const slides: AnySlide[] = [
        { type: 'title', content: '', title: 'Title' },
        { type: 'content', content: '', bullets: [] },
      ];
      expectTypeOf(slides).toMatchTypeOf<AnySlide[]>();
    });
  });

  describe('Analysis Types', () => {
    it('should have valid ContentAnalysis type', () => {
      const analysis: ContentAnalysis = {
        files: [],
        totalSlides: 10,
        suggestedStructure: {
          hasTitle: true,
          sections: [],
        },
        images: [],
        diagrams: [],
        codeBlocks: [],
      };
      expectTypeOf(analysis).toMatchTypeOf<ContentAnalysis>();
    });

    it('should have valid AnalyzedFile type', () => {
      const file: AnalyzedFile = {
        path: './content.md',
        content: '# Title\n\nContent',
        frontmatter: { type: 'title' },
        slides: [],
      };
      expectTypeOf(file).toMatchTypeOf<AnalyzedFile>();
    });

    it('should have valid ParsedSlide type', () => {
      const slide: ParsedSlide = {
        content: '# Slide content',
        frontmatter: { type: 'content' },
        lineNumber: 5,
      };
      expectTypeOf(slide).toMatchTypeOf<ParsedSlide>();
    });

    it('should have valid SlideStructure type', () => {
      const structure: SlideStructure = {
        hasTitle: true,
        sections: [
          {
            title: 'Introduction',
            slideCount: 3,
            types: ['title', 'content'],
          },
        ],
        estimatedDuration: 15,
      };
      expectTypeOf(structure).toMatchTypeOf<SlideStructure>();
    });

    it('should have valid Section type', () => {
      const section: Section = {
        title: 'Main Content',
        slideCount: 5,
        types: ['content', 'code'],
      };
      expectTypeOf(section).toMatchTypeOf<Section>();
    });

    it('should have valid ImageRequirement type', () => {
      const req: ImageRequirement = {
        slideIndex: 3,
        query: 'office meeting',
        alt: 'Professional office meeting',
      };
      expectTypeOf(req).toMatchTypeOf<ImageRequirement>();
    });

    it('should have valid DiagramRequirement type', () => {
      const req: DiagramRequirement = {
        slideIndex: 5,
        type: 'flowchart',
        content: 'graph TD\nA --> B',
      };
      expectTypeOf(req).toMatchTypeOf<DiagramRequirement>();
    });

    it('should have valid CodeBlock type', () => {
      const block: CodeBlock = {
        slideIndex: 7,
        language: 'typescript',
        code: 'const x = 1;',
        lineNumbers: true,
      };
      expectTypeOf(block).toMatchTypeOf<CodeBlock>();
    });
  });

  describe('Plan Types', () => {
    it('should have valid SlidePlan type', () => {
      const plan: SlidePlan = {
        slides: [],
        config: {
          theme: 'default',
          aspectRatio: '16:9',
          transition: 'fade',
          pageNumbers: true,
          tone: 'professional',
          slideTypes: ['title', 'content'],
          imageStrategy: 'placeholder',
          diagramEngine: 'mermaid',
          outputDir: './output',
          formats: ['html'],
        },
        metadata: {
          totalSlides: 10,
        },
      };
      expectTypeOf(plan).toMatchTypeOf<SlidePlan>();
    });

    it('should have valid PlannedSlide type', () => {
      const slide: PlannedSlide = {
        type: 'content',
        content: '- Point 1',
        index: 0,
        metadata: { title: 'Slide Title' },
      };
      expectTypeOf(slide).toMatchTypeOf<PlannedSlide>();
    });

    it('should have valid PresentationMetadata type', () => {
      const metadata: PresentationMetadata = {
        title: 'My Presentation',
        author: 'John Doe',
        date: '2024-01-01',
        totalSlides: 20,
        estimatedDuration: 30,
        tags: ['business', 'tech'],
      };
      expectTypeOf(metadata).toMatchTypeOf<PresentationMetadata>();
    });
  });
});
