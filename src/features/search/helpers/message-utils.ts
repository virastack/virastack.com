import { stripRichText } from "@/features/search/helpers/strip-rich-text";

export function isStringRecord(value: unknown): value is Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.values(value).every((entry) => typeof entry === "string");
}

export function flattenMessageStrings(value: unknown): string[] {
  if (typeof value === "string") {
    const text = stripRichText(value);
    return text ? [text] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap(flattenMessageStrings);
  }
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(flattenMessageStrings);
  }
  return [];
}

export function collectByKeyPrefixes(
  namespace: Record<string, string>,
  prefixes: readonly string[],
): string {
  return Object.entries(namespace)
    .filter(([key]) => prefixes.some((prefix) => key.startsWith(prefix)))
    .map(([, value]) => stripRichText(value))
    .filter(Boolean)
    .join(" ");
}

/** `use-vira-mask` → `useViraMask`, `ui-libraries` → `uiLibraries` */
export function kebabToCamel(slug: string): string {
  return slug.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
}

/** `zipCode` → `exampleZipCode` */
export function exampleIdToKeyPrefix(id: string): string {
  return `example${id.charAt(0).toUpperCase()}${id.slice(1)}`;
}
