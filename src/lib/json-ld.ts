import { siteConfig } from "@/config/site.config";

import { localeUrl } from "@/lib/canonical";

import { routing } from "@/i18n/routing";

const organizationId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;
const authorId = `${siteConfig.url}/#author`;

const authorNode = {
  "@type": "Person",
  "@id": authorId,
  name: siteConfig.author.name,
  url: siteConfig.author.website,
  image: siteConfig.author.avatar,
  sameAs: [siteConfig.author.github],
};

/** Organization, WebSite and author for the home page; other pages reference them by `@id`. */
export function buildHomeJsonLd({ locale, description }: { locale: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo-icon.webp`,
        sameAs: [siteConfig.links.github, siteConfig.links.twitter],
        founder: { "@id": authorId },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        description,
        inLanguage: locale,
        publisher: { "@id": organizationId },
      },
      authorNode,
    ],
  };
}

export type BreadcrumbItem = {
  name: string;
  /** Locale-independent path; the last item may omit it. */
  path?: string;
};

export function buildBreadcrumbJsonLd({
  locale,
  items,
}: {
  locale: string;
  items: BreadcrumbItem[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path === undefined ? {} : { item: localeUrl(locale, item.path) }),
    })),
  };
}

/** A ViraStack package or CLI. Free and open source, so `offers` is a zero price. */
export function buildSoftwareJsonLd({
  locale,
  name,
  description,
  path,
  repository,
}: {
  locale: string;
  name: string;
  description: string;
  path: string;
  repository?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: localeUrl(locale, path),
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    inLanguage: routing.locales,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@id": authorId },
    publisher: { "@id": organizationId },
    ...(repository ? { codeRepository: repository } : {}),
  };
}

export function buildDocsArticleJsonLd({
  locale,
  headline,
  description,
  path,
}: {
  locale: string;
  headline: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline,
    description,
    url: localeUrl(locale, path),
    mainEntityOfPage: localeUrl(locale, path),
    inLanguage: locale,
    author: { "@id": authorId },
    publisher: { "@id": organizationId },
  };
}
