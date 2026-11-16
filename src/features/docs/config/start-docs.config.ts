import type { Translator } from "@/types/messages.types";

import type { DocsNavSection, DocsPageMeta } from "@/features/docs/types/docs.types";

const BASE = "/start/docs";

type DocsStartTranslate = Translator<"DocsStart">;

export function getStartDocsNav(t: DocsStartTranslate): DocsNavSection[] {
  return [
    {
      title: t("navGettingStarted"),
      items: [
        { slug: "introduction", title: t("navIntroduction"), href: BASE },
        { slug: "installation", title: t("navInstallation"), href: `${BASE}/installation` },
        {
          slug: "llms.txt",
          title: "llms.txt",
          href: "/start/llms.txt",
          external: true,
        },
        {
          slug: "llms-full.txt",
          title: "llms-full.txt",
          href: "/start/llms-full.txt",
          external: true,
        },
      ],
    },
    {
      title: t("navCli"),
      items: [
        { slug: "cli", title: t("navCliCommands"), href: `${BASE}/cli` },
        { slug: "modules", title: t("navModules"), href: `${BASE}/modules` },
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

export function getStartDocsPage(slug: string, t: DocsStartTranslate): DocsPageMeta | undefined {
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
    modules: {
      slug: "modules",
      title: t("modulesTitle"),
      description: t("modulesDescription"),
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

export function isStartDocsSlug(slug: string): boolean {
  return slug in startDocsSlugSet;
}

export const startDocsSlugs = [
  "introduction",
  "installation",
  "cli",
  "modules",
  "templates",
  "scripts",
  "i18n",
] as const;

const startDocsSlugSet: Record<string, true> = Object.fromEntries(
  startDocsSlugs.map((slug) => [slug, true as const]),
);
