import { getTranslations } from "next-intl/server";

import { getProduct } from "@/config/products.config";

import { DocsLayout } from "@/features/docs/components/DocsLayout";
import {
  getPasswordDocsPage,
  getPasswordExample,
  getPasswordExamplesNav,
} from "@/features/docs/config/password-docs.config";
import { PasswordExampleDetailDoc, PasswordExamplesDoc } from "@/features/docs/content/password";
import { buildDocsGithubIssueUrl } from "@/features/docs/lib/docs-github-issue";

const EXAMPLES_INDEX = "/password/examples";

type PasswordExamplesPageProps = {
  exampleId?: string;
};

export async function PasswordExamplesPage({ exampleId }: PasswordExamplesPageProps) {
  const t = await getTranslations("DocsPassword");
  const tDocs = await getTranslations("Docs");
  const sections = getPasswordExamplesNav(t);
  const slug = exampleId ?? "index";
  const page = exampleId
    ? getPasswordDocsPage(`examples/${exampleId}`, t)
    : getPasswordDocsPage("examples", t);

  if (!page) {
    return null;
  }

  if (exampleId && !getPasswordExample(exampleId, t)) {
    return null;
  }

  const product = getProduct("password");
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
      {exampleId ? <PasswordExampleDetailDoc id={exampleId} /> : <PasswordExamplesDoc />}
    </DocsLayout>
  );
}
