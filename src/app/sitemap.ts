import type { MetadataRoute } from "next";

import { products } from "@/config/products.config";
import { siteConfig } from "@/config/site.config";

import {
  getMaskDocsNav,
  getPasswordDocsNav,
  getStartDocsNav,
  maskExampleSlugs,
  passwordExampleSlugs,
} from "@/features/docs";
import { routing } from "@/i18n/routing";

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

  const maskExampleHrefs = maskExampleSlugs.map((slug) => `/mask/docs/${slug}`);
  const passwordExampleHrefs = passwordExampleSlugs.map((slug) => `/password/docs/${slug}`);
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

  const siteEntries = routing.locales.flatMap((locale) =>
    (["/about", "/brand", "/contribute", "/community", "/support"] as const).map((path) => ({
      url:
        locale === routing.defaultLocale
          ? `${siteConfig.url}${path}`
          : `${siteConfig.url}/${locale}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...homeEntries, ...productEntries, ...docsEntries, ...guidePlayEntries, ...siteEntries];
}
