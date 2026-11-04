import { createTranslator } from "next-intl";

import type { AppMessages } from "@/types/messages.types";
import type { ProductId } from "@/types/product.types";

import {
  addressDocsSlugs,
  getAddressDocsNav,
  getAddressDocsPage,
  isAddressDocsSlug,
} from "@/features/docs/config/address-docs.config";
import {
  aiDocsV1Slugs,
  getAiDocsV1Nav,
  getAiDocsV1Page,
  isAiDocsV1Slug,
} from "@/features/docs/config/ai-docs-v1.config";
import {
  aiDocsSlugs,
  getAiDocsNav,
  getAiDocsPage,
  isAiDocsSlug,
} from "@/features/docs/config/ai-docs.config";
import {
  getMaskDocsV1Nav,
  getMaskDocsV1Page,
  isMaskDocsV1Slug,
  maskDocsV1Slugs,
} from "@/features/docs/config/mask-docs-v1.config";
import {
  getMaskDocsNav,
  getMaskDocsPage,
  isMaskDocsSlug,
  maskDocsSlugs,
} from "@/features/docs/config/mask-docs.config";
import {
  getPasswordDocsV1Nav,
  getPasswordDocsV1Page,
  isPasswordDocsV1Slug,
  passwordDocsV1Slugs,
} from "@/features/docs/config/password-docs-v1.config";
import {
  getPasswordDocsNav,
  getPasswordDocsPage,
  isPasswordDocsSlug,
  passwordDocsSlugs,
} from "@/features/docs/config/password-docs.config";
import {
  getStartDocsV1Nav,
  getStartDocsV1Page,
  isStartDocsV1Slug,
  startDocsV1Slugs,
} from "@/features/docs/config/start-docs-v1.config";
import {
  getStartDocsNav,
  getStartDocsPage,
  isStartDocsSlug,
  startDocsSlugs,
} from "@/features/docs/config/start-docs.config";
import type { DocsNavSection, DocsPageMeta } from "@/features/docs/types/docs.types";

export const DOCS_PRODUCT_IDS = ["start", "ai", "mask", "password", "address"] as const;

export type DocsProductId = (typeof DOCS_PRODUCT_IDS)[number];

export function isDocsProductId(value: string): value is DocsProductId {
  return (DOCS_PRODUCT_IDS as readonly string[]).includes(value);
}

type DocsMessageNamespace =
  | "DocsStart"
  | "DocsStartV1"
  | "DocsAi"
  | "DocsAiV1"
  | "DocsMask"
  | "DocsMaskV1"
  | "DocsPassword"
  | "DocsPasswordV1"
  | "DocsAddress";

type DocsVersion = {
  id: string;
  /** Selector label, e.g. "v2.0". */
  label: string;
  latest: boolean;
};

type DocsVersionTexts = {
  getNav: () => DocsNavSection[];
  getPage: (slug: string) => DocsPageMeta | undefined;
};

/** Content of one docs version. */
type DocsVersionContent = {
  indexHref: string;
  messageNamespace: DocsMessageNamespace;
  slugs: readonly string[];
  /** Builds nav and page meta from this version's own namespace, so its keys stay typed. */
  texts: (messages: AppMessages, locale: string) => DocsVersionTexts;
  isSlug: (slug: string) => boolean;
};

/**
 * Top-level fields describe the latest version (served at versionless paths).
 * Archived versions live under `archives`, keyed by version id (served at `<indexHref>/<id>`).
 */
export type DocsProductConfig = DocsVersionContent & {
  id: DocsProductId;
  label: string;
  versions: readonly DocsVersion[];
  archives: Record<string, DocsVersionContent>;
};

export const docsProducts: Record<DocsProductId, DocsProductConfig> = {
  start: {
    id: "start",
    label: "Start",
    indexHref: "/start/docs",
    messageNamespace: "DocsStart",
    slugs: startDocsSlugs,
    texts: (messages, locale) => {
      const t = createTranslator({ locale, messages, namespace: "DocsStart" });
      return { getNav: () => getStartDocsNav(t), getPage: (slug) => getStartDocsPage(slug, t) };
    },
    isSlug: isStartDocsSlug,
    versions: [
      { id: "v2", label: "v2.0", latest: true },
      { id: "v1", label: "v1.2", latest: false },
    ],
    archives: {
      v1: {
        indexHref: "/start/docs/v1",
        messageNamespace: "DocsStartV1",
        slugs: startDocsV1Slugs,
        texts: (messages, locale) => {
          const t = createTranslator({ locale, messages, namespace: "DocsStartV1" });
          return {
            getNav: () => getStartDocsV1Nav(t),
            getPage: (slug) => getStartDocsV1Page(slug, t),
          };
        },
        isSlug: isStartDocsV1Slug,
      },
    },
  },
  ai: {
    id: "ai",
    label: "AI",
    indexHref: "/ai/docs",
    messageNamespace: "DocsAi",
    slugs: aiDocsSlugs,
    texts: (messages, locale) => {
      const t = createTranslator({ locale, messages, namespace: "DocsAi" });
      return { getNav: () => getAiDocsNav(t), getPage: (slug) => getAiDocsPage(slug, t) };
    },
    isSlug: isAiDocsSlug,
    versions: [
      { id: "v2", label: "v2.1", latest: true },
      { id: "v1", label: "v1.3", latest: false },
    ],
    archives: {
      v1: {
        indexHref: "/ai/docs/v1",
        messageNamespace: "DocsAiV1",
        slugs: aiDocsV1Slugs,
        texts: (messages, locale) => {
          const t = createTranslator({ locale, messages, namespace: "DocsAiV1" });
          return { getNav: () => getAiDocsV1Nav(t), getPage: (slug) => getAiDocsV1Page(slug, t) };
        },
        isSlug: isAiDocsV1Slug,
      },
    },
  },
  mask: {
    id: "mask",
    label: "Mask",
    indexHref: "/mask/docs",
    messageNamespace: "DocsMask",
    slugs: maskDocsSlugs,
    texts: (messages, locale) => {
      const t = createTranslator({ locale, messages, namespace: "DocsMask" });
      return { getNav: () => getMaskDocsNav(t), getPage: (slug) => getMaskDocsPage(slug, t) };
    },
    isSlug: isMaskDocsSlug,
    versions: [
      { id: "v2", label: "v2.2", latest: true },
      { id: "v1", label: "v1.1", latest: false },
    ],
    archives: {
      v1: {
        indexHref: "/mask/docs/v1",
        messageNamespace: "DocsMaskV1",
        slugs: maskDocsV1Slugs,
        texts: (messages, locale) => {
          const t = createTranslator({ locale, messages, namespace: "DocsMaskV1" });
          return {
            getNav: () => getMaskDocsV1Nav(t),
            getPage: (slug) => getMaskDocsV1Page(slug, t),
          };
        },
        isSlug: isMaskDocsV1Slug,
      },
    },
  },
  password: {
    id: "password",
    label: "Password",
    indexHref: "/password/docs",
    messageNamespace: "DocsPassword",
    slugs: passwordDocsSlugs,
    texts: (messages, locale) => {
      const t = createTranslator({ locale, messages, namespace: "DocsPassword" });
      return {
        getNav: () => getPasswordDocsNav(t),
        getPage: (slug) => getPasswordDocsPage(slug, t),
      };
    },
    isSlug: isPasswordDocsSlug,
    versions: [
      { id: "v1.1", label: "v1.1", latest: true },
      { id: "v1", label: "v1.0", latest: false },
    ],
    archives: {
      v1: {
        indexHref: "/password/docs/v1",
        messageNamespace: "DocsPasswordV1",
        slugs: passwordDocsV1Slugs,
        texts: (messages, locale) => {
          const t = createTranslator({ locale, messages, namespace: "DocsPasswordV1" });
          return {
            getNav: () => getPasswordDocsV1Nav(t),
            getPage: (slug) => getPasswordDocsV1Page(slug, t),
          };
        },
        isSlug: isPasswordDocsV1Slug,
      },
    },
  },
  address: {
    id: "address",
    label: "Address",
    indexHref: "/address/docs",
    messageNamespace: "DocsAddress",
    slugs: addressDocsSlugs,
    texts: (messages, locale) => {
      const t = createTranslator({ locale, messages, namespace: "DocsAddress" });
      return { getNav: () => getAddressDocsNav(t), getPage: (slug) => getAddressDocsPage(slug, t) };
    },
    isSlug: isAddressDocsSlug,
    versions: [{ id: "v1", label: "v1.0", latest: true }],
    archives: {},
  },
};

export function getDocsProduct(
  product: DocsProductId | ProductId | string,
): DocsProductConfig | undefined {
  if (!isDocsProductId(product)) return undefined;
  return docsProducts[product];
}

function joinDocsSlug(segments: string[]): string {
  return segments.join("/");
}

export type ResolvedDocsRoute = {
  version: DocsVersion;
  content: DocsVersionContent;
  slug: string;
};

/**
 * Resolves `[...slug]` segments to a version and page slug.
 * A leading archive version id (e.g. `v1`) selects that archive; otherwise the latest version is used.
 * Non-canonical paths (e.g. `introduction`, which lives at the index) resolve to undefined.
 */
export function resolveDocsRoute(
  docs: DocsProductConfig,
  segments: string[],
): ResolvedDocsRoute | undefined {
  const [first, ...rest] = segments;
  const archive = first ? docs.archives[first] : undefined;
  const archiveVersion = docs.versions.find((item) => item.id === first && !item.latest);

  if (archive && archiveVersion) {
    const slug = rest.length === 0 ? "introduction" : joinDocsSlug(rest);
    const canonical = slug === "introduction" ? rest.length === 0 : true;
    return canonical && archive.isSlug(slug)
      ? { version: archiveVersion, content: archive, slug }
      : undefined;
  }

  const latest = docs.versions.find((item) => item.latest);
  const slug = joinDocsSlug(segments);
  return latest && slug !== "introduction" && docs.isSlug(slug)
    ? { version: latest, content: docs, slug }
    : undefined;
}

/** Content for a version id; falls back to the latest version. */
export function getDocsVersionContent(
  docs: DocsProductConfig,
  versionId: string | undefined,
): DocsVersionContent {
  return (versionId ? docs.archives[versionId] : undefined) ?? docs;
}
