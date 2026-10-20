import type { MetadataRoute } from "next";

import { products } from "@/config/products.config";
import { siteConfig } from "@/config/site.config";

import { getAcademyTracks, getPublishedLessonPaths } from "@/features/academy";
import {
  getMaskDocsNav,
  getPasswordDocsNav,
  getStartDocsNav,
  maskExampleIds,
  passwordExampleIds,
} from "@/features/docs";
import { routing } from "@/i18n/routing";

function localeUrl(locale: string, path: string): string {
  return locale === routing.defaultLocale
    ? `${siteConfig.url}${path}`
    : `${siteConfig.url}/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const homeEntries = routing.locales.map((locale) => ({
    url: locale === routing.defaultLocale ? siteConfig.url : `${siteConfig.url}/${locale}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 1,
  }));

  const productEntries = routing.locales.flatMap((locale) =>
    products.map((product) => ({
      url:
        locale === routing.defaultLocale
          ? `${siteConfig.url}${product.href}`
          : `${siteConfig.url}/${locale}${product.href}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  // Hrefs are locale-independent; titles are ignored for the sitemap.
  const startDocsNav = getStartDocsNav((key) => key);
  const maskDocsNav = getMaskDocsNav((key) => key);
  const passwordDocsNav = getPasswordDocsNav((key) => key);
  const docsHrefs = [...startDocsNav, ...maskDocsNav, ...passwordDocsNav].flatMap((section) =>
    section.items.map((item) => item.href),
  );

  const maskExampleHrefs = [
    "/mask/examples",
    ...maskExampleIds.map((id) => `/mask/examples/${id}`),
  ];
  const passwordExampleHrefs = [
    "/password/examples",
    ...passwordExampleIds.map((id) => `/password/examples/${id}`),
  ];
  const allDocsHrefs = [...new Set([...docsHrefs, ...maskExampleHrefs, ...passwordExampleHrefs])];

  const docsEntries = routing.locales.flatMap((locale) =>
    allDocsHrefs.map((href) => ({
      url:
        locale === routing.defaultLocale
          ? `${siteConfig.url}${href}`
          : `${siteConfig.url}/${locale}${href}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
  );

  const guidePlayEntries = routing.locales.map((locale) => ({
    url:
      locale === routing.defaultLocale
        ? `${siteConfig.url}/guide/play`
        : `${siteConfig.url}/${locale}/guide/play`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const startBuilderEntries = routing.locales.map((locale) => ({
    url:
      locale === routing.defaultLocale
        ? `${siteConfig.url}/start/builder`
        : `${siteConfig.url}/${locale}/start/builder`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const siteEntries = routing.locales.flatMap((locale) =>
    (["/about", "/brand", "/support"] as const).map((path) => ({
      url: localeUrl(locale, path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  const academyHomeEntries = routing.locales.map((locale) => ({
    url: localeUrl(locale, "/academy"),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const academySourcesEntries = routing.locales.map((locale) => ({
    url: localeUrl(locale, "/academy/sources"),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const academyContributeEntries = routing.locales.map((locale) => ({
    url: localeUrl(locale, "/academy/contribute"),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const academyTrackEntries = routing.locales.flatMap((locale) =>
    getAcademyTracks(locale)
      .filter((track) => track.status === "published")
      .map((track) => ({
        url: localeUrl(locale, `/academy/${track.slug}`),
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.75,
      })),
  );

  const academyLessonEntries = routing.locales.flatMap((locale) =>
    getPublishedLessonPaths(locale).map((path) => ({
      url: localeUrl(locale, `/academy/${path.track}/${path.lesson}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  );

  return [
    ...homeEntries,
    ...productEntries,
    ...docsEntries,
    ...guidePlayEntries,
    ...startBuilderEntries,
    ...siteEntries,
    ...academyHomeEntries,
    ...academySourcesEntries,
    ...academyContributeEntries,
    ...academyTrackEntries,
    ...academyLessonEntries,
  ];
}
