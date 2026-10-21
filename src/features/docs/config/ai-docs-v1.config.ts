import type { DocsNavSection, DocsPageMeta } from "@/features/docs/types/docs.types";

const BASE = "/ai/docs/v1";

type DocsAiV1Translate = (key: string) => string;

export const aiDocsV1Slugs = ["introduction"] as const;

export function isAiDocsV1Slug(slug: string): boolean {
  return (aiDocsV1Slugs as readonly string[]).includes(slug);
}

export function getAiDocsV1Nav(t: DocsAiV1Translate): DocsNavSection[] {
  return [
    {
      title: t("navGettingStarted"),
      items: [{ slug: "introduction", title: t("navIntroduction"), href: BASE }],
    },
  ];
}

export function getAiDocsV1Page(slug: string, t: DocsAiV1Translate): DocsPageMeta | undefined {
  const pages: Record<string, DocsPageMeta> = {
    introduction: {
      slug: "introduction",
      title: t("introductionTitle"),
      description: t("introductionDescription"),
      headings: [
        { id: "install", title: t("introductionHeadingInstall") },
        { id: "options", title: t("introductionHeadingOptions") },
        { id: "rules", title: t("introductionHeadingRules") },
        { id: "files", title: t("introductionHeadingFiles") },
      ],
    },
  };

  return pages[slug];
}
