/**
 * Check if the given line is inside the "branding" section of YAML.
 * Returns true for "branding:" itself and all indented lines below it
 * until the next top-level key appears.
 */
export function isInsideBrandingSection(
  yamlText: string,
  lineNumber: number
): boolean {
  const lines = yamlText.split('\n');
  const brandingStart = lines.findIndex((line) => /^branding\s*:/i.test(line));
  if (brandingStart === -1) {
    return false;
  }

  // Find the next top-level key (no indent, contains colon)
  const nextTopLevelIndex = lines
    .slice(brandingStart + 1)
    .findIndex((line) => /^[^\s#].*?:/.test(line));

  const brandingEnd =
    nextTopLevelIndex === -1
      ? lines.length
      : brandingStart + 1 + nextTopLevelIndex;

  return lineNumber >= brandingStart && lineNumber < brandingEnd;
}
