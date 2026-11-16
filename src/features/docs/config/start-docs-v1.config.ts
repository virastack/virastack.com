import type { Translator } from "@/types/messages.types";

import type { DocsNavSection, DocsPageMeta } from "@/features/docs/types/docs.types";

const BASE = "/start/docs/v1";

type DocsStartV1Translate = Translator<"DocsStartV1">;

export function getStartDocsV1Nav(t: DocsStartV1Translate): DocsNavSection[] {
  return [
    {
      title: t("navGettingStarted"),
      items: [
        { slug: "introduction", title: t("navIntroduction"), href: BASE },
        { slug: "installation", title: t("navInstallation"), href: `${BASE}/installation` },
      ],
    },
    {
      title: t("navCli"),
      items: [
        { slug: "cli", title: t("navCliCommands"), href: `${BASE}/cli` },
        { slug: "templates", title: t("navTemplates"), href: `${BASE}/templates` },
      ],
    },
    {
      title: t("navProject"),
      items: [
        { slug: "scripts", title: t("navScripts"), href: `${BASE}/scripts` },
        { slug: "i18n", title: t("navI18n"), href: `${BASE}/i18n` },
      ],
    },
  ];
}

export function getStartDocsV1Page(
  slug: string,
  t: DocsStartV1Translate,
): DocsPageMeta | undefined {
  const pages: Record<string, DocsPageMeta> = {
    introduction: {
      slug: "introduction",
      title: t("introductionTitle"),
      description: t("introductionDescription"),
    },
    installation: {
      slug: "installation",
      title: t("installationTitle"),
      description: t("installationDescription"),
    },
    cli: {
      slug: "cli",
      title: t("cliTitle"),
      description: t("cliDescription"),
    },
    templates: {
      slug: "templates",
      title: t("templatesTitle"),
      description: t("templatesDescription"),
    },
    scripts: {
      slug: "scripts",
      title: t("scriptsTitle"),
      description: t("scriptsDescription"),
    },
    i18n: {
      slug: "i18n",
      title: t("i18nTitle"),
      description: t("i18nDescription"),
    },
  };

  return pages[slug];
}

export function isStartDocsV1Slug(slug: string): boolean {
  return slug in startDocsV1SlugSet;
}

export const startDocsV1Slugs = [
  "introduction",
  "installation",
  "cli",
  "templates",
  "scripts",
  "i18n",
] as const;

const startDocsV1SlugSet: Record<string, true> = Object.fromEntries(
  startDocsV1Slugs.map((slug) => [slug, true as const]),
);
