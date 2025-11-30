/**
 * Regression tests for specific bugs that were fixed
 * These tests ensure that previously fixed bugs don't reappear
 */

import { extractSvgDimensions, createWrappedSponsorSvg } from '../configs/sponsors/svg-utils';

describe('Regression Tests', () => {
  describe('Bug: ViewBox destructuring with leading comma (2025-11-30)', () => {
    it('should NOT skip the first viewBox value when destructuring', () => {
      // This was the bug: const [, minX, minY, width, height] = ...
      // The leading comma caused it to skip the first value (65.2)
      // Making minX=173.5, minY=180, width=180, height=undefined

      const digitalOceanSvg = `
        <svg viewBox="65.2 173.5 180 180" width="180" height="180">
          <path d="M155.2,351.7v-34.2..."/>
        </svg>
      `;

      const result = extractSvgDimensions(digitalOceanSvg);

      // Should correctly extract the 3rd and 4th values (width and height)
      expect(result.width).toBe(180);
      expect(result.height).toBe(180);

      // Should NOT be undefined (the bug symptom)
      expect(result.height).not.toBeUndefined();
    });

    it('should produce valid SVG coordinates without NaN values', () => {
      const digitalOceanSvg = `
        <svg viewBox="65.2 173.5 180 180" width="180" height="180">
          <path d="M155.2,351.7v-34.2..."/>
        </svg>
      `;

      const { width, height } = extractSvgDimensions(digitalOceanSvg);
      const wrappedSvg = createWrappedSponsorSvg(
        { name: 'DigitalOcean', url: 'https://digitalocean.com' },
        digitalOceanSvg,
        width,
        height,
        60,
        203.0769230769231,
        90
      );

      // The bug caused these to be NaN
      expect(wrappedSvg).toContain('x="203.0769230769231"');
      expect(wrappedSvg).toContain('y="90"');
      expect(wrappedSvg).toContain('width="60"');
      expect(wrappedSvg).toContain('height="60"');

      // Should NOT contain NaN (the bug symptom)
      expect(wrappedSvg).not.toContain('NaN');
      expect(wrappedSvg).not.toContain('undefined');

      // ViewBox should be correctly formed
      expect(wrappedSvg).toContain('viewBox="0 0 180 180"');
      expect(wrappedSvg).not.toMatch(/viewBox="0 0 180 undefined"/);
    });

    it('should correctly parse all special supporter SVGs without producing NaN', () => {
      const testCases = [
        {
          name: 'DigitalOcean',
          svg: '<svg viewBox="65.2 173.5 180 180" width="180" height="180"></svg>',
          expectedWidth: 180,
          expectedHeight: 180,
        },
        {
          name: 'JetBrains',
          svg: '<svg width="64" height="64" viewBox="0 0 64 64"></svg>',
          expectedWidth: 64,
          expectedHeight: 64,
        },
        {
          name: 'GitHub Copilot',
          svg: '<svg width="256px" height="208px" viewBox="0 0 256 208"></svg>',
          expectedWidth: 256,
          expectedHeight: 208,
        },
        {
          name: 'Codecov',
          svg: '<svg width="60px" height="60px" viewBox="0 0 60 60"></svg>',
          expectedWidth: 60,
          expectedHeight: 60,
        },
        {
          name: 'Crowdin',
          svg: '<svg width="248" height="248" viewBox="0 0 248 248"></svg>',
          expectedWidth: 248,
          expectedHeight: 248,
        },
      ];

      testCases.forEach(testCase => {
        const { width, height } = extractSvgDimensions(testCase.svg);

        expect(width).toBe(testCase.expectedWidth);
        expect(height).toBe(testCase.expectedHeight);
        expect(width).not.toBeUndefined();
        expect(height).not.toBeUndefined();
        expect(Number.isNaN(width)).toBe(false);
        expect(Number.isNaN(height)).toBe(false);

        const wrappedSvg = createWrappedSponsorSvg(
          { name: testCase.name, url: 'https://example.com' },
          testCase.svg,
          width,
          height,
          60,
          100,
          90
        );

        expect(wrappedSvg).not.toContain('NaN');
        expect(wrappedSvg).not.toContain('undefined');
      });
    });

    it('should correctly destructure viewBox without leading comma', () => {
      // Test various viewBox formats to ensure proper destructuring
      const testCases = [
        { viewBox: '0 0 100 200', expectedWidth: 100, expectedHeight: 200 },
        { viewBox: '10 20 100 200', expectedWidth: 100, expectedHeight: 200 },
        { viewBox: '-10 -20 100 200', expectedWidth: 100, expectedHeight: 200 },
        { viewBox: '65.2 173.5 180 180', expectedWidth: 180, expectedHeight: 180 },
        { viewBox: '0.5 1.5 256.5 208.5', expectedWidth: 256.5, expectedHeight: 208.5 },
      ];

      testCases.forEach(testCase => {
        const svg = `<svg viewBox="${testCase.viewBox}"></svg>`;
        const result = extractSvgDimensions(svg);

        expect(result.width).toBe(testCase.expectedWidth);
        expect(result.height).toBe(testCase.expectedHeight);
        expect(result.width).not.toBeUndefined();
        expect(result.height).not.toBeUndefined();
      });
    });
  });

  describe('Bug: Number.parseInt without radix parameter', () => {
    it('should use radix 10 to parse width/height attributes', () => {
      // Without radix, "08" and "09" could be misinterpreted in some contexts
      const svg = `<svg width="08" height="09"></svg>`;
      const result = extractSvgDimensions(svg);

      expect(result.width).toBe(8);
      expect(result.height).toBe(9);
    });

    it('should correctly parse numbers with leading zeros', () => {
      const testCases = [
        { width: '08', height: '09', expectedWidth: 8, expectedHeight: 9 },
        { width: '010', height: '011', expectedWidth: 10, expectedHeight: 11 },
        { width: '0100', height: '0200', expectedWidth: 100, expectedHeight: 200 },
      ];

      testCases.forEach(testCase => {
        const svg = `<svg width="${testCase.width}" height="${testCase.height}"></svg>`;
        const result = extractSvgDimensions(svg);

        expect(result.width).toBe(testCase.expectedWidth);
        expect(result.height).toBe(testCase.expectedHeight);
      });
    });
  });

  describe('Bug: Undefined check in viewBox validation', () => {
    it('should properly check for undefined in viewBox values', () => {
      // When viewBox has fewer than 4 values, destructuring creates undefined
      const svg = `<svg viewBox="0 0 100" width="50" height="60"></svg>`;
      const result = extractSvgDimensions(svg);

      // Should fall back to width/height attributes when viewBox is incomplete
      expect(result.width).toBeDefined();
      expect(result.height).toBeDefined();
      expect(Number.isNaN(result.width)).toBe(false);
      expect(Number.isNaN(result.height)).toBe(false);
    });

    it('should handle viewBox with invalid values gracefully', () => {
      const svg = `<svg viewBox="invalid data here" width="50" height="60"></svg>`;
      const result = extractSvgDimensions(svg);

      // Should fall back to width/height attributes
      expect(result.width).toBeDefined();
      expect(result.height).toBeDefined();
      expect(Number.isNaN(result.width)).toBe(false);
      expect(Number.isNaN(result.height)).toBe(false);
    });
  });
});
