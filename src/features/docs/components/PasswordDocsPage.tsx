import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { getProduct } from "@/config/products.config";

import { buildDocsGithubIssueUrl, docsPagePath } from "@/lib/docs-github-issue";

import { DocsLayout } from "@/features/docs/components/DocsLayout";
import {
  getPasswordDocsNav,
  getPasswordDocsPage,
} from "@/features/docs/config/password-docs.config";
import { PasswordAccessibilityDoc } from "@/features/docs/content/password/PasswordAccessibilityDoc";
import { PasswordConfirmDoc } from "@/features/docs/content/password/PasswordConfirmDoc";
import { PasswordCustomizationDoc } from "@/features/docs/content/password/PasswordCustomizationDoc";
import { PasswordHelpersDoc } from "@/features/docs/content/password/PasswordHelpersDoc";
import { PasswordIntroductionDoc } from "@/features/docs/content/password/PasswordIntroductionDoc";
import { PasswordPwnedDoc } from "@/features/docs/content/password/PasswordPwnedDoc";
import { PasswordReactHookFormDoc } from "@/features/docs/content/password/PasswordReactHookFormDoc";
import { PasswordServerDoc } from "@/features/docs/content/password/PasswordServerDoc";
import { PasswordStrengthDoc } from "@/features/docs/content/password/PasswordStrengthDoc";
import { PasswordTypesDoc } from "@/features/docs/content/password/PasswordTypesDoc";
import { PasswordUiLibrariesDoc } from "@/features/docs/content/password/PasswordUiLibrariesDoc";
import { PasswordUseViraPasswordDoc } from "@/features/docs/content/password/PasswordUseViraPasswordDoc";

const DOCS_INDEX = "/password/docs";

const passwordDocsContent: Record<string, () => ReactNode> = {
  introduction: () => <PasswordIntroductionDoc />,
  "use-vira-password": () => <PasswordUseViraPasswordDoc />,
  strength: () => <PasswordStrengthDoc />,
  confirm: () => <PasswordConfirmDoc />,
  "react-hook-form": () => <PasswordReactHookFormDoc />,
  accessibility: () => <PasswordAccessibilityDoc />,
  customization: () => <PasswordCustomizationDoc />,
  "ui-libraries": () => <PasswordUiLibrariesDoc />,
  server: () => <PasswordServerDoc />,
  pwned: () => <PasswordPwnedDoc />,
  helpers: () => <PasswordHelpersDoc />,
  types: () => <PasswordTypesDoc />,
};

type PasswordDocsPageProps = {
  slug: string;
};

export async function PasswordDocsPage({ slug }: PasswordDocsPageProps) {
  const t = await getTranslations("DocsPassword");
  const tDocs = await getTranslations("Docs");
  const page = getPasswordDocsPage(slug, t);
  const render = passwordDocsContent[slug];

  if (!page || !render) {
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
      headings={page.headings}
      githubIssueHref={githubIssueHref}
    >
      {render()}
    </DocsLayout>
  );
}
