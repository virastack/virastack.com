import type { ProductId } from "@/types/product.types";
import { products } from "@/config/products.config";
import { siteConfig } from "@/config/site.config";

import { DOCS_PRODUCT_IDS, docsProducts } from "@/features/docs/config/docs-products";
import {
  collectByKeyPrefixes,
  exampleIdToKeyPrefix,
  flattenMessageStrings,
  isStringRecord,
  kebabToCamel,
} from "@/features/search/helpers/message-utils";
import { stripRichText } from "@/features/search/helpers/strip-rich-text";
import type { SearchDocument } from "@/features/search/types/search.types";

type Translate = (key: string) => string;

const PRODUCT_MESSAGE_NS = {
  start: "Start",
  ai: "Ai",
  mask: "Mask",
  password: "Password",
  guide: "Guide",
} as const satisfies Record<ProductId, string>;

const PRODUCT_DESC_KEYS = {
  start: "startDesc",
  ai: "aiDesc",
  mask: "maskDesc",
  password: "passwordDesc",
  guide: "guideDesc",
} as const satisfies Record<ProductId, string>;

const PRODUCT_NAME_KEYS = {
  start: "startName",
  ai: "aiName",
  mask: "maskName",
  password: "passwordName",
  guide: "guideName",
} as const satisfies Record<ProductId, string>;

function docsKeyPrefixesForSlug(slug: string): string[] {
  if (slug.startsWith("examples/")) {
    const exampleId = slug.slice("examples/".length);
    return [exampleIdToKeyPrefix(exampleId), "exampleDetail"];
  }

  const camel = kebabToCamel(slug);
  return [camel, `nav${camel.charAt(0).toUpperCase()}${camel.slice(1)}`];
}

function buildLandingDocuments(
  messages: Record<string, unknown>,
  tProducts: Translate,
  tNav: Translate,
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
      productId: product.id,
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
  tNav: Translate,
): SearchDocument | null {
  const guideNs = messages.Guide;
  if (!isStringRecord(guideNs)) return null;

  const name = tNav("guideName");
  const body = collectByKeyPrefixes(guideNs, ["step", "learn", "prompt", "theme"]);

  return {
    id: "guide:play",
    productId: "guide",
    href: "/guide/play",
    title: `${siteConfig.name} ${name} · Play`,
    description: stripRichText(guideNs.learnTitle ?? ""),
    body,
    kind: "landing",
  };
}

function buildDocsDocuments(messages: Record<string, unknown>): SearchDocument[] {
  const documents: SearchDocument[] = [];

  for (const productId of DOCS_PRODUCT_IDS) {
    const config = docsProducts[productId];
    const namespace = messages[config.messageNamespace];
    if (!isStringRecord(namespace)) continue;

    const t: Translate = (key) => namespace[key] ?? key;

    for (const slug of config.slugs) {
      const page = config.getPage(slug, t);
      if (!page) continue;

      const prefixes = docsKeyPrefixesForSlug(slug);
      const headingText = page.headings.map((heading) => heading.title).join(" ");
      const body = [page.description, headingText, collectByKeyPrefixes(namespace, prefixes)].join(
        " ",
      );

      documents.push({
        id: `${productId}:docs:${slug}`,
        productId,
        href: page.slug === "introduction" ? config.indexHref : `${config.indexHref}/${page.slug}`,
        title: page.title,
        description: page.description,
        body,
        kind: "docs",
      });
    }
  }

  return documents;
}

export function buildSearchDocuments(
  messages: Record<string, unknown>,
  tProducts: Translate,
  tNav: Translate,
): SearchDocument[] {
  const landings = buildLandingDocuments(messages, tProducts, tNav);
  const docs = buildDocsDocuments(messages);
  const guidePlay = buildGuidePlayDocument(messages, tNav);

  return guidePlay ? [...landings, ...docs, guidePlay] : [...landings, ...docs];
}

export function filterSearchDocuments(
  documents: SearchDocument[],
  query: string,
  productFilter: ReadonlySet<ProductId>,
): SearchDocument[] {
  const filtered =
    productFilter.size === 0
      ? documents
      : documents.filter((doc) => productFilter.has(doc.productId));

  const normalized = query.trim().toLowerCase();
  if (!normalized) return filtered;

  const terms = normalized.split(/\s+/).filter(Boolean);

  return filtered.filter((doc) => {
    const haystack = `${doc.title} ${doc.description} ${doc.body}`.toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}

export function groupSearchDocumentsByProduct(
  documents: SearchDocument[],
): Array<{ productId: ProductId; items: SearchDocument[] }> {
  const order = products.map((product) => product.id);
  const map = new Map<ProductId, SearchDocument[]>();

  for (const productId of order) {
    map.set(productId, []);
  }

  for (const doc of documents) {
    map.get(doc.productId)?.push(doc);
  }

  return order
    .map((productId) => ({
      productId,
      items: map.get(productId) ?? [],
    }))
    .filter((group) => group.items.length > 0);
}
