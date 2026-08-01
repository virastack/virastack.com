import type { ProductId } from "@/types/product.types";

import {
  getMaskDocsNav,
  getMaskDocsPage,
  isMaskDocsSlug,
  maskDocsSlugs,
} from "@/features/docs/config/mask-docs.config";
import {
  getPasswordDocsNav,
  getPasswordDocsPage,
  isPasswordDocsSlug,
  passwordDocsSlugs,
} from "@/features/docs/config/password-docs.config";
import {
  getStartDocsNav,
  getStartDocsPage,
  isStartDocsSlug,
  startDocsSlugs,
} from "@/features/docs/config/start-docs.config";
import type { DocsNavSection, DocsPageMeta } from "@/features/docs/types/docs.types";

export const DOCS_PRODUCT_IDS = ["start", "mask", "password"] as const;

export type DocsProductId = (typeof DOCS_PRODUCT_IDS)[number];

export function isDocsProductId(value: string): value is DocsProductId {
  return (DOCS_PRODUCT_IDS as readonly string[]).includes(value);
}

type DocsTranslate = (key: string) => string;

type DocsProductConfig = {
  id: DocsProductId;
  label: string;
  indexHref: string;
  messageNamespace: "DocsStart" | "DocsMask" | "DocsPassword";
  slugs: readonly string[];
  getNav: (t: DocsTranslate) => DocsNavSection[];
  getPage: (slug: string, t: DocsTranslate) => DocsPageMeta | undefined;
  isSlug: (slug: string) => boolean;
};

export const docsProducts: Record<DocsProductId, DocsProductConfig> = {
  start: {
    id: "start",
    label: "Start",
    indexHref: "/start/docs",
    messageNamespace: "DocsStart",
    slugs: startDocsSlugs,
    getNav: getStartDocsNav,
    getPage: getStartDocsPage,
    isSlug: isStartDocsSlug,
  },
  mask: {
    id: "mask",
    label: "Mask",
    indexHref: "/mask/docs",
    messageNamespace: "DocsMask",
    slugs: maskDocsSlugs,
    getNav: getMaskDocsNav,
    getPage: getMaskDocsPage,
    isSlug: isMaskDocsSlug,
  },
  password: {
    id: "password",
    label: "Password",
    indexHref: "/password/docs",
    messageNamespace: "DocsPassword",
    slugs: passwordDocsSlugs,
    getNav: getPasswordDocsNav,
    getPage: getPasswordDocsPage,
    isSlug: isPasswordDocsSlug,
  },
};

export function getDocsProduct(
  product: DocsProductId | ProductId | string,
): DocsProductConfig | undefined {
  if (!isDocsProductId(product)) return undefined;
  return docsProducts[product];
}

export function joinDocsSlug(segments: string[]): string {
  return segments.join("/");
}
