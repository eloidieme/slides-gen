import { describe, it, expect } from 'vitest';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';
describe('Project Setup', () => {
    it('should compile TypeScript without errors', () => {
        expect(() => {
            execSync('npm run build', { stdio: 'pipe' });
        }).not.toThrow();
    });
    it('should produce dist directory with compiled output', () => {
        const distPath = resolve(process.cwd(), 'dist');
        expect(existsSync(distPath)).toBe(true);
        const cliPath = resolve(distPath, 'cli', 'index.js');
        expect(existsSync(cliPath)).toBe(true);
    });
    it('should have executable CLI entry point', () => {
        const result = execSync('node dist/cli/index.js --version', {
            encoding: 'utf8',
        });
        expect(result.trim()).toBe('0.1.0');
    });
    it('should run CLI with dev script', () => {
        const result = execSync('npm run dev -- --version', {
            encoding: 'utf8',
        });
        expect(result.trim()).toContain('0.1.0');
    });
});
//# sourceMappingURL=setup.test.js.map