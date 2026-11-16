import { getLocale, getTranslations } from "next-intl/server";

import { getProduct } from "@/config/products.config";

import { buildDocsGithubIssueUrl, docsPagePath } from "@/lib/docs-github-issue";

import { DocsLayout } from "@/features/docs/components/DocsLayout";
import { DocsMdx } from "@/features/docs/components/DocsMdx";
import { getAddressDocsNav, getAddressDocsPage } from "@/features/docs/config/address-docs.config";
import { addressDocsContent } from "@/features/docs/content/address/address-docs-content";
import { readDocsMdxHeadings } from "@/features/docs/lib/docs-mdx-source";

const DOCS_INDEX = "/address/docs";

type AddressDocsPageProps = {
  slug: string;
};

export async function AddressDocsPage({ slug }: AddressDocsPageProps) {
  const t = await getTranslations("DocsAddress");
  const tDocs = await getTranslations("Docs");
  const page = getAddressDocsPage(slug, t);
  const pageContent = addressDocsContent[slug];

  if (!page || !pageContent) {
    return null;
  }

  const githubIssueHref = buildDocsGithubIssueUrl({
    githubRepo: getProduct("address").github,
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
      sections={getAddressDocsNav(t)}
      docsIndexHref={DOCS_INDEX}
      slug={slug}
      headings={readDocsMdxHeadings({ product: "address", locale: await getLocale(), slug })}
      githubIssueHref={githubIssueHref}
    >
      <DocsMdx content={pageContent} />
    </DocsLayout>
  );
}
