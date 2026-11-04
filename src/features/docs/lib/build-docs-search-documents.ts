import type { AppMessages } from "@/types/messages.types";
import type { SearchDocument } from "@/types/search.types";

import {
  collectByKeyPrefixes,
  exampleIdToKeyPrefix,
  isStringRecord,
  kebabToCamel,
} from "@/helpers/message-utils";

import { DOCS_PRODUCT_IDS, docsProducts } from "@/features/docs/config/docs-products";

function docsKeyPrefixesForSlug(slug: string): string[] {
  if (slug.startsWith("examples/")) {
    const exampleId = slug.slice("examples/".length);
    return [exampleIdToKeyPrefix(exampleId), "exampleDetail"];
  }

  const camel = kebabToCamel(slug);
  return [camel, `nav${camel.charAt(0).toUpperCase()}${camel.slice(1)}`];
}

/** Every docs page of every product, for the site search. */
export function buildDocsSearchDocuments(messages: AppMessages, locale: string): SearchDocument[] {
  const documents: SearchDocument[] = [];

  for (const productId of DOCS_PRODUCT_IDS) {
    const config = docsProducts[productId];
    const namespace: unknown = messages[config.messageNamespace];
    if (!isStringRecord(namespace)) continue;

    const texts = config.texts(messages, locale);

    for (const slug of config.slugs) {
      const page = texts.getPage(slug);
      if (!page) continue;

      const prefixes = docsKeyPrefixesForSlug(slug);
      const headingText = page.headings.map((heading) => heading.title).join(" ");
      const body = [page.description, headingText, collectByKeyPrefixes(namespace, prefixes)].join(
        " ",
      );

      documents.push({
        id: `${productId}:docs:${slug}`,
        sectionId: productId,
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
