/** Strips ICU / rich-text tags used in next-intl message strings. */
export function stripRichText(value: string): string {
  return value
    .replace(/<\/?[a-zA-Z][a-zA-Z0-9]*[^>]*>/g, " ")
    .replace(/\{[a-zA-Z0-9_]+\}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
