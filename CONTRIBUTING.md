# Contributing to slides-gen

Thank you for your interest in contributing to slides-gen! This document provides guidelines and instructions for contributing.

## Development Process

We follow a Test-Driven Development (TDD) approach. Please see [TICKET_PROTOCOL.md](TICKET_PROTOCOL.md) for the detailed implementation workflow.

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Setup

1. Fork and clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/slides-gen.git
cd slides-gen
```

2. Install dependencies:

```bash
npm install
```

3. Run tests to verify setup:

```bash
npm test
```

4. Build the project:

```bash
npm run build
```

## Development Workflow

### 1. Pick a Ticket

Check the `tickets/` directory or GitHub Issues for available tasks. MVP tickets are prioritized.

### 2. Create a Feature Branch

```bash
git checkout -b feature/ticket-X-short-description
```

Branch naming convention:
- `feature/ticket-X-description` for new features
- `fix/ticket-X-description` for bug fixes
- `docs/description` for documentation
- `refactor/description` for refactoring

### 3. Follow TDD Protocol

See [TICKET_PROTOCOL.md](TICKET_PROTOCOL.md) for the step-by-step TDD process:

1. Write failing tests (Red)
2. Implement minimum code to pass (Green)
3. Refactor while keeping tests green
4. Commit with conventional commit messages

### 4. Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add code slide type generator
fix: handle empty markdown files
test: add unit tests for analyzer
docs: update configuration guide
refactor: simplify slide planner logic
chore: update dependencies
```

### 5. Submit Pull Request

- Push your branch to your fork
- Open a PR against the `main` branch
- Fill out the PR template
- Ensure all CI checks pass
- Request review

## Code Style

### TypeScript Guidelines

- **Strict mode**: Always enabled
- **No `any` types**: Use specific types or `unknown`
- **Explicit return types**: For all public functions
- **Naming conventions**:
  - `camelCase` for variables and functions
  - `PascalCase` for classes and types
  - `UPPER_SNAKE_CASE` for constants

### File Structure

- One class/interface per file
- File names in `kebab-case.ts`
- Test files as `kebab-case.test.ts`
- Index files for barrel exports

### Code Organization

```typescript
// 1. Imports (external, then internal)
import { Command } from 'commander';
import { Logger } from '../utils/logger.js';

// 2. Types and interfaces
interface MyOptions {
  verbose: boolean;
}

// 3. Constants
const DEFAULT_TIMEOUT = 5000;

// 4. Main implementation
export class MyClass {
  // ...
}

// 5. Helper functions (if needed)
function helperFunction() {
  // ...
}
```

## Testing

### Writing Tests

- Use Vitest with global test functions
- Follow AAA pattern: Arrange, Act, Assert
- Test file structure mirrors source structure
- Use descriptive test names

Example:

```typescript
import { describe, it, expect } from 'vitest';
import { ContentAnalyzer } from '../src/core/analyzer.js';

describe('ContentAnalyzer', () => {
  describe('analyze()', () => {
    it('should parse markdown with frontmatter', () => {
      // Arrange
      const markdown = '---\ntitle: Test\n---\n# Hello';
      const analyzer = new ContentAnalyzer();

      // Act
      const result = analyzer.analyze(markdown);

      // Assert
      expect(result.metadata.title).toBe('Test');
    });
  });
});
```

### Running Tests

```bash
npm test                 # Run all tests
npm test -- analyzer     # Run specific test file
npm run test:watch      # Watch mode
npm run test:coverage   # Generate coverage report
```

### Coverage Requirements

- Minimum 80% overall coverage
- 100% coverage for core business logic
- Integration test for each feature

## Documentation

### Code Comments

- Use JSDoc for public APIs
- Explain "why" not "what" in complex logic
- Keep comments up to date with code

Example:

```typescript
/**
 * Analyzes markdown content and extracts slide structure
 * @param content - Raw markdown string with optional frontmatter
 * @returns Analysis result with slide metadata and structure
 * @throws {ValidationError} If markdown contains invalid frontmatter
 */
export function analyzeContent(content: string): ContentAnalysis {
  // ...
}
```

### README Updates

If your PR adds/changes features:
1. Update main README.md
2. Add/update relevant docs/ file
3. Update examples if needed

## Pull Request Process

### Before Submitting

- [ ] All tests pass (`npm test`)
- [ ] Code is formatted (`npm run format`)
- [ ] Linting passes (`npm run lint`)
- [ ] Type checking passes (`npm run typecheck`)
- [ ] Coverage meets requirements
- [ ] Documentation updated
- [ ] CHANGELOG.md updated (if applicable)

### PR Template

```markdown
## Description
Brief description of changes

## Ticket
Closes #X

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe testing approach

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Follows TDD protocol
- [ ] All checks pass
```

### Review Process

1. At least one maintainer approval required
2. All CI checks must pass
3. No unresolved conversations
4. Up to date with main branch

## Reporting Issues

### Bug Reports

Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md):

- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Minimal reproduction example

### Feature Requests

Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md):

- Problem or use case
- Proposed solution
- Alternatives considered
- Example usage

## Code Review Guidelines

### For Authors

- Keep PRs focused and small
- Respond to feedback promptly
- Be open to suggestions
- Update based on review comments

### For Reviewers

- Be constructive and respectful
- Ask questions for understanding
- Suggest alternatives when appropriate
- Approve when ready, request changes if needed

## Getting Help

- **Questions**: GitHub Discussions
- **Bugs**: GitHub Issues
- **Chat**: (Coming soon)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to slides-gen!
