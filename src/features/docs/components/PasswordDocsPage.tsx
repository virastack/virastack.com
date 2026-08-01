import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { getProduct } from "@/config/products.config";

import { DocsLayout } from "@/features/docs/components/DocsLayout";
import { DocsMobileNav } from "@/features/docs/components/DocsMobileNav";
import {
  getPasswordDocsNav,
  getPasswordDocsPage,
} from "@/features/docs/config/password-docs.config";
import {
  PasswordAccessibilityDoc,
  PasswordCustomizationDoc,
  PasswordExampleDetailDoc,
  PasswordExamplesDoc,
  PasswordHelpersDoc,
  PasswordIntroductionDoc,
  PasswordTypesDoc,
  PasswordUiLibrariesDoc,
  PasswordUseViraPasswordDoc,
} from "@/features/docs/content/password";
import { buildDocsGithubIssueUrl, docsPagePath } from "@/features/docs/lib/docs-github-issue";
import { GuideProductMark } from "@/features/guide/components/GuideRichText";

const DOCS_INDEX = "/password/docs";

const passwordDocsContent: Record<string, () => ReactNode> = {
  introduction: () => <PasswordIntroductionDoc />,
  "use-vira-password": () => <PasswordUseViraPasswordDoc />,
  accessibility: () => <PasswordAccessibilityDoc />,
  customization: () => <PasswordCustomizationDoc />,
  helpers: () => <PasswordHelpersDoc />,
  types: () => <PasswordTypesDoc />,
  "ui-libraries": () => <PasswordUiLibrariesDoc />,
  examples: () => <PasswordExamplesDoc />,
};

type PasswordDocsPageProps = {
  slug: string;
};

export async function PasswordDocsPage({ slug }: PasswordDocsPageProps) {
  const t = await getTranslations("DocsPassword");
  const tDocs = await getTranslations("Docs");
  const page = getPasswordDocsPage(slug, t);
  const sections = getPasswordDocsNav(t);

  let content: ReactNode = null;
  if (slug.startsWith("examples/") && slug !== "examples") {
    const id = slug.slice("examples/".length);
    content = <PasswordExampleDetailDoc id={id} />;
  } else {
    const render = passwordDocsContent[slug];
    content = render?.() ?? null;
  }

  if (!page || !content) {
    return null;
  }

  const product = getProduct("password");
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
        <GuideProductMark id="password" linked={false}>
          Password
        </GuideProductMark>
      }
      headings={page.headings}
      githubIssueHref={githubIssueHref}
    >
      <DocsMobileNav sections={sections} docsIndexHref={DOCS_INDEX} />
      {content}
    </DocsLayout>
  );
}
