# slides-gen

AI-powered CLI tool for automated slide deck generation from markdown content.

## Overview

**slides-gen** transforms your markdown files into professional presentations using Marp, with intelligent content analysis and generation powered by Claude Code.

## Features

- **Markdown-based**: Write slides in familiar markdown syntax
- **Multiple formats**: Export to HTML, PDF, and PPTX
- **Smart generation**: AI-powered slide structure and planning
- **Diagram support**: Built-in Mermaid diagrams
- **Syntax highlighting**: Beautiful code snippets
- **Themeable**: Multiple built-in themes and custom CSS support
- **Terminal-native**: Full CLI workflow

## Quick Start

```bash
# Install
npm install -g slides-gen

# Initialize new project
slides-gen init my-presentation

# Generate slides
cd my-presentation
slides-gen generate ./content

# Preview in browser
slides-gen preview
```

## Slide Types

- **Title slides**: Presentation headers with title/subtitle
- **Content slides**: Bullet points and text
- **Section dividers**: Visual breaks between topics
- **Code slides**: Syntax-highlighted code blocks
- **Diagram slides**: Mermaid flowcharts and diagrams

## Documentation

- [Technical Specification](spec.md)
- [Development Guide](CLAUDE.md)
- [Getting Started](docs/getting-started.md) *(coming soon)*
- [Configuration](docs/configuration.md) *(coming soon)*

## Development Status

**Current Version**: 0.1.0-alpha

This project is in early development. See `tickets/` directory for MVP implementation tasks.

## Contributing

Contributions welcome! Please read [TICKET_PROTOCOL.md](TICKET_PROTOCOL.md) for our TDD development process.

## License

MIT

## Acknowledgments

Built with:
- [Marp](https://marp.app/) - Markdown Presentation Ecosystem
- [Mermaid](https://mermaid.js.org/) - Diagram generation
- [Commander.js](https://github.com/tj/commander.js/) - CLI framework
