# TICKET-011: Templates and Documentation

## Priority
MEDIUM

## Status
Pending

## Description
Create default templates (config, sample content, themes) and user documentation.

## Dependencies
- TICKET-001 (Project Setup)

## Acceptance Criteria

- [ ] Default config.yaml template created
- [ ] Sample content with all slide types
- [ ] 3 built-in theme CSS files
- [ ] Getting started guide
- [ ] Configuration reference
- [ ] Slide types reference
- [ ] Examples for each slide type

## Technical Details

### Templates to Create

#### `templates/config.yaml`
Complete config with comments

#### `templates/sample-content.md`
Example presentation showcasing all features

#### `templates/themes/professional.css`
Professional theme (default Marp default)

#### `templates/themes/creative.css`
Creative theme (Marp gaia)

#### `templates/themes/technical.css`
Technical theme (Marp uncover)

### Documentation Files

#### `docs/getting-started.md`
- Installation
- Quick start
- Basic usage
- Common workflows

#### `docs/configuration.md`
- Config file reference
- All options explained
- Examples

#### `docs/slide-types.md`
- Each slide type explained
- Frontmatter options
- Examples

## Definition of Done

- [ ] All template files created
- [ ] All docs written
- [ ] Examples tested and working
- [ ] Templates used in init command

## Estimated Complexity
Low-Medium
