import * as feather from 'feather-icons';
import * as vscode from 'vscode';
import { Branding, BrandingColor, IconColor } from '../types';

/**
 * Create a Markdown preview for the given branding configuration.
 *
 * @param branding - Object containing color and icon name
 */
export function createMarkdown(branding: Branding) {
  const { color, icon } = branding;

  // Determine icon color based on branding color
  const iconColor =
    color === BrandingColor.White ? IconColor.Black : IconColor.White;
  console.debug(`iconColor: ${iconColor}`);

  const iconSvg = getFeatherIconSvg(icon, iconColor);
  console.debug(`iconSvg: \n${iconSvg}`);

  const svg = composeBrandSvg(iconSvg, color);
  console.debug(`svg: \n${svg}`);

  const image = encodeSvgToBase64(svg);
  console.debug(`image: \n${image}`);
}

/**
 * Retrieve a Feather icon SVG string by name.
 * Throw if the icon name is invalid.
 *
 * @param iconName - Name of the Feather icon
 * @returns SVG string representation of the icon
 * @throws Error if icon name does not exist in Feather icons
 */
function getFeatherIconSvg(iconName: string, iconColor: IconColor): string {
  const key = iconName as keyof typeof feather.icons;
  const icon = feather.icons[key];

  if (!icon) {
    throw new Error(`Unknown Feather icon: "${iconName}"`);
  }

  return icon.toSvg({ color: iconColor, width: 24, height: 24 });
}

/**
 * Compose an SVG string for the brand icon with rounded rectangular background.
 *
 * @param iconSvg - Inner Feather icon SVG string
 * @param colorKey - Key of BrandingColor enum (case-insensitive)
 * @returns Complete SVG string
 */
function composeBrandSvg(iconSvg: string, colorKey: string): string {
  // Find the actual enum key ignoring case
  const matchedKey = (
    Object.keys(BrandingColor) as Array<keyof typeof BrandingColor>
  ).find((key) => key.toLowerCase() === colorKey.toLowerCase());

  // Use hex code if valid key found, otherwise fallback
  const colorValue = matchedKey ? BrandingColor[matchedKey] : '#000';

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
  <!-- Background rectangle -->
  <rect
    x="0.5"
    y="0.5"
    width="39"
    height="39"
    rx="12"
    ry="12"
    fill="${colorValue}"
    stroke="rgba(255, 255, 255, 0.15)"
    stroke-width="1"
  />
  <!-- Centered Feather icon -->
  <g transform="translate(8,8)">
    ${iconSvg}
  </g>
</svg>`;
}

/**
 * Encode an SVG string to a base64 data URL.
 *
 * @param svg - SVG string to encode
 * @returns Base64-encoded data URL
 */
function encodeSvgToBase64(svg: string): string {
  const encoded = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${encoded}`;
}
