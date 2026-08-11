import { getTranslations } from "next-intl/server";

import { getProduct } from "@/config/products.config";

import { DocsLayout } from "@/features/docs/components/DocsLayout";
import {
  getMaskDocsPage,
  getMaskExample,
  getMaskExamplesNav,
} from "@/features/docs/config/mask-docs.config";
import { MaskExampleDetailDoc, MaskExamplesDoc } from "@/features/docs/content/mask";
import { buildDocsGithubIssueUrl } from "@/features/docs/lib/docs-github-issue";

const EXAMPLES_INDEX = "/mask/examples";

type MaskExamplesPageProps = {
  exampleId?: string;
};

export async function MaskExamplesPage({ exampleId }: MaskExamplesPageProps) {
  const t = await getTranslations("DocsMask");
  const tDocs = await getTranslations("Docs");
  const sections = getMaskExamplesNav(t);
  const slug = exampleId ?? "index";
  const page = exampleId
    ? getMaskDocsPage(`examples/${exampleId}`, t)
    : getMaskDocsPage("examples", t);

  if (!page) {
    return null;
  }

  if (exampleId && !getMaskExample(exampleId, t)) {
    return null;
  }

  const product = getProduct("mask");
  const pagePath = exampleId ? `${EXAMPLES_INDEX}/${exampleId}` : EXAMPLES_INDEX;
  const githubIssueHref = buildDocsGithubIssueUrl({
    githubRepo: product.github,
    pageTitle: page.title,
    pagePath,
    labels: {
      page: tDocs("issuePage"),
      problem: tDocs("issueProblem"),
      comment: tDocs("issueComment"),
    },
  });

  return (
    <DocsLayout
      sections={sections}
      docsIndexHref={EXAMPLES_INDEX}
      slug={slug}
      headings={page.headings}
      githubIssueHref={githubIssueHref}
    >
      {exampleId ? <MaskExampleDetailDoc id={exampleId} /> : <MaskExamplesDoc />}
    </DocsLayout>
  );
}
