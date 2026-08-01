import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { getProduct } from "@/config/products.config";

import { DocsLayout } from "@/features/docs/components/DocsLayout";
import { DocsMobileNav } from "@/features/docs/components/DocsMobileNav";
import { getStartDocsNav, getStartDocsPage } from "@/features/docs/config/start-docs.config";
import {
  StartCliDoc,
  StartI18nDoc,
  StartInstallationDoc,
  StartIntroductionDoc,
  StartScriptsDoc,
  StartTemplatesDoc,
} from "@/features/docs/content/start";
import { buildDocsGithubIssueUrl, docsPagePath } from "@/features/docs/lib/docs-github-issue";
import { GuideProductMark } from "@/features/guide/components/GuideRichText";

const DOCS_INDEX = "/start/docs";

const startDocsContent: Record<string, () => ReactNode> = {
  introduction: () => <StartIntroductionDoc />,
  installation: () => <StartInstallationDoc />,
  cli: () => <StartCliDoc />,
  templates: () => <StartTemplatesDoc />,
  scripts: () => <StartScriptsDoc />,
  i18n: () => <StartI18nDoc />,
};

type StartDocsPageProps = {
  slug: string;
};

export async function StartDocsPage({ slug }: StartDocsPageProps) {
  const t = await getTranslations("DocsStart");
  const tDocs = await getTranslations("Docs");
  const page = getStartDocsPage(slug, t);
  const sections = getStartDocsNav(t);
  const render = startDocsContent[slug];

  if (!page || !render) {
    return null;
  }

  const product = getProduct("start");
  const githubIssueHref = buildDocsGithubIssueUrl({
    githubRepo: product.github,
    pageTitle: page.title,
    pagePath: docsPagePath(DOCS_INDEX, slug),
    labels: {
      page: tDocs("issuePage"),
      problem: tDocs("issueProblem"),
      comment: tDocs("issueComment"),
    },
  });

  return (
    <DocsLayout
      sections={sections}
      docsIndexHref={DOCS_INDEX}
      slug={slug}
      productLabel={
        <GuideProductMark id="start" linked={false}>
          Start
        </GuideProductMark>
      }
      headings={page.headings}
      githubIssueHref={githubIssueHref}
    >
      <DocsMobileNav sections={sections} docsIndexHref={DOCS_INDEX} />
      {render()}
    </DocsLayout>
  );
}
