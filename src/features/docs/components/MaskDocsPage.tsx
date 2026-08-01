import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { getProduct } from "@/config/products.config";

import { DocsLayout } from "@/features/docs/components/DocsLayout";
import { getMaskDocsNav, getMaskDocsPage } from "@/features/docs/config/mask-docs.config";
import {
  MaskCustomMaskDoc,
  MaskExampleDetailDoc,
  MaskExamplesDoc,
  MaskHelpersDoc,
  MaskIntroductionDoc,
  MaskTypesDoc,
  MaskUiLibrariesDoc,
  MaskUseViraMaskDoc,
  MaskValidationDoc,
} from "@/features/docs/content/mask";
import { buildDocsGithubIssueUrl, docsPagePath } from "@/features/docs/lib/docs-github-issue";
import { GuideProductMark } from "@/features/guide/components/GuideRichText";

const DOCS_INDEX = "/mask/docs";

const maskDocsContent: Record<string, () => ReactNode> = {
  introduction: () => <MaskIntroductionDoc />,
  "use-vira-mask": () => <MaskUseViraMaskDoc />,
  "custom-mask": () => <MaskCustomMaskDoc />,
  validation: () => <MaskValidationDoc />,
  helpers: () => <MaskHelpersDoc />,
  types: () => <MaskTypesDoc />,
  "ui-libraries": () => <MaskUiLibrariesDoc />,
  examples: () => <MaskExamplesDoc />,
};

type MaskDocsPageProps = {
  slug: string;
};

export async function MaskDocsPage({ slug }: MaskDocsPageProps) {
  const t = await getTranslations("DocsMask");
  const tDocs = await getTranslations("Docs");
  const page = getMaskDocsPage(slug, t);
  const sections = getMaskDocsNav(t);

  let content: ReactNode = null;
  if (slug.startsWith("examples/") && slug !== "examples") {
    const id = slug.slice("examples/".length);
    content = <MaskExampleDetailDoc id={id} />;
  } else {
    const render = maskDocsContent[slug];
    content = render?.() ?? null;
  }

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
      productLabel={
        <GuideProductMark id="mask" linked={false}>
          Mask
        </GuideProductMark>
      }
      headings={page.headings}
      githubIssueHref={githubIssueHref}
    >
      {content}
    </DocsLayout>
  );
}
