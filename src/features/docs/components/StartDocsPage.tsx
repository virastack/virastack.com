import type { ReactNode } from "react";

import { getLocale, getMessages, getTranslations } from "next-intl/server";

import { getProduct } from "@/config/products.config";

import { DocsLayout } from "@/features/docs/components/DocsLayout";
import { docsProducts, getDocsVersionContent } from "@/features/docs/config/docs-products";
import { StartCliDoc } from "@/features/docs/content/start/StartCliDoc";
import { StartI18nDoc } from "@/features/docs/content/start/StartI18nDoc";
import { StartInstallationDoc } from "@/features/docs/content/start/StartInstallationDoc";
import { StartIntroductionDoc } from "@/features/docs/content/start/StartIntroductionDoc";
import { StartModulesDoc } from "@/features/docs/content/start/StartModulesDoc";
import { StartScriptsDoc } from "@/features/docs/content/start/StartScriptsDoc";
import { StartTemplatesDoc } from "@/features/docs/content/start/StartTemplatesDoc";
import { StartV1CliDoc } from "@/features/docs/content/start/v1/StartV1CliDoc";
import { StartV1I18nDoc } from "@/features/docs/content/start/v1/StartV1I18nDoc";
import { StartV1InstallationDoc } from "@/features/docs/content/start/v1/StartV1InstallationDoc";
import { StartV1IntroductionDoc } from "@/features/docs/content/start/v1/StartV1IntroductionDoc";
import { StartV1ScriptsDoc } from "@/features/docs/content/start/v1/StartV1ScriptsDoc";
import { StartV1TemplatesDoc } from "@/features/docs/content/start/v1/StartV1TemplatesDoc";
import { buildDocsGithubIssueUrl, docsPagePath } from "@/features/docs/lib/docs-github-issue";
import { getDocsVersionLinks } from "@/features/docs/lib/docs-versions";

/** The note's migration section is the upgrade guide from 1.x. */
const UPGRADE_HREF = "/releases#start-2-0-0";

const startDocsContent: Record<string, Record<string, () => ReactNode>> = {
  latest: {
    introduction: () => <StartIntroductionDoc />,
    installation: () => <StartInstallationDoc />,
    cli: () => <StartCliDoc />,
    modules: () => <StartModulesDoc />,
    templates: () => <StartTemplatesDoc />,
    scripts: () => <StartScriptsDoc />,
    i18n: () => <StartI18nDoc />,
  },
  v1: {
    introduction: () => <StartV1IntroductionDoc />,
    installation: () => <StartV1InstallationDoc />,
    cli: () => <StartV1CliDoc />,
    templates: () => <StartV1TemplatesDoc />,
    scripts: () => <StartV1ScriptsDoc />,
    i18n: () => <StartV1I18nDoc />,
  },
};

type StartDocsPageProps = {
  slug: string;
  /** Archived version id (e.g. "v1"); omit for the latest version. */
  versionId?: string;
};

export async function StartDocsPage({ slug, versionId }: StartDocsPageProps) {
  const docs = docsProducts.start;
  const content = getDocsVersionContent(docs, versionId);
  const version = docs.versions.find((item) => (versionId ? item.id === versionId : item.latest));
  const texts = content.texts(await getMessages(), await getLocale());
  const tDocs = await getTranslations("Docs");
  const page = texts.getPage(slug);
  const render = startDocsContent[versionId ?? "latest"]?.[slug];

  if (!page || !version || !render) {
    return null;
  }

  const product = getProduct("start");
  const githubIssueHref = buildDocsGithubIssueUrl({
    githubRepo: product.github,
    pageTitle: page.title,
    pagePath: docsPagePath(content.indexHref, slug),
    labels: {
      page: tDocs("issuePage"),
      problem: tDocs("issueProblem"),
      comment: tDocs("issueComment"),
    },
  });

  return (
    <DocsLayout
      sections={texts.getNav()}
      docsIndexHref={content.indexHref}
      slug={slug}
      headings={page.headings}
      githubIssueHref={githubIssueHref}
      versions={{
        current: version.id,
        links: getDocsVersionLinks(docs, slug),
        upgradeHref: UPGRADE_HREF,
      }}
    >
      {render()}
    </DocsLayout>
  );
}
