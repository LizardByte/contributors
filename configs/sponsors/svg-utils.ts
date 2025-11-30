/**
 * Utility functions for SVG dimension extraction
 */

/**
 * Extracts dimensions from SVG content by parsing viewBox or width/height attributes
 * @param svgContent - The SVG content as a string
 * @returns Object containing width and height
 */
export function extractSvgDimensions(svgContent: string): { width: number; height: number } {
  // Try to get dimensions from viewBox first
  const viewBoxRegex = /viewBox=['"]([^'"]*)['"]/;
  const viewBoxMatch = viewBoxRegex.exec(svgContent);
  if (viewBoxMatch) {
    const [, , width, height] = viewBoxMatch[1].split(/\s+/).map(Number);
    // Check that both width and height are valid numbers (not NaN and not undefined)
    if (!Number.isNaN(width) && !Number.isNaN(height) && width !== undefined && height !== undefined) {
      return { width, height };
    }
  }

  // Try to get from width/height attributes
  const widthRegex = /width=['"]([^'"]*)['"]/;
  const widthMatch = widthRegex.exec(svgContent);
  const heightRegex = /height=['"]([^'"]*)['"]/;
  const heightMatch = heightRegex.exec(svgContent);

  const width = widthMatch ? Number.parseInt(widthMatch[1], 10) : 200;
  const height = heightMatch ? Number.parseInt(heightMatch[1], 10) : 100;

  return { width, height };
}

/**
 * Creates a wrapped SVG element for a sponsor with positioning and scaling
 * @param sponsor - Sponsor object with name and url
 * @param svgContent - The SVG content to wrap
 * @param svgWidth - Original width of the SVG
 * @param svgHeight - Original height of the SVG
 * @param height - Target height for the scaled SVG
 * @param x - X position for the SVG
 * @param y - Y position for the SVG
 * @returns Wrapped SVG string
 */
export function createWrappedSponsorSvg(
  sponsor: { name: string; url: string },
  svgContent: string,
  svgWidth: number,
  svgHeight: number,
  height: number,
  x: number,
  y: number
): string {
  const scale = height ? height / svgHeight : 1;
  const scaledWidth = svgWidth * scale;
  const scaledHeight = svgHeight * scale;

  return `
  <a xlink:href="${sponsor.url}" class="contribkit-link" target="_blank" id="${sponsor.name.replaceAll(/\s+/g, '')}">
    <svg x="${x}" y="${y}" width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
      <rect width="${svgWidth}" height="${svgHeight}" fill="transparent" />
      ${svgContent}
    </svg>
  </a>`;
}
