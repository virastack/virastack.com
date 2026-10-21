import { getTranslations } from "next-intl/server";

import { getProduct } from "@/config/products.config";

import { DocsLayout } from "@/features/docs/components/DocsLayout";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { docsProducts, getDocsVersionContent } from "@/features/docs/config/docs-products";
import { buildDocsGithubIssueUrl, docsPagePath } from "@/features/docs/lib/docs-github-issue";
import { getDocsVersionLinks } from "@/features/docs/lib/docs-versions";

const UPGRADE_HREF = "/ai/docs/upgrade";

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

  if (!page || !version) {
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
      <DocsPageHeader title={page.title} description={page.description} />
      <DocsProse>
        <p>{t("placeholder")}</p>
      </DocsProse>
    </DocsLayout>
  );
}
