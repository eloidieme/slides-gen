import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';
describe('CLI Setup', () => {
    it('should have a CLI entry point file', () => {
        const entryPoint = join(__dirname, '../../src/cli/index.ts');
        expect(existsSync(entryPoint)).toBe(true);
    });
    it('should build without errors', () => {
        expect(() => {
            execSync('npm run build', { stdio: 'pipe' });
        }).not.toThrow();
    });
    it('should have built files in dist directory', () => {
        const distPath = join(__dirname, '../../dist/cli/index.js');
        expect(existsSync(distPath)).toBe(true);
    });
});
describe('CLI Commands', () => {
    it('should show version with --version flag', () => {
        const output = execSync('npm run dev -- --version', {
            encoding: 'utf-8',
            stdio: 'pipe',
        });
        expect(output).toContain('0.1.0');
    });
    it('should show help with --help flag', () => {
        const output = execSync('npm run dev -- --help', {
            encoding: 'utf-8',
            stdio: 'pipe',
        });
        expect(output).toContain('slides-gen');
        expect(output).toContain('AI-powered slide generation');
    });
});
//# sourceMappingURL=cli.test.js.map