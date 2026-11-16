import { getLocale, getMessages, getTranslations } from "next-intl/server";

import { getProduct } from "@/config/products.config";

import { buildDocsGithubIssueUrl, docsPagePath } from "@/lib/docs-github-issue";

import { DocsLayout } from "@/features/docs/components/DocsLayout";
import { DocsMdx } from "@/features/docs/components/DocsMdx";
import { docsProducts, getDocsVersionContent } from "@/features/docs/config/docs-products";
import { maskDocsContent } from "@/features/docs/content/mask/mask-docs-content";
import { maskDocsV1Content } from "@/features/docs/content/mask/v1/mask-docs-v1-content";
import { readDocsMdxHeadings } from "@/features/docs/lib/docs-mdx-source";
import { getDocsVersionLinks } from "@/features/docs/lib/docs-versions";

const UPGRADE_HREF = "/mask/docs/upgrade";

type MaskDocsPageProps = {
  slug: string;
  /** Archived version id (e.g. "v1"); omit for the latest version. */
  versionId?: string;
};

export async function MaskDocsPage({ slug, versionId }: MaskDocsPageProps) {
  const docs = docsProducts.mask;
  const content = getDocsVersionContent(docs, versionId);
  const version = docs.versions.find((item) => (versionId ? item.id === versionId : item.latest));
  const locale = await getLocale();
  const texts = content.texts(await getMessages(), locale);
  const tDocs = await getTranslations("Docs");
  const page = texts.getPage(slug);
  const pageContent = (versionId === "v1" ? maskDocsV1Content : maskDocsContent)[slug];

  if (!page || !version || !pageContent) {
    return null;
  }

  const githubIssueHref = buildDocsGithubIssueUrl({
    githubRepo: getProduct("mask").github,
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
      headings={readDocsMdxHeadings({ product: "mask", version: versionId, locale, slug })}
      githubIssueHref={githubIssueHref}
      versions={{
        current: version.id,
        links: getDocsVersionLinks(docs, slug),
        upgradeHref: UPGRADE_HREF,
      }}
    >
      <DocsMdx content={pageContent} />
    </DocsLayout>
  );
}
