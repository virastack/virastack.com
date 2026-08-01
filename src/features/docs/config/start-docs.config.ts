import type { DocsNavSection, DocsPageMeta } from "@/features/docs/types/docs.types";

const BASE = "/start/docs";

type DocsStartTranslate = (key: string) => string;

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

export function getStartDocsPage(slug: string, t: DocsStartTranslate): DocsPageMeta | undefined {
  const pages: Record<string, DocsPageMeta> = {
    introduction: {
      slug: "introduction",
      title: t("introductionTitle"),
      description: t("introductionDescription"),
      headings: [
        { id: "neden", title: t("introductionHeadingWhy") },
        { id: "sablonda-neler-var", title: t("introductionHeadingWhatsIn") },
        { id: "baslarken", title: t("introductionHeadingGettingStarted") },
      ],
    },
    installation: {
      slug: "installation",
      title: t("installationTitle"),
      description: t("installationDescription"),
      headings: [
        { id: "hizli-baslangic", title: t("installationHeadingQuick") },
        { id: "cli-sorulari", title: t("installationHeadingQuestions") },
        { id: "sonrasi", title: t("installationHeadingAfter") },
        { id: "fixme", title: t("installationHeadingFixme") },
      ],
    },
    cli: {
      slug: "cli",
      title: t("cliTitle"),
      description: t("cliDescription"),
      headings: [
        { id: "kullanim", title: t("cliHeadingUsage") },
        { id: "bayraklar", title: t("cliHeadingFlags") },
        { id: "add", title: t("cliHeadingAdd") },
        { id: "telemetry", title: t("cliHeadingTelemetry") },
      ],
    },
    templates: {
      slug: "templates",
      title: t("templatesTitle"),
      description: t("templatesDescription"),
      headings: [
        { id: "framework", title: t("templatesHeadingFramework") },
        { id: "stack", title: t("templatesHeadingStack") },
        { id: "klasor-yapisi", title: t("templatesHeadingStructure") },
      ],
    },
    scripts: {
      slug: "scripts",
      title: t("scriptsTitle"),
      description: t("scriptsDescription"),
      headings: [
        { id: "gunluk", title: t("scriptsHeadingDaily") },
        { id: "kalite", title: t("scriptsHeadingQuality") },
        { id: "framework", title: t("scriptsHeadingFramework") },
        { id: "ci", title: t("scriptsHeadingCi") },
      ],
    },
    i18n: {
      slug: "i18n",
      title: t("i18nTitle"),
      description: t("i18nDescription"),
      headings: [
        { id: "ne-zaman", title: t("i18nHeadingWhen") },
        { id: "nextjs", title: t("i18nHeadingNext") },
        { id: "tanstack", title: t("i18nHeadingTanstack") },
        { id: "varsayilan", title: t("i18nHeadingDefault") },
      ],
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
  "templates",
  "scripts",
  "i18n",
] as const;

const startDocsSlugSet: Record<string, true> = Object.fromEntries(
  startDocsSlugs.map((slug) => [slug, true as const]),
);
