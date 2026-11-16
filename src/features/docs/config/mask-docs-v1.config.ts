import type { Translator } from "@/types/messages.types";

import { isOneOf } from "@/helpers/is-one-of";

import type { DocsNavSection, DocsPageMeta } from "@/features/docs/types/docs.types";

const BASE = "/mask/docs/v1";

type DocsMaskV1Translate = Translator<"DocsMaskV1">;

export const maskDocsV1Slugs = [
  "introduction",
  "use-vira-mask",
  "custom-mask",
  "validation",
  "helpers",
  "types",
  "ui-libraries",
] as const;

export function isMaskDocsV1Slug(slug: string): boolean {
  return isOneOf(maskDocsV1Slugs, slug);
}

export function getMaskDocsV1Nav(t: DocsMaskV1Translate): DocsNavSection[] {
  return [
    {
      title: t("navGettingStarted"),
      items: [{ slug: "introduction", title: t("navIntroduction"), href: BASE }],
    },
    {
      title: t("navUsage"),
      items: [
        { slug: "use-vira-mask", title: t("navUseViraMask"), href: `${BASE}/use-vira-mask` },
        { slug: "custom-mask", title: t("navCustomMask"), href: `${BASE}/custom-mask` },
        { slug: "validation", title: t("navValidation"), href: `${BASE}/validation` },
        { slug: "helpers", title: t("navHelpers"), href: `${BASE}/helpers` },
        { slug: "types", title: t("navTypes"), href: `${BASE}/types` },
        { slug: "ui-libraries", title: t("navUiLibraries"), href: `${BASE}/ui-libraries` },
      ],
    },
  ];
}

export function getMaskDocsV1Page(slug: string, t: DocsMaskV1Translate): DocsPageMeta | undefined {
  const pages: Record<string, DocsPageMeta> = {
    introduction: {
      slug: "introduction",
      title: t("introductionTitle"),
      description: t("introductionDescription"),
    },
    "use-vira-mask": {
      slug: "use-vira-mask",
      title: t("useViraMaskTitle"),
      description: t("useViraMaskDescription"),
    },
    "custom-mask": {
      slug: "custom-mask",
      title: t("customMaskTitle"),
      description: t("customMaskDescription"),
    },
    validation: {
      slug: "validation",
      title: t("validationTitle"),
      description: t("validationDescription"),
    },
    helpers: {
      slug: "helpers",
      title: t("helpersTitle"),
      description: t("helpersDescription"),
    },
    types: {
      slug: "types",
      title: t("typesTitle"),
      description: t("typesDescription"),
    },
    "ui-libraries": {
      slug: "ui-libraries",
      title: t("uiLibrariesTitle"),
      description: t("uiLibrariesDescription"),
    },
  };

  return pages[slug];
}
