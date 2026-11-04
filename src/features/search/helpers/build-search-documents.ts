import type { AppMessages } from "@/types/messages.types";
import type { ProductId } from "@/types/product.types";
import type { SearchDocument, SearchSectionId } from "@/types/search.types";
import { products } from "@/config/products.config";
import { siteConfig } from "@/config/site.config";

import {
  collectByKeyPrefixes,
  flattenMessageStrings,
  isStringRecord,
} from "@/helpers/message-utils";
import { stripRichText } from "@/helpers/strip-rich-text";

import { searchSections } from "@/features/search/constants/search-sections.constants";

/** Raw messages: rich-text tags stay in, `stripRichText` removes them. */
type NavigationText = (key: keyof AppMessages["Navigation"]) => string;
type ProductsText = (key: keyof AppMessages["Products"]) => string;

const PRODUCT_MESSAGE_NS = {
  start: "Start",
  ai: "Ai",
  mask: "Mask",
  password: "Password",
  address: "Address",
  guide: "Guide",
} as const satisfies Record<ProductId, string>;

const PRODUCT_DESC_KEYS = {
  start: "startDesc",
  ai: "aiDesc",
  mask: "maskDesc",
  password: "passwordDesc",
  address: "addressDesc",
  guide: "guideDesc",
} as const satisfies Record<ProductId, string>;

const PRODUCT_NAME_KEYS = {
  start: "startName",
  ai: "aiName",
  mask: "maskName",
  password: "passwordName",
  address: "addressName",
  guide: "guideName",
} as const satisfies Record<ProductId, string>;

function buildLandingDocuments(
  messages: Record<string, unknown>,
  tProducts: ProductsText,
  tNav: NavigationText,
): SearchDocument[] {
  return products.map((product) => {
    const name = tNav(PRODUCT_NAME_KEYS[product.id]);
    const description = stripRichText(tProducts(PRODUCT_DESC_KEYS[product.id]));
    const productNs = messages[PRODUCT_MESSAGE_NS[product.id]];
    const body = [description, ...flattenMessageStrings(productNs), siteConfig.name, name].join(
      " ",
    );

    return {
      id: `${product.id}:landing`,
      sectionId: product.id,
      href: product.href,
      title: `${siteConfig.name} ${name}`,
      description,
      body,
      kind: "landing" as const,
    };
  });
}

function buildGuidePlayDocument(
  messages: Record<string, unknown>,
  tNav: NavigationText,
): SearchDocument | null {
  const guideNs = messages.Guide;
  if (!isStringRecord(guideNs)) return null;

  const name = tNav("guideName");
  const body = collectByKeyPrefixes(guideNs, ["step", "learn", "prompt", "theme"]);

  return {
    id: "guide:play",
    sectionId: "guide",
    href: "/guide/play",
    title: `${siteConfig.name} ${name} · Play`,
    description: stripRichText(guideNs.learnTitle ?? ""),
    body,
    kind: "landing",
  };
}

/** Academy's own pages, from messages. Tracks and lessons arrive separately from the API. */
function buildAcademyPageDocuments(
  messages: Record<string, unknown>,
  tNav: NavigationText,
): SearchDocument[] {
  const namespace = messages.Academy;
  if (!isStringRecord(namespace)) return [];

  const name = tNav("academyName");
  const description = namespace.description ?? "";

  return [
    {
      id: "academy:landing",
      sectionId: "academy",
      href: "/academy",
      title: `${siteConfig.name} ${name}`,
      description,
      body: "",
      kind: "landing",
    },
    {
      id: "academy:sources",
      sectionId: "academy",
      href: "/academy/sources",
      title: namespace.sourcesTitle ?? "",
      description: stripRichText(namespace.sourcesDescription ?? ""),
      body: collectByKeyPrefixes(namespace, ["sources"]),
      kind: "landing",
    },
    {
      id: "academy:contribute",
      sectionId: "academy",
      href: "/academy/contribute",
      title: namespace.contributeTitle ?? "",
      description: stripRichText(namespace.contributeDescription ?? ""),
      body: collectByKeyPrefixes(namespace, ["contribute"]),
      kind: "landing",
    },
  ];
}

export function buildSearchDocuments(
  messages: AppMessages,
  tProducts: ProductsText,
  tNav: NavigationText,
): SearchDocument[] {
  const landings = buildLandingDocuments(messages, tProducts, tNav);
  const guidePlay = buildGuidePlayDocument(messages, tNav);
  const academyPages = buildAcademyPageDocuments(messages, tNav);

  return [...landings, ...(guidePlay ? [guidePlay] : []), ...academyPages];
}

export function filterSearchDocuments(
  documents: SearchDocument[],
  query: string,
  sectionFilter: ReadonlySet<SearchSectionId>,
): SearchDocument[] {
  const filtered =
    sectionFilter.size === 0
      ? documents
      : documents.filter((doc) => sectionFilter.has(doc.sectionId));

  const normalized = query.trim().toLowerCase();
  if (!normalized) return filtered;

  const terms = normalized.split(/\s+/).filter(Boolean);

  return filtered.filter((doc) => {
    const haystack = `${doc.title} ${doc.description} ${doc.body}`.toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}

export function groupSearchDocumentsBySection(
  documents: SearchDocument[],
): Array<{ sectionId: SearchSectionId; items: SearchDocument[] }> {
  const map = new Map<SearchSectionId, SearchDocument[]>();

  for (const doc of documents) {
    map.set(doc.sectionId, [...(map.get(doc.sectionId) ?? []), doc]);
  }

  return searchSections
    .map((section) => ({
      sectionId: section.id,
      items: map.get(section.id) ?? [],
    }))
    .filter((group) => group.items.length > 0);
}
