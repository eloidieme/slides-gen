# Ticket Implementation Protocol

This document defines the **Test-Driven Development (TDD)** protocol for implementing tickets in the slides-gen project. Follow this process rigorously for all implementation work.

## Overview

We follow a strict **Red-Green-Refactor** cycle:

1. **Red**: Write a failing test first
2. **Green**: Write minimum code to make it pass
3. **Refactor**: Improve code while keeping tests green
4. **Repeat**: Continue until ticket is complete

## Prerequisites

Before starting any ticket:

1. Read the ticket completely
2. Understand acceptance criteria
3. Review dependencies (must be completed first)
4. Check the spec.md for technical context
5. Review related type definitions

## Implementation Steps

### Step 1: Preparation

**Actions:**
1. Create feature branch:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/ticket-XXX-short-description
   ```

2. Verify environment:
   ```bash
   npm install
   npm test    # Should pass (or have expected failures)
   npm run build
   ```

3. Read ticket and dependencies thoroughly
4. Identify which files need to be created/modified
5. Plan your test cases mentally (or in comments)

**Output:** Clean branch, understanding of task

---

### Step 2: Write Failing Test (RED)

**Actions:**
1. Create test file in appropriate directory:
   - Unit tests: `tests/unit/[feature].test.ts`
   - Integration tests: `tests/integration/[feature].test.ts`

2. Write the SIMPLEST failing test first:
   ```typescript
   import { describe, it, expect } from 'vitest';
   import { MyFeature } from '../src/core/my-feature.js';

   describe('MyFeature', () => {
     describe('myMethod()', () => {
       it('should handle basic case', () => {
         // Arrange
         const input = 'test';
         const feature = new MyFeature();

         // Act
         const result = feature.myMethod(input);

         // Assert
         expect(result).toBe('expected');
       });
     });
   });
   ```

3. Run test and VERIFY IT FAILS:
   ```bash
   npm test -- my-feature
   ```

4. Expected: Test fails because implementation doesn't exist yet

**Rules:**
- Start with the simplest, most basic test case
- One test at a time (don't write multiple failing tests)
- Test should fail for the RIGHT reason (not syntax error)
- Use AAA pattern: Arrange, Act, Assert
- Descriptive test names: `should [expected behavior] when [condition]`

**Output:** One failing test that fails for the right reason

---

### Step 3: Implement Minimum Code (GREEN)

**Actions:**
1. Create implementation file:
   ```typescript
   // src/core/my-feature.ts
   export class MyFeature {
     myMethod(input: string): string {
       // Minimum code to pass the test
       return 'expected';
     }
   }
   ```

2. Run test:
   ```bash
   npm test -- my-feature
   ```

3. Verify test PASSES

**Rules:**
- Write MINIMUM code to pass (even if hardcoded)
- Don't add extra features "while you're there"
- Don't optimize yet
- Don't handle edge cases not covered by tests
- Keep it simple and obvious

**Output:** One passing test, minimal implementation

---

### Step 4: Refactor (CLEAN)

**Actions:**
1. Look at your code critically:
   - Can it be simplified?
   - Are names clear?
   - Any duplication?
   - Proper abstractions?

2. Refactor while keeping tests green:
   ```bash
   npm test -- my-feature --watch
   ```

3. Run after each small change

**Rules:**
- Tests must stay green during refactoring
- Small incremental changes
- Commit after each significant refactor
- Don't change behavior, only structure
- Add TypeScript types properly

**Output:** Clean code, all tests still passing

---

### Step 5: Add More Tests (Repeat RED-GREEN-REFACTOR)

**Actions:**
1. Write next failing test (edge case, error handling, etc.):
   ```typescript
   it('should handle empty input', () => {
     const feature = new MyFeature();
     const result = feature.myMethod('');
     expect(result).toBe('');
   });

   it('should throw error for invalid input', () => {
     const feature = new MyFeature();
     expect(() => feature.myMethod(null)).toThrow('Invalid input');
   });
   ```

2. Run tests - new test fails
3. Implement to make it pass
4. Refactor if needed
5. Repeat until all acceptance criteria met

**Test Cases to Consider:**
- Happy path (basic functionality)
- Edge cases (empty, null, undefined, extremes)
- Error conditions (invalid input, missing dependencies)
- Boundary conditions (min, max, zero, one)
- Integration points (interaction with other components)

**Output:** Comprehensive test coverage, robust implementation

---

### Step 6: Integration Testing

**Actions:**
1. Write integration test if applicable:
   ```typescript
   // tests/integration/end-to-end.test.ts
   describe('Feature Integration', () => {
     it('should work end-to-end', async () => {
       // Test complete workflow
     });
   });
   ```

2. Test with real files/data (use fixtures)
3. Verify interactions between components

**Output:** Integration tests passing

---

### Step 7: Documentation

**Actions:**
1. Add JSDoc comments to public APIs:
   ```typescript
   /**
    * Processes content and returns result
    * @param content - The input content to process
    * @returns Processed result
    * @throws {ValidationError} If content is invalid
    * @example
    * ```typescript
    * const feature = new MyFeature();
    * const result = feature.myMethod('input');
    * ```
    */
   export function myMethod(content: string): string {
     // ...
   }
   ```

2. Update README.md if public API changed
3. Update relevant docs/ files
4. Add examples if needed

**Output:** Well-documented code

---

### Step 8: Final Validation

**Actions:**
1. Run full test suite:
   ```bash
   npm test
   ```

2. Check coverage:
   ```bash
   npm run test:coverage
   ```
   - Verify coverage meets requirements (typically 80%+)
   - Critical paths should have 100% coverage

3. Run type checking:
   ```bash
   npm run typecheck
   ```

4. Run linting:
   ```bash
   npm run lint
   ```

5. Format code:
   ```bash
   npm run format
   ```

6. Build:
   ```bash
   npm run build
   ```

7. Verify all acceptance criteria from ticket are met

**Checklist:**
- [ ] All tests passing
- [ ] Coverage meets requirements
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Code formatted
- [ ] Build succeeds
- [ ] All acceptance criteria met
- [ ] Documentation updated

**Output:** Production-ready code

---

### Step 9: Commit and Push

**Actions:**
1. Review changes:
   ```bash
   git status
   git diff
   ```

2. Commit with conventional commit message:
   ```bash
   git add .
   git commit -m "feat: implement content analyzer

   - Add parseMarkdown method
   - Add frontmatter extraction
   - Add slide splitting logic
   - Add code block detection
   - Add mermaid diagram detection
   - Test coverage: 92%

   Closes #XXX"
   ```

**Commit Message Format:**
```
<type>: <short description>

<detailed description>
- Bullet point 1
- Bullet point 2

Closes #<ticket-number>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `test`: Adding/updating tests
- `refactor`: Code refactoring
- `docs`: Documentation
- `chore`: Maintenance (deps, config)

3. Push to remote:
   ```bash
   git push origin feature/ticket-XXX-short-description
   ```

**Output:** Code committed and pushed

---

### Step 10: Create Pull Request

**Actions:**
1. Create PR on GitHub
2. Fill out PR template:
   ```markdown
   ## Description
   Implements content analyzer for parsing markdown files

   ## Ticket
   Closes #XXX

   ## Type of Change
   - [x] New feature

   ## Implementation Details
   - Added ContentAnalyzer class
   - Parses frontmatter using gray-matter
   - Splits slides by `---` separator
   - Detects code blocks and Mermaid diagrams

   ## Testing
   - Unit tests for all methods
   - Integration test with real markdown files
   - Coverage: 92%

   ## Checklist
   - [x] Tests added and passing
   - [x] Documentation updated
   - [x] Follows TDD protocol
   - [x] All checks pass
   ```

3. Request review
4. Address review comments
5. Merge when approved

**Output:** PR created and under review

---

## TDD Best Practices

### Do's ✓

- **Write test first, always**: No code without a test
- **One test at a time**: Focus on one thing
- **Small steps**: Tiny increments, frequent commits
- **Test behavior, not implementation**: Test what it does, not how
- **Descriptive names**: Tests should read like specifications
- **AAA pattern**: Arrange, Act, Assert for clarity
- **Test edge cases**: Empty, null, boundaries, errors
- **Keep tests simple**: Tests should be obvious
- **Fast tests**: Unit tests should run in milliseconds
- **Independent tests**: No test depends on another

### Don'ts ✗

- **Don't skip tests**: "I'll add tests later" = never
- **Don't test implementation details**: Test public API only
- **Don't write tests for tests**: Test production code
- **Don't ignore failing tests**: Fix or remove, don't skip
- **Don't write all tests first**: One at a time (Red-Green-Refactor)
- **Don't test framework code**: Trust your dependencies
- **Don't make tests complex**: Complex tests = bugs in tests
- **Don't couple tests**: Each test isolated and independent
- **Don't hardcode paths**: Use fixtures and relative paths
- **Don't commit failing tests**: All commits should have green tests

---

## Example: Complete TDD Cycle

Let's implement a simple markdown parser following TDD:

### Iteration 1: Basic Parsing

**Red:**
```typescript
// tests/unit/parser.test.ts
describe('MarkdownParser', () => {
  it('should parse simple markdown', () => {
    const parser = new MarkdownParser();
    const result = parser.parse('# Hello');
    expect(result.heading).toBe('Hello');
  });
});
```

Run: `npm test` → ❌ Fails (MarkdownParser doesn't exist)

**Green:**
```typescript
// src/utils/parser.ts
export class MarkdownParser {
  parse(markdown: string) {
    return { heading: 'Hello' };
  }
}
```

Run: `npm test` → ✅ Passes

**Refactor:**
```typescript
export class MarkdownParser {
  parse(markdown: string) {
    const heading = markdown.replace(/^# /, '');
    return { heading };
  }
}
```

Run: `npm test` → ✅ Still passes

Commit: `git commit -m "feat: add basic markdown parser"`

### Iteration 2: Handle Edge Case

**Red:**
```typescript
it('should handle markdown without heading', () => {
  const parser = new MarkdownParser();
  const result = parser.parse('No heading here');
  expect(result.heading).toBeUndefined();
});
```

Run: `npm test` → ❌ Fails

**Green:**
```typescript
export class MarkdownParser {
  parse(markdown: string) {
    if (!markdown.startsWith('# ')) {
      return { heading: undefined };
    }
    const heading = markdown.replace(/^# /, '');
    return { heading };
  }
}
```

Run: `npm test` → ✅ Passes

Commit: `git commit -m "feat: handle markdown without heading"`

**Continue until complete...**

---

## Troubleshooting

### Test Won't Fail (Already Passing)

**Problem:** Wrote test but it passes immediately
**Solution:** Your test isn't testing what you think, or code already exists. Verify test logic.

### Test Fails for Wrong Reason

**Problem:** Syntax error or import error, not assertion failure
**Solution:** Fix syntax first, then verify test fails with correct assertion error

### Can't Make Test Pass Simply

**Problem:** Test requires complex implementation
**Solution:** Test is too big. Break into smaller tests. Start with simpler case.

### Tests Become Slow

**Problem:** Tests take too long to run
**Solution:** Mock external dependencies. Use unit tests, not integration tests. Avoid file I/O in unit tests.

### Too Much Duplication in Tests

**Problem:** Setup code repeated everywhere
**Solution:** Use `beforeEach` for common setup. Create test helpers. Use fixtures.

### Refactoring Breaks Many Tests

**Problem:** Changed implementation, many tests fail
**Solution:** Tests are too coupled to implementation. Test behavior, not internals.

---

## Code Review Checklist

When reviewing PRs, verify:

- [ ] Tests written before implementation (check git history)
- [ ] All tests passing
- [ ] Coverage meets requirements
- [ ] Tests follow AAA pattern
- [ ] Test names are descriptive
- [ ] Edge cases tested
- [ ] Error cases tested
- [ ] No commented-out code
- [ ] No console.log debugging
- [ ] TypeScript types are specific (no `any`)
- [ ] Code is documented (JSDoc on public APIs)
- [ ] Follows project style (eslint passes)
- [ ] Code is formatted (prettier)
- [ ] Acceptance criteria met
- [ ] Integration test included (if applicable)

---

## Tools and Commands Reference

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- parser

# Watch mode
npm test:watch

# Coverage report
npm run test:coverage

# Run only unit tests
npm test -- tests/unit

# Run only integration tests
npm test -- tests/integration
```

### Code Quality

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Auto-fix linting issues
npm run lint -- --fix

# Format code
npm run format

# Check formatting
npm run format:check
```

### Development

```bash
# Run CLI in dev mode
npm run dev -- <command>

# Build
npm run build

# Build and run
npm run build && node dist/cli/index.js
```

---

## Summary

1. **Red**: Write failing test
2. **Green**: Minimum code to pass
3. **Refactor**: Clean up
4. **Repeat**: Until ticket complete
5. **Commit**: With conventional message
6. **PR**: Request review

**Remember:** Tests are not optional. Tests are not something you add later. Tests ARE the development process.

Following this protocol ensures:
- High code quality
- Comprehensive test coverage
- Regression prevention
- Clear documentation
- Maintainable codebase
- Confident refactoring

---

**Happy Test-Driven Development! 🧪**
