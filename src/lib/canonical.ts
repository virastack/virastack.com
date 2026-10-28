import type { Metadata } from "next";

import { siteConfig } from "@/config/site.config";

import { routing } from "@/i18n/routing";

/**
 * Absolute URL for a page in one locale, honoring the `as-needed` locale prefix:
 * the default locale has no prefix, every other locale gets `/<locale>`.
 */
export function localeUrl(locale: string, path = "/"): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const suffix = path === "/" ? "" : path;

  return `${siteConfig.url}${prefix}${suffix}`;
}

/**
 * Canonical URL and hreflang alternates for one page, so every locale variant
 * points at itself and declares its siblings.
 */
export function buildAlternates(locale: string, path = "/"): Metadata["alternates"] {
  const languages = Object.fromEntries(
    routing.locales.map((item) => [item, localeUrl(item, path)]),
  );

  return {
    canonical: localeUrl(locale, path),
    languages: { ...languages, "x-default": localeUrl(routing.defaultLocale, path) },
  };
}
