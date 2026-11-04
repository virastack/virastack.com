import type { ReactNode } from "react";

import { getLocale, getMessages, getTranslations } from "next-intl/server";

import { getProduct } from "@/config/products.config";

import { DocsLayout } from "@/features/docs/components/DocsLayout";
import { docsProducts, getDocsVersionContent } from "@/features/docs/config/docs-products";
import { AiV1IntroductionDoc } from "@/features/docs/content/ai/v1/AiV1IntroductionDoc";
import { AiChangelogDoc } from "@/features/docs/content/ai/v2/AiChangelogDoc";
import { AiCliDoc } from "@/features/docs/content/ai/v2/AiCliDoc";
import { AiCustomizationDoc } from "@/features/docs/content/ai/v2/AiCustomizationDoc";
import { AiInstallationDoc } from "@/features/docs/content/ai/v2/AiInstallationDoc";
import { AiInstalledFilesDoc } from "@/features/docs/content/ai/v2/AiInstalledFilesDoc";
import { AiIntroductionDoc } from "@/features/docs/content/ai/v2/AiIntroductionDoc";
import { AiRulesDoc } from "@/features/docs/content/ai/v2/AiRulesDoc";
import { AiSupportedToolsDoc } from "@/features/docs/content/ai/v2/AiSupportedToolsDoc";
import { AiUpgradeDoc } from "@/features/docs/content/ai/v2/AiUpgradeDoc";
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
  const texts = content.texts(await getMessages(), await getLocale());
  const tDocs = await getTranslations("Docs");
  const page = texts.getPage(slug);
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
