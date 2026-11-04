import type { CSSProperties } from "react";

/**
 * Inline styles from libraries that type them as a plain record (Shiki's `htmlStyle`
 * holds `--shiki-*` custom properties). React types `style` as `CSSProperties`.
 */
export function toCssStyle(style: Record<string, string> | undefined): CSSProperties {
  return (style ?? {}) as CSSProperties;
}
