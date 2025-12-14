import * as feather from 'feather-icons';
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
