import * as yaml from 'yaml';
import { Branding, BrandingColor } from '../types';

/**
 * Parse YAML content and return the top-level `branding` section if valid.
 * Returns null on error, invalid structure, or unsupported color.
 */
export function parseBranding(yamlText: string): Branding | null {
  try {
    const data = yaml.parse(yamlText);
    if (!data || typeof data !== 'object') {
      console.warn('YAML parse result is empty or not an object.');
      return null;
    }

    if (!('branding' in data)) {
      console.debug('No "branding" section found in YAML.');
      return null;
    }

    const branding = data.branding;
    if (typeof branding !== 'object' || Array.isArray(branding)) {
      console.error('Invalid "branding" section structure detected.');
      return null;
    }

    if (!branding.color || !branding.icon) {
      console.warn(
        'Branding section missing required fields: "color" and/or "icon".'
      );
      return null;
    }

    // Validate color value
    const validColors = Object.keys(BrandingColor);
    const isValidColor = validColors.some(
      (key) => key.toLowerCase() === branding.color.toLowerCase()
    );

    if (!isValidColor) {
      console.warn(`Unsupported color value: "${branding.color}"`);
      return null;
    }

    console.debug(JSON.stringify(branding, null, 2));

    return branding as Branding;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Failed to parse YAML: ${message}`);
    return null;
  }
}
