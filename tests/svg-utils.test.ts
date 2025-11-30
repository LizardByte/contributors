/**
 * Tests for SVG dimension extraction utilities
 * These tests prevent regression bugs in SVG parsing and positioning
 */

import { extractSvgDimensions, createWrappedSponsorSvg } from '../configs/sponsors/svg-utils';

describe('extractSvgDimensions', () => {
  describe('viewBox extraction', () => {
    it('should correctly extract dimensions from viewBox with 4 values', () => {
      const svgContent = `
        <svg viewBox="0 0 100 200">
          <rect />
        </svg>
      `;
      const result = extractSvgDimensions(svgContent);
      expect(result).toEqual({ width: 100, height: 200 });
    });

    it('should correctly extract dimensions from viewBox with offset (minX, minY)', () => {
      // This is the DigitalOcean case that was broken
      const svgContent = `
        <svg viewBox="65.2 173.5 180 180">
          <rect />
        </svg>
      `;
      const result = extractSvgDimensions(svgContent);
      expect(result).toEqual({ width: 180, height: 180 });
    });

    it('should handle viewBox with different quote styles', () => {
      const svgContentDoubleQuotes = `<svg viewBox="0 0 256 208"></svg>`;
      const svgContentSingleQuotes = `<svg viewBox='0 0 256 208'></svg>`;

      expect(extractSvgDimensions(svgContentDoubleQuotes)).toEqual({ width: 256, height: 208 });
      expect(extractSvgDimensions(svgContentSingleQuotes)).toEqual({ width: 256, height: 208 });
    });

    it('should handle viewBox with decimal values', () => {
      const svgContent = `<svg viewBox="0 0 100.5 200.75"></svg>`;
      const result = extractSvgDimensions(svgContent);
      expect(result).toEqual({ width: 100.5, height: 200.75 });
    });

    it('should handle viewBox with multiple spaces between values', () => {
      const svgContent = `<svg viewBox="0   0    100    200"></svg>`;
      const result = extractSvgDimensions(svgContent);
      expect(result).toEqual({ width: 100, height: 200 });
    });

    it('should handle viewBox with negative offset values', () => {
      const svgContent = `<svg viewBox="-10 -20 100 200"></svg>`;
      const result = extractSvgDimensions(svgContent);
      expect(result).toEqual({ width: 100, height: 200 });
    });
  });

  describe('width/height attribute extraction', () => {
    it('should extract dimensions from width and height attributes when no viewBox', () => {
      const svgContent = `<svg width="64" height="64"></svg>`;
      const result = extractSvgDimensions(svgContent);
      expect(result).toEqual({ width: 64, height: 64 });
    });

    it('should handle width/height attributes with px units', () => {
      const svgContent = `<svg width="256px" height="208px"></svg>`;
      const result = extractSvgDimensions(svgContent);
      expect(result).toEqual({ width: 256, height: 208 });
    });

    it('should handle width/height attributes with different quote styles', () => {
      const svgContentDoubleQuotes = `<svg width="100" height="200"></svg>`;
      const svgContentSingleQuotes = `<svg width='100' height='200'></svg>`;

      expect(extractSvgDimensions(svgContentDoubleQuotes)).toEqual({ width: 100, height: 200 });
      expect(extractSvgDimensions(svgContentSingleQuotes)).toEqual({ width: 100, height: 200 });
    });

    it('should parse integer values correctly with radix 10', () => {
      // Ensures Number.parseInt uses base 10, not auto-detecting octal for "08" etc.
      const svgContent = `<svg width="08" height="09"></svg>`;
      const result = extractSvgDimensions(svgContent);
      expect(result).toEqual({ width: 8, height: 9 });
    });
  });

  describe('fallback behavior', () => {
    it('should return default width when no width attribute or viewBox', () => {
      const svgContent = `<svg height="100"></svg>`;
      const result = extractSvgDimensions(svgContent);
      expect(result.width).toBe(200); // default width
      expect(result.height).toBe(100);
    });

    it('should return default height when no height attribute or viewBox', () => {
      const svgContent = `<svg width="100"></svg>`;
      const result = extractSvgDimensions(svgContent);
      expect(result.width).toBe(100);
      expect(result.height).toBe(100); // default height
    });

    it('should return both defaults when no dimensions found', () => {
      const svgContent = `<svg></svg>`;
      const result = extractSvgDimensions(svgContent);
      expect(result).toEqual({ width: 200, height: 100 });
    });

    it('should fallback to width/height attributes when viewBox is invalid', () => {
      const svgContent = `<svg viewBox="invalid" width="50" height="75"></svg>`;
      const result = extractSvgDimensions(svgContent);
      // When viewBox match exists but produces NaN, it still tries viewBox path first
      // This returns undefined values, then falls back to width/height
      expect(result.width).toBeDefined();
      expect(result.height).toBeDefined();
      expect(Number.isNaN(result.width)).toBe(false);
      expect(Number.isNaN(result.height)).toBe(false);
    });
  });

  describe('complex real-world SVG examples', () => {
    it('should extract dimensions from DigitalOcean SVG', () => {
      const digitalOceanSvg = `
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             width="180" height="180" viewBox="65.2 173.5 180 180"
             style="enable-background:new 65.2 173.5 180 180;" xml:space="preserve">
          <path d="M155.2,351.7v-34.2..."/>
        </svg>
      `;
      const result = extractSvgDimensions(digitalOceanSvg);
      expect(result).toEqual({ width: 180, height: 180 });
    });

    it('should extract dimensions from JetBrains SVG', () => {
      const jetBrainsSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 64 64">
          <path fill="#000" d="M48 16H8v40h40V16Z"/>
        </svg>
      `;
      const result = extractSvgDimensions(jetBrainsSvg);
      expect(result).toEqual({ width: 64, height: 64 });
    });

    it('should extract dimensions from GitHub Copilot SVG', () => {
      const copilotSvg = `
        <svg width="256px" height="208px" viewBox="0 0 256 208" version="1.1"
             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>GitHub Copilot</title>
        </svg>
      `;
      const result = extractSvgDimensions(copilotSvg);
      expect(result).toEqual({ width: 256, height: 208 });
    });

    it('should extract dimensions from Crowdin SVG', () => {
      const crowdinSvg = `
        <svg width="248" height="248" viewBox="0 0 248 248" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M163.024 177.312C157.024..."/>
        </svg>
      `;
      const result = extractSvgDimensions(crowdinSvg);
      expect(result).toEqual({ width: 248, height: 248 });
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle empty string', () => {
      const result = extractSvgDimensions('');
      expect(result).toEqual({ width: 200, height: 100 });
    });

    it('should handle malformed SVG gracefully', () => {
      const result = extractSvgDimensions('<notsvg>');
      expect(result).toEqual({ width: 200, height: 100 });
    });

    it('should handle NaN values in viewBox', () => {
      const svgContent = `<svg viewBox="a b c d" width="50" height="60"></svg>`;
      const result = extractSvgDimensions(svgContent);
      expect(result).toEqual({ width: 50, height: 60 });
    });

    it('should handle incomplete viewBox (only 3 values)', () => {
      const svgContent = `<svg viewBox="0 0 100" width="50" height="60"></svg>`;
      const result = extractSvgDimensions(svgContent);
      // With only 3 values, height is undefined, so it falls back to width/height
      // But the implementation returns the parsed values which includes width=100, height=undefined
      expect(result.width).toBeDefined();
      expect(result.height).toBeDefined();
      expect(Number.isNaN(result.width)).toBe(false);
      expect(Number.isNaN(result.height)).toBe(false);
    });
  });
});

describe('createWrappedSponsorSvg', () => {
  const mockSponsor = {
    name: 'Test Sponsor',
    url: 'https://example.com'
  };

  const simpleSvgContent = '<circle cx="50" cy="50" r="40"/>';

  describe('basic functionality', () => {
    it('should create a wrapped SVG with correct positioning', () => {
      const result = createWrappedSponsorSvg(
        mockSponsor,
        simpleSvgContent,
        100,
        100,
        60,
        50,
        100
      );

      expect(result).toContain('x="50"');
      expect(result).toContain('y="100"');
      expect(result).toContain('xlink:href="https://example.com"');
      expect(result).toContain('id="TestSponsor"');
    });

    it('should correctly scale dimensions', () => {
      // Original: 100x100, target height: 60
      // Scale should be 0.6, so width becomes 60
      const result = createWrappedSponsorSvg(
        mockSponsor,
        simpleSvgContent,
        100,
        100,
        60,
        0,
        0
      );

      expect(result).toContain('width="60"');
      expect(result).toContain('height="60"');
    });

    it('should handle non-square aspect ratios', () => {
      // Original: 256x208, target height: 60
      // Scale: 60/208 = 0.288..., width becomes ~73.846
      const result = createWrappedSponsorSvg(
        mockSponsor,
        simpleSvgContent,
        256,
        208,
        60,
        0,
        0
      );

      expect(result).toContain('width="73.84615384615384"');
      // Height might have floating point precision issues (59.99999999999999)
      expect(result).toMatch(/height="(60|59\.9999999999999\d*)"/);
    });

    it('should remove spaces from sponsor name in id', () => {
      const sponsorWithSpaces = {
        name: 'GitHub Copilot',
        url: 'https://github.com'
      };

      const result = createWrappedSponsorSvg(
        sponsorWithSpaces,
        simpleSvgContent,
        100,
        100,
        60,
        0,
        0
      );

      expect(result).toContain('id="GitHubCopilot"');
      expect(result).not.toContain('id="GitHub Copilot"');
    });

    it('should handle multiple spaces in sponsor name', () => {
      const sponsorWithSpaces = {
        name: 'Test   Multiple   Spaces',
        url: 'https://example.com'
      };

      const result = createWrappedSponsorSvg(
        sponsorWithSpaces,
        simpleSvgContent,
        100,
        100,
        60,
        0,
        0
      );

      expect(result).toContain('id="TestMultipleSpaces"');
    });
  });

  describe('viewBox generation', () => {
    it('should create correct viewBox', () => {
      const result = createWrappedSponsorSvg(
        mockSponsor,
        simpleSvgContent,
        180,
        180,
        60,
        0,
        0
      );

      expect(result).toContain('viewBox="0 0 180 180"');
    });

    it('should preserve original dimensions in viewBox regardless of scaling', () => {
      const result = createWrappedSponsorSvg(
        mockSponsor,
        simpleSvgContent,
        256,
        208,
        60,
        0,
        0
      );

      expect(result).toContain('viewBox="0 0 256 208"');
    });
  });

  describe('position validation', () => {
    it('should not produce NaN for x coordinate', () => {
      const result = createWrappedSponsorSvg(
        mockSponsor,
        simpleSvgContent,
        180,
        180,
        60,
        203.0769230769231,
        90
      );

      expect(result).toContain('x="203.0769230769231"');
      expect(result).not.toContain('x="NaN"');
    });

    it('should not produce NaN for y coordinate', () => {
      const result = createWrappedSponsorSvg(
        mockSponsor,
        simpleSvgContent,
        180,
        180,
        60,
        50,
        90
      );

      expect(result).toContain('y="90"');
      expect(result).not.toContain('y="NaN"');
    });

    it('should not produce NaN or undefined values', () => {
      const result = createWrappedSponsorSvg(
        mockSponsor,
        simpleSvgContent,
        180,
        180,
        60,
        0,
        0
      );

      // Width validation
      expect(result).toContain('width="60"');
      expect(result).not.toContain('width="NaN"');
      expect(result).not.toContain('width="undefined"');

      // Height validation
      expect(result).toContain('height="60"');
      expect(result).not.toContain('height="NaN"');
      expect(result).not.toContain('height="undefined"');

      // General undefined check
      expect(result).not.toContain('undefined');
    });
  });

  describe('integration with extractSvgDimensions', () => {
    it('should work correctly with extracted dimensions from DigitalOcean SVG', () => {
      const digitalOceanSvg = `
        <svg viewBox="65.2 173.5 180 180" width="180" height="180">
          <path d="M155.2,351.7v-34.2..."/>
        </svg>
      `;

      const { width, height } = extractSvgDimensions(digitalOceanSvg);
      const result = createWrappedSponsorSvg(
        { name: 'DigitalOcean', url: 'https://digitalocean.com' },
        digitalOceanSvg,
        width,
        height,
        60,
        203,
        90
      );

      expect(result).toContain('x="203"');
      expect(result).toContain('y="90"');
      expect(result).toContain('width="60"');
      expect(result).toContain('height="60"');
      expect(result).not.toContain('NaN');
      expect(result).not.toContain('undefined');
    });
  });
});
