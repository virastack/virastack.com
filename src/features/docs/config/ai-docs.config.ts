import type { Translator } from "@/types/messages.types";

import { isOneOf } from "@/helpers/is-one-of";

import type { DocsNavSection, DocsPageMeta } from "@/features/docs/types/docs.types";

const BASE = "/ai/docs";

type DocsAiTranslate = Translator<"DocsAi">;

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
  return isOneOf(aiDocsSlugs, slug);
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
    },
    installation: {
      slug: "installation",
      title: t("installationTitle"),
      description: t("installationDescription"),
    },
    "supported-tools": {
      slug: "supported-tools",
      title: t("supportedToolsTitle"),
      description: t("supportedToolsDescription"),
    },
    cli: {
      slug: "cli",
      title: t("cliTitle"),
      description: t("cliDescription"),
    },
    "installed-files": {
      slug: "installed-files",
      title: t("installedFilesTitle"),
      description: t("installedFilesDescription"),
    },
    rules: {
      slug: "rules",
      title: t("rulesTitle"),
      description: t("rulesDescription"),
    },
    customization: {
      slug: "customization",
      title: t("customizationTitle"),
      description: t("customizationDescription"),
    },
    upgrade: {
      slug: "upgrade",
      title: t("upgradeTitle"),
      description: t("upgradeDescription"),
    },
    changelog: {
      slug: "changelog",
      title: t("changelogTitle"),
      description: t("changelogDescription"),
    },
  };

  return pages[slug];
}
