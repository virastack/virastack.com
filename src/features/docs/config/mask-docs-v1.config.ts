import type { DocsNavSection, DocsPageMeta } from "@/features/docs/types/docs.types";

const BASE = "/mask/docs/v1";

type DocsMaskV1Translate = (key: string) => string;

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
  return (maskDocsV1Slugs as readonly string[]).includes(slug);
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
      headings: [
        { id: "baslarken", title: t("introductionHeadingGettingStarted") },
        { id: "peer", title: t("introductionHeadingPeer") },
        { id: "neden", title: t("introductionHeadingWhy") },
        { id: "kapsam", title: t("introductionHeadingScope") },
      ],
    },
    "use-vira-mask": {
      slug: "use-vira-mask",
      title: t("useViraMaskTitle"),
      description: t("useViraMaskDescription"),
      headings: [
        { id: "temel", title: t("useViraMaskHeadingBasic") },
        { id: "schema", title: t("useViraMaskHeadingSchema") },
        { id: "donus", title: t("useViraMaskHeadingReturn") },
        { id: "rhf", title: t("useViraMaskHeadingRhf") },
      ],
    },
    "custom-mask": {
      slug: "custom-mask",
      title: t("customMaskTitle"),
      description: t("customMaskDescription"),
      headings: [
        { id: "sozdizimi", title: t("customMaskHeadingSyntax") },
        { id: "options", title: t("customMaskHeadingOptions") },
        { id: "resolve", title: t("customMaskHeadingResolve") },
      ],
    },
    validation: {
      slug: "validation",
      title: t("validationTitle"),
      description: t("validationDescription"),
      headings: [
        { id: "built-in", title: t("validationHeadingBuiltIn") },
        { id: "ozel", title: t("validationHeadingCustom") },
        { id: "mesaj", title: t("validationHeadingMessage") },
      ],
    },
    helpers: {
      slug: "helpers",
      title: t("helpersTitle"),
      description: t("helpersDescription"),
      headings: [
        { id: "mask", title: t("helpersHeadingMask") },
        { id: "currency", title: t("helpersHeadingCurrency") },
        { id: "card", title: t("helpersHeadingCard") },
        { id: "refs", title: t("helpersHeadingRefs") },
      ],
    },
    types: {
      slug: "types",
      title: t("typesTitle"),
      description: t("typesDescription"),
      headings: [
        { id: "preset", title: t("typesHeadingPreset") },
        { id: "options", title: t("typesHeadingOptions") },
        { id: "schema", title: t("typesHeadingSchema") },
      ],
    },
    "ui-libraries": {
      slug: "ui-libraries",
      title: t("uiLibrariesTitle"),
      description: t("uiLibrariesDescription"),
      headings: [
        { id: "pattern", title: t("uiLibrariesHeadingPattern") },
        { id: "shadcn", title: t("uiLibrariesHeadingShadcn") },
        { id: "ant-design", title: t("uiLibrariesHeadingAntDesign") },
        { id: "chakra", title: t("uiLibrariesHeadingChakra") },
      ],
    },
  };

  return pages[slug];
}
