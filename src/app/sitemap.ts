import type { MetadataRoute } from "next";

import { products } from "@/config/products.config";

import { localeUrl } from "@/lib/canonical";

import { getAcademyTracks, getPublishedLessonPaths } from "@/features/academy";
import {
  getAddressDocsNav,
  getAiDocsNav,
  getMaskDocsNav,
  getPasswordDocsNav,
  getStartDocsNav,
  maskExampleIds,
  passwordExampleIds,
} from "@/features/docs";
import { routing } from "@/i18n/routing";

/**
 * No `lastModified`: there is no per-page content date to report, and stamping
 * every URL with the build time teaches crawlers to ignore the field.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const homeEntries = routing.locales.map((locale) => ({
    url: localeUrl(locale),
    changeFrequency: "monthly" as const,
    priority: 1,
  }));

  const productEntries = routing.locales.flatMap((locale) =>
    products.map((product) => ({
      url: localeUrl(locale, product.href),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  // Hrefs are locale-independent; titles are ignored for the sitemap.
  const startDocsNav = getStartDocsNav((key) => key);
  const aiDocsNav = getAiDocsNav((key) => key);
  const maskDocsNav = getMaskDocsNav((key) => key);
  const passwordDocsNav = getPasswordDocsNav((key) => key);
  const addressDocsNav = getAddressDocsNav((key) => key);
  const docsHrefs = [
    ...startDocsNav,
    ...aiDocsNav,
    ...maskDocsNav,
    ...passwordDocsNav,
    ...addressDocsNav,
  ].flatMap((section) => section.items.map((item) => item.href));

  const maskExampleHrefs = [
    "/mask/examples",
    ...maskExampleIds.map((id) => `/mask/examples/${id}`),
  ];
  const passwordExampleHrefs = [
    "/password/examples",
    ...passwordExampleIds.map((id) => `/password/examples/${id}`),
  ];
  const allDocsHrefs = [...new Set([...docsHrefs, ...maskExampleHrefs, ...passwordExampleHrefs])];

  // The docs nav lists llms.txt next to real pages, but those are static files
  // under public/ and exist only at the unprefixed path.
  const isStaticFile = (href: string) => href.endsWith(".txt");
  const pageHrefs = allDocsHrefs.filter((href) => !isStaticFile(href));
  const fileHrefs = allDocsHrefs.filter(isStaticFile);

  const docsEntries = routing.locales.flatMap((locale) =>
    pageHrefs.map((href) => ({
      url: localeUrl(locale, href),
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
  );

  const docsFileEntries = fileHrefs.map((href) => ({
    url: localeUrl(routing.defaultLocale, href),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const guidePlayEntries = routing.locales.map((locale) => ({
    url: localeUrl(locale, "/guide/play"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const startBuilderEntries = routing.locales.map((locale) => ({
    url: localeUrl(locale, "/start/builder"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const siteEntries = routing.locales.flatMap((locale) =>
    (["/about", "/brand", "/support"] as const).map((path) => ({
      url: localeUrl(locale, path),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  const academyHomeEntries = routing.locales.map((locale) => ({
    url: localeUrl(locale, "/academy"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const academySourcesEntries = routing.locales.map((locale) => ({
    url: localeUrl(locale, "/academy/sources"),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const academyContributeEntries = routing.locales.map((locale) => ({
    url: localeUrl(locale, "/academy/contribute"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const academyTrackEntries = routing.locales.flatMap((locale) =>
    getAcademyTracks(locale)
      .filter((track) => track.status === "published")
      .map((track) => ({
        url: localeUrl(locale, `/academy/${track.slug}`),
        changeFrequency: "weekly" as const,
        priority: 0.75,
      })),
  );

  const academyLessonEntries = routing.locales.flatMap((locale) =>
    getPublishedLessonPaths(locale).map((path) => ({
      url: localeUrl(locale, `/academy/${path.track}/${path.lesson}`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  );

  return [
    ...homeEntries,
    ...productEntries,
    ...docsEntries,
    ...docsFileEntries,
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
