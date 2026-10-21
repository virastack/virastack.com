import type { DocsNavSection, DocsPageMeta } from "@/features/docs/types/docs.types";

const BASE = "/ai/docs";

type DocsAiTranslate = (key: string) => string;

export const aiDocsSlugs = [
  "introduction",
  "installation",
  "supported-tools",
  "cli",
  "installed-files",
  "rules",
  "customization",
  "upgrade",
  "changelog",
] as const;

export function isAiDocsSlug(slug: string): boolean {
  return (aiDocsSlugs as readonly string[]).includes(slug);
}

export function getAiDocsNav(t: DocsAiTranslate): DocsNavSection[] {
  return [
    {
      title: t("navGettingStarted"),
      items: [
        { slug: "introduction", title: t("navIntroduction"), href: BASE },
        { slug: "installation", title: t("navInstallation"), href: `${BASE}/installation` },
        {
          slug: "supported-tools",
          title: t("navSupportedTools"),
          href: `${BASE}/supported-tools`,
        },
        {
          slug: "llms.txt",
          title: "llms.txt",
          href: "/ai/llms.txt",
          external: true,
        },
        {
          slug: "llms-full.txt",
          title: "llms-full.txt",
          href: "/ai/llms-full.txt",
          external: true,
        },
      ],
    },
    {
      title: t("navUsage"),
      items: [
        { slug: "cli", title: t("navCli"), href: `${BASE}/cli` },
        { slug: "installed-files", title: t("navInstalledFiles"), href: `${BASE}/installed-files` },
      ],
    },
    {
      title: t("navRules"),
      items: [
        { slug: "rules", title: t("navRulesOverview"), href: `${BASE}/rules` },
        { slug: "customization", title: t("navCustomization"), href: `${BASE}/customization` },
      ],
    },
    {
      title: t("navUpgrade"),
      items: [
        { slug: "upgrade", title: t("navUpgradeGuide"), href: `${BASE}/upgrade` },
        { slug: "changelog", title: t("navChangelog"), href: `${BASE}/changelog` },
      ],
    },
  ];
}

export function getAiDocsPage(slug: string, t: DocsAiTranslate): DocsPageMeta | undefined {
  const pages: Record<string, DocsPageMeta> = {
    introduction: {
      slug: "introduction",
      title: t("introductionTitle"),
      description: t("introductionDescription"),
      headings: [],
    },
    installation: {
      slug: "installation",
      title: t("installationTitle"),
      description: t("installationDescription"),
      headings: [],
    },
    "supported-tools": {
      slug: "supported-tools",
      title: t("supportedToolsTitle"),
      description: t("supportedToolsDescription"),
      headings: [],
    },
    cli: {
      slug: "cli",
      title: t("cliTitle"),
      description: t("cliDescription"),
      headings: [],
    },
    "installed-files": {
      slug: "installed-files",
      title: t("installedFilesTitle"),
      description: t("installedFilesDescription"),
      headings: [],
    },
    rules: {
      slug: "rules",
      title: t("rulesTitle"),
      description: t("rulesDescription"),
      headings: [],
    },
    customization: {
      slug: "customization",
      title: t("customizationTitle"),
      description: t("customizationDescription"),
      headings: [],
    },
    upgrade: {
      slug: "upgrade",
      title: t("upgradeTitle"),
      description: t("upgradeDescription"),
      headings: [],
    },
    changelog: {
      slug: "changelog",
      title: t("changelogTitle"),
      description: t("changelogDescription"),
      headings: [],
    },
  };

  return pages[slug];
}
