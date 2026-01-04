# TICKET-001: Project Setup and Configuration

## Priority
**CRITICAL** - Must be completed first

## Status
Pending

## Description
Set up the TypeScript project foundation with all necessary tooling, dependencies, and build configuration. This is the foundation for all other tickets.

## Dependencies
None - this is the first ticket

## Acceptance Criteria

- [ ] TypeScript compiler configured and working
- [ ] All npm dependencies installed successfully
- [ ] ESLint and Prettier configured and passing
- [ ] Vitest test framework configured
- [ ] Build script produces valid JavaScript output
- [ ] Dev script can run TypeScript directly with tsx
- [ ] All npm scripts working (build, test, lint, format)
- [ ] Basic hello-world CLI executable works

## Technical Details

### Files to Create/Modify
- `package.json` - Already created, verify dependencies install
- `tsconfig.json` - Already created, verify configuration
- `.eslintrc.json` - Already created, verify linting works
- `.prettierrc` - Already created, verify formatting works
- `vitest.config.ts` - Already created, verify tests run
- `src/cli/index.ts` - Create basic CLI entry point

### Implementation Steps (TDD)

1. **Test**: Create `tests/integration/setup.test.ts` that verifies project setup
   - Test that TypeScript compiles without errors
   - Test that build output exists in dist/
   - Test that CLI entry point is executable

2. **Implement**: Install dependencies and verify configuration
   ```bash
   npm install
   npm run build
   npm run typecheck
   npm run lint
   npm run format:check
   npm test
   ```

3. **Test**: Create `src/cli/index.ts` basic structure test
   - Should export main function
   - Should parse command line arguments

4. **Implement**: Create basic CLI entry point
   ```typescript
   #!/usr/bin/env node
   import { Command } from 'commander';

   const program = new Command();
   program
     .name('slides-gen')
     .description('AI-powered slide generation from markdown')
     .version('0.1.0');

   program.parse();
   ```

5. **Verify**: Run the CLI
   ```bash
   npm run build
   node dist/cli/index.js --version
   npm run dev -- --version
   ```

## Definition of Done

- [ ] `npm install` completes without errors
- [ ] `npm run build` produces dist/ directory with compiled JS
- [ ] `npm test` runs successfully (even if no tests yet)
- [ ] `npm run lint` passes with no errors
- [ ] `npm run format:check` passes
- [ ] `npm run typecheck` passes with no errors
- [ ] `npm run dev -- --version` shows correct version
- [ ] All configuration files are valid and working
- [ ] Basic CLI executable can be run

## Estimated Complexity
Low - Mostly configuration

## Notes
- This ticket should complete quickly as most files are already scaffolded
- Focus on verifying everything works together
- If any dependency issues arise, document in ticket comments
