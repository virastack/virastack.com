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
      headings: [
        { id: "what", title: t("introductionHeadingWhat") },
        { id: "why", title: t("introductionHeadingWhy") },
        { id: "quick-start", title: t("introductionHeadingQuick") },
        { id: "next-steps", title: t("introductionHeadingNext") },
      ],
    },
    installation: {
      slug: "installation",
      title: t("installationTitle"),
      description: t("installationDescription"),
      headings: [
        { id: "requirements", title: t("installationHeadingRequirements") },
        { id: "install", title: t("installationHeadingInstall") },
        { id: "choose-tools", title: t("installationHeadingAgents") },
        { id: "with-start", title: t("installationHeadingStart") },
        { id: "update", title: t("installationHeadingUpdate") },
      ],
    },
    "supported-tools": {
      slug: "supported-tools",
      title: t("supportedToolsTitle"),
      description: t("supportedToolsDescription"),
      headings: [
        { id: "tools", title: t("supportedToolsHeadingTools") },
        { id: "gemini-cli", title: t("supportedToolsHeadingGemini") },
        { id: "aider", title: t("supportedToolsHeadingAider") },
        { id: "frameworks", title: t("supportedToolsHeadingFrameworks") },
      ],
    },
    cli: {
      slug: "cli",
      title: t("cliTitle"),
      description: t("cliDescription"),
      headings: [
        { id: "commands", title: t("cliHeadingCommands") },
        { id: "options", title: t("cliHeadingOptions") },
        { id: "output", title: t("cliHeadingOutput") },
        { id: "examples", title: t("cliHeadingExamples") },
        { id: "ci", title: t("cliHeadingCi") },
      ],
    },
    "installed-files": {
      slug: "installed-files",
      title: t("installedFilesTitle"),
      description: t("installedFilesDescription"),
      headings: [
        { id: "tree", title: t("installedFilesHeadingTree") },
        { id: "agents-md", title: t("installedFilesHeadingAgents") },
        { id: "claude-md", title: t("installedFilesHeadingClaude") },
        { id: "manifest", title: t("installedFilesHeadingManifest") },
        { id: "managed", title: t("installedFilesHeadingManaged") },
      ],
    },
    rules: {
      slug: "rules",
      title: t("rulesTitle"),
      description: t("rulesDescription"),
      headings: [
        { id: "loading", title: t("rulesHeadingLoading") },
        { id: "catalog", title: t("rulesHeadingCatalog") },
        { id: "conditional", title: t("rulesHeadingConditional") },
      ],
    },
    customization: {
      slug: "customization",
      title: t("customizationTitle"),
      description: t("customizationDescription"),
      headings: [
        { id: "own-rules", title: t("customizationHeadingOwn") },
        { id: "override", title: t("customizationHeadingOverride") },
        { id: "editing", title: t("customizationHeadingEditing") },
        { id: "force", title: t("customizationHeadingForce") },
      ],
    },
    upgrade: {
      slug: "upgrade",
      title: t("upgradeTitle"),
      description: t("upgradeDescription"),
      headings: [
        { id: "what-changed", title: t("upgradeHeadingChanged") },
        { id: "renamed-rules", title: t("upgradeHeadingRenamed") },
        { id: "command", title: t("upgradeHeadingCommand") },
        { id: "checklist", title: t("upgradeHeadingChecklist") },
        { id: "rollback", title: t("upgradeHeadingRollback") },
      ],
    },
    changelog: {
      slug: "changelog",
      title: t("changelogTitle"),
      description: t("changelogDescription"),
      headings: [
        { id: "v2-0-0", title: t("changelogHeadingV2") },
        { id: "v1", title: t("changelogHeadingV1") },
      ],
    },
  };

  return pages[slug];
}
