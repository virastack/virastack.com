import { getLocale, getMessages, getTranslations } from "next-intl/server";

import { getProduct } from "@/config/products.config";

import { buildDocsGithubIssueUrl, docsPagePath } from "@/lib/docs-github-issue";

import { DocsLayout } from "@/features/docs/components/DocsLayout";
import { DocsMdx } from "@/features/docs/components/DocsMdx";
import { docsProducts, getDocsVersionContent } from "@/features/docs/config/docs-products";
import { startDocsContent } from "@/features/docs/content/start/start-docs-content";
import { startDocsV1Content } from "@/features/docs/content/start/v1/start-docs-v1-content";
import { readDocsMdxHeadings } from "@/features/docs/lib/docs-mdx-source";
import { getDocsVersionLinks } from "@/features/docs/lib/docs-versions";

/** The note's migration section is the upgrade guide from 1.x. */
const UPGRADE_HREF = "/releases#start-2-0-0";

type StartDocsPageProps = {
  slug: string;
  /** Archived version id (e.g. "v1"); omit for the latest version. */
  versionId?: string;
};

export async function StartDocsPage({ slug, versionId }: StartDocsPageProps) {
  const docs = docsProducts.start;
  const content = getDocsVersionContent(docs, versionId);
  const version = docs.versions.find((item) => (versionId ? item.id === versionId : item.latest));
  const locale = await getLocale();
  const texts = content.texts(await getMessages(), locale);
  const tDocs = await getTranslations("Docs");
  const page = texts.getPage(slug);
  const pageContent = (versionId === "v1" ? startDocsV1Content : startDocsContent)[slug];

  if (!page || !version || !pageContent) {
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
      headings={readDocsMdxHeadings({ product: "start", version: versionId, locale, slug })}
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
