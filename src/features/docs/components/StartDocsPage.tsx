import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { getProduct } from "@/config/products.config";

import { DocsLayout } from "@/features/docs/components/DocsLayout";
import { docsProducts, getDocsVersionContent } from "@/features/docs/config/docs-products";
import {
  StartCliDoc,
  StartI18nDoc,
  StartInstallationDoc,
  StartIntroductionDoc,
  StartModulesDoc,
  StartScriptsDoc,
  StartTemplatesDoc,
} from "@/features/docs/content/start";
import {
  StartV1CliDoc,
  StartV1I18nDoc,
  StartV1InstallationDoc,
  StartV1IntroductionDoc,
  StartV1ScriptsDoc,
  StartV1TemplatesDoc,
} from "@/features/docs/content/start/v1";
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
  const t = await getTranslations(content.messageNamespace);
  const tDocs = await getTranslations("Docs");
  const page = content.getPage(slug, t);
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
      sections={content.getNav(t)}
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
