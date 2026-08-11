import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { getProduct } from "@/config/products.config";

import { DocsLayout } from "@/features/docs/components/DocsLayout";
import { getMaskDocsNav, getMaskDocsPage } from "@/features/docs/config/mask-docs.config";
import {
  MaskCustomMaskDoc,
  MaskHelpersDoc,
  MaskIntroductionDoc,
  MaskTypesDoc,
  MaskUiLibrariesDoc,
  MaskUseViraMaskDoc,
  MaskValidationDoc,
} from "@/features/docs/content/mask";
import { buildDocsGithubIssueUrl, docsPagePath } from "@/features/docs/lib/docs-github-issue";

const DOCS_INDEX = "/mask/docs";

const maskDocsContent: Record<string, () => ReactNode> = {
  introduction: () => <MaskIntroductionDoc />,
  "use-vira-mask": () => <MaskUseViraMaskDoc />,
  "custom-mask": () => <MaskCustomMaskDoc />,
  validation: () => <MaskValidationDoc />,
  helpers: () => <MaskHelpersDoc />,
  types: () => <MaskTypesDoc />,
  "ui-libraries": () => <MaskUiLibrariesDoc />,
};

type MaskDocsPageProps = {
  slug: string;
};

export async function MaskDocsPage({ slug }: MaskDocsPageProps) {
  const t = await getTranslations("DocsMask");
  const tDocs = await getTranslations("Docs");
  const page = getMaskDocsPage(slug, t);
  const sections = getMaskDocsNav(t);
  const render = maskDocsContent[slug];
  const content = render?.() ?? null;

  if (!page || !content) {
    return null;
  }

  const product = getProduct("mask");
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
      headings={page.headings}
      githubIssueHref={githubIssueHref}
    >
      {content}
    </DocsLayout>
  );
}
