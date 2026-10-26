import type { DocsNavSection, DocsPageMeta } from "@/features/docs/types/docs.types";

const BASE = "/password/docs/v1";

type DocsPasswordV1Translate = (key: string) => string;

export const passwordDocsV1Slugs = [
  "introduction",
  "use-vira-password",
  "accessibility",
  "customization",
  "helpers",
  "types",
  "ui-libraries",
] as const;

export function isPasswordDocsV1Slug(slug: string): boolean {
  return (passwordDocsV1Slugs as readonly string[]).includes(slug);
}

export function getPasswordDocsV1Nav(t: DocsPasswordV1Translate): DocsNavSection[] {
  return [
    {
      title: t("navGettingStarted"),
      items: [
        { slug: "introduction", title: t("navIntroduction"), href: BASE },
        { slug: "llms.txt", title: "llms.txt", href: "/password/v1/llms.txt", external: true },
        {
          slug: "llms-full.txt",
          title: "llms-full.txt",
          href: "/password/v1/llms-full.txt",
          external: true,
        },
      ],
    },
    {
      title: t("navUsage"),
      items: [
        {
          slug: "use-vira-password",
          title: "useViraPassword()",
          href: `${BASE}/use-vira-password`,
        },
        { slug: "accessibility", title: "Accessibility", href: `${BASE}/accessibility` },
        { slug: "customization", title: "Customization", href: `${BASE}/customization` },
        { slug: "helpers", title: "Helpers", href: `${BASE}/helpers` },
        { slug: "types", title: "Types", href: `${BASE}/types` },
        { slug: "ui-libraries", title: t("navUiLibraries"), href: `${BASE}/ui-libraries` },
      ],
    },
  ];
}

export function getPasswordDocsV1Page(
  slug: string,
  t: DocsPasswordV1Translate,
): DocsPageMeta | undefined {
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
    "use-vira-password": {
      slug: "use-vira-password",
      title: "useViraPassword()",
      description: t("useViraPasswordDescription"),
      headings: [
        { id: "temel", title: t("useViraPasswordHeadingBasic") },
        { id: "options", title: "Options" },
        { id: "donus", title: t("useViraPasswordHeadingReturn") },
        { id: "merge", title: "Prop merging" },
      ],
    },
    accessibility: {
      slug: "accessibility",
      title: "Accessibility",
      description: t("accessibilityDescription"),
      headings: [
        { id: "aria", title: t("accessibilityHeadingAria") },
        { id: "button", title: "type=button" },
        { id: "ids", title: t("accessibilityHeadingIds") },
      ],
    },
    customization: {
      slug: "customization",
      title: "Customization",
      description: t("customizationDescription"),
      headings: [
        { id: "icons", title: t("customizationHeadingIcons") },
        { id: "props", title: "inputProps & btnProps" },
        { id: "state", title: "disabled & readOnly" },
      ],
    },
    helpers: {
      slug: "helpers",
      title: "Helpers",
      description: t("helpersDescription"),
      headings: [
        { id: "core", title: t("helpersHeadingCore") },
        { id: "icons", title: t("helpersHeadingIcons") },
        { id: "merge", title: "mergeProps" },
      ],
    },
    types: {
      slug: "types",
      title: "Types",
      description: t("typesDescription"),
      headings: [
        { id: "options", title: "UseViraPasswordOptions" },
        { id: "result", title: "UseViraPasswordResult" },
      ],
    },
    "ui-libraries": {
      slug: "ui-libraries",
      title: t("uiLibrariesTitle"),
      description: t("uiLibrariesDescription"),
      headings: [
        { id: "pattern", title: t("uiLibrariesHeadingPattern") },
        { id: "shadcn", title: "shadcn/ui" },
        { id: "ant-design", title: "Ant Design" },
        { id: "chakra", title: "Chakra UI" },
      ],
    },
  };

  return pages[slug];
}
