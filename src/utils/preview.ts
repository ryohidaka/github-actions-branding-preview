import { Branding, BrandingColor, IconColor } from '../types';

/**
 * Create a Markdown preview for the given branding configuration.
 *
 * @param branding - Object containing color and icon name
 */
export function createMarkdown(branding: Branding) {
  const { color } = branding;

  // Determine icon color based on branding color
  const iconColor =
    color === BrandingColor.White ? IconColor.Black : IconColor.White;
  console.debug(iconColor);
}
