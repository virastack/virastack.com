import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { getProduct } from "@/config/products.config";

import { DocsLayout } from "@/features/docs/components/DocsLayout";
import { docsProducts, getDocsVersionContent } from "@/features/docs/config/docs-products";
import { AiV1IntroductionDoc } from "@/features/docs/content/ai/v1";
import {
  AiChangelogDoc,
  AiCliDoc,
  AiCustomizationDoc,
  AiInstallationDoc,
  AiInstalledFilesDoc,
  AiIntroductionDoc,
  AiRulesDoc,
  AiSupportedToolsDoc,
  AiUpgradeDoc,
} from "@/features/docs/content/ai/v2";
import { buildDocsGithubIssueUrl, docsPagePath } from "@/features/docs/lib/docs-github-issue";
import { getDocsVersionLinks } from "@/features/docs/lib/docs-versions";

const UPGRADE_HREF = "/ai/docs/upgrade";

const aiDocsContent: Record<string, Record<string, () => ReactNode>> = {
  latest: {
    introduction: () => <AiIntroductionDoc />,
    installation: () => <AiInstallationDoc />,
    "supported-tools": () => <AiSupportedToolsDoc />,
    cli: () => <AiCliDoc />,
    "installed-files": () => <AiInstalledFilesDoc />,
    rules: () => <AiRulesDoc />,
    customization: () => <AiCustomizationDoc />,
    upgrade: () => <AiUpgradeDoc />,
    changelog: () => <AiChangelogDoc />,
  },
  v1: {
    introduction: () => <AiV1IntroductionDoc />,
  },
};

type AiDocsPageProps = {
  slug: string;
  /** Archived version id (e.g. "v1"); omit for the latest version. */
  versionId?: string;
};

export async function AiDocsPage({ slug, versionId }: AiDocsPageProps) {
  const docs = docsProducts.ai;
  const content = getDocsVersionContent(docs, versionId);
  const version = docs.versions.find((item) => (versionId ? item.id === versionId : item.latest));
  const t = await getTranslations(content.messageNamespace);
  const tDocs = await getTranslations("Docs");
  const page = content.getPage(slug, t);
  const render = aiDocsContent[versionId ?? "latest"]?.[slug];

  if (!page || !version || !render) {
    return null;
  }

  const githubIssueHref = buildDocsGithubIssueUrl({
    githubRepo: getProduct("ai").github,
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
