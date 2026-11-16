import { getLocale, getTranslations } from "next-intl/server";

import { getProduct } from "@/config/products.config";

import { buildDocsGithubIssueUrl, docsPagePath } from "@/lib/docs-github-issue";

import { DocsLayout } from "@/features/docs/components/DocsLayout";
import { DocsMdx } from "@/features/docs/components/DocsMdx";
import {
  getPasswordDocsNav,
  getPasswordDocsPage,
} from "@/features/docs/config/password-docs.config";
import { passwordDocsContent } from "@/features/docs/content/password/password-docs-content";
import { readDocsMdxHeadings } from "@/features/docs/lib/docs-mdx-source";

const DOCS_INDEX = "/password/docs";

type PasswordDocsPageProps = {
  slug: string;
};

export async function PasswordDocsPage({ slug }: PasswordDocsPageProps) {
  const t = await getTranslations("DocsPassword");
  const tDocs = await getTranslations("Docs");
  const page = getPasswordDocsPage(slug, t);
  const pageContent = passwordDocsContent[slug];

  if (!page || !pageContent) {
    return null;
  }

  const githubIssueHref = buildDocsGithubIssueUrl({
    githubRepo: getProduct("password").github,
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
      sections={getPasswordDocsNav(t)}
      docsIndexHref={DOCS_INDEX}
      slug={slug}
      headings={readDocsMdxHeadings({ product: "password", locale: await getLocale(), slug })}
      githubIssueHref={githubIssueHref}
    >
      <DocsMdx content={pageContent} />
    </DocsLayout>
  );
}
