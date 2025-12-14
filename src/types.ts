/**
 * Defines the branding configuration for a Markdown preview.
 */
export interface Branding {
  color: string;
  icon: string;
}

/**
 * Enum representing available color values for Branding color.
 */
export enum BrandingColor {
  White = '#fff',
  Black = '#010409',
  Yellow = '#ffd33d',
  Blue = '#0366d6',
  Green = '#28a745',
  Orange = '#f66a0a',
  Red = '#d73a49',
  Purple = '#6f42c1',
  'Gray-Dark' = '#24292e'
}

/**
 * Enum representing available icon color values for Feather icons.
 */
export enum IconColor {
  White = '#fff',
  Black = '#010409'
}
