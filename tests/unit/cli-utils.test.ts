import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logger } from '../../src/cli/utils/logger.js';
import { createSpinner, withSpinner } from '../../src/cli/utils/spinner.js';

describe('CLI Utilities', () => {
  describe('logger', () => {
    let consoleLogSpy: ReturnType<typeof vi.spyOn>;
    let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
    let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleLogSpy.mockRestore();
      consoleErrorSpy.mockRestore();
      consoleWarnSpy.mockRestore();
    });

    it('should log info messages', () => {
      logger.info('Test info');
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('ℹ'),
        'Test info'
      );
    });

    it('should log success messages', () => {
      logger.success('Test success');
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('✓'),
        'Test success'
      );
    });

    it('should log error messages', () => {
      logger.error('Test error');
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('✗'),
        'Test error'
      );
    });

    it('should log warning messages', () => {
      logger.warn('Test warning');
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('⚠'),
        'Test warning'
      );
    });

    it('should log debug messages', () => {
      logger.debug('Test debug');
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('Test debug')
      );
    });
  });

  describe('spinner', () => {
    it('should create a spinner', () => {
      const spinner = createSpinner('Loading...');
      expect(spinner).toBeDefined();
      expect(spinner.text).toBe('Loading...');
    });

    it('should run async operation with spinner success', async () => {
      const mockFn = vi.fn().mockResolvedValue('result');
      const result = await withSpinner('Processing...', mockFn);

      expect(result).toBe('result');
      expect(mockFn).toHaveBeenCalled();
    });

    it('should handle spinner failure', async () => {
      const mockFn = vi.fn().mockRejectedValue(new Error('Test error'));

      await expect(withSpinner('Processing...', mockFn)).rejects.toThrow(
        'Test error'
      );
      expect(mockFn).toHaveBeenCalled();
    });
  });
});
