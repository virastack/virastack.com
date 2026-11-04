import type { ReactNode } from "react";

import { getLocale, getMessages, getTranslations } from "next-intl/server";

import { getProduct } from "@/config/products.config";

import { DocsLayout } from "@/features/docs/components/DocsLayout";
import { docsProducts, getDocsVersionContent } from "@/features/docs/config/docs-products";
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
import { PasswordUpgradeDoc } from "@/features/docs/content/password/PasswordUpgradeDoc";
import { PasswordUseViraPasswordDoc } from "@/features/docs/content/password/PasswordUseViraPasswordDoc";
import { PasswordV1AccessibilityDoc } from "@/features/docs/content/password/v1/PasswordV1AccessibilityDoc";
import { PasswordV1CustomizationDoc } from "@/features/docs/content/password/v1/PasswordV1CustomizationDoc";
import { PasswordV1HelpersDoc } from "@/features/docs/content/password/v1/PasswordV1HelpersDoc";
import { PasswordV1IntroductionDoc } from "@/features/docs/content/password/v1/PasswordV1IntroductionDoc";
import { PasswordV1TypesDoc } from "@/features/docs/content/password/v1/PasswordV1TypesDoc";
import { PasswordV1UiLibrariesDoc } from "@/features/docs/content/password/v1/PasswordV1UiLibrariesDoc";
import { PasswordV1UseViraPasswordDoc } from "@/features/docs/content/password/v1/PasswordV1UseViraPasswordDoc";
import { buildDocsGithubIssueUrl, docsPagePath } from "@/features/docs/lib/docs-github-issue";
import { getDocsVersionLinks } from "@/features/docs/lib/docs-versions";

const UPGRADE_HREF = "/password/docs/upgrade";

const passwordDocsContent: Record<string, Record<string, () => ReactNode>> = {
  latest: {
    introduction: () => <PasswordIntroductionDoc />,
    upgrade: () => <PasswordUpgradeDoc />,
    "use-vira-password": () => <PasswordUseViraPasswordDoc />,
    strength: () => <PasswordStrengthDoc />,
    confirm: () => <PasswordConfirmDoc />,
    "react-hook-form": () => <PasswordReactHookFormDoc />,
    accessibility: () => <PasswordAccessibilityDoc />,
    customization: () => <PasswordCustomizationDoc />,
    server: () => <PasswordServerDoc />,
    pwned: () => <PasswordPwnedDoc />,
    helpers: () => <PasswordHelpersDoc />,
    types: () => <PasswordTypesDoc />,
    "ui-libraries": () => <PasswordUiLibrariesDoc />,
  },
  v1: {
    introduction: () => <PasswordV1IntroductionDoc />,
    "use-vira-password": () => <PasswordV1UseViraPasswordDoc />,
    accessibility: () => <PasswordV1AccessibilityDoc />,
    customization: () => <PasswordV1CustomizationDoc />,
    helpers: () => <PasswordV1HelpersDoc />,
    types: () => <PasswordV1TypesDoc />,
    "ui-libraries": () => <PasswordV1UiLibrariesDoc />,
  },
};

type PasswordDocsPageProps = {
  slug: string;
  /** Archived version id (e.g. "v1"); omit for the latest version. */
  versionId?: string;
};

export async function PasswordDocsPage({ slug, versionId }: PasswordDocsPageProps) {
  const docs = docsProducts.password;
  const content = getDocsVersionContent(docs, versionId);
  const version = docs.versions.find((item) => (versionId ? item.id === versionId : item.latest));
  const texts = content.texts(await getMessages(), await getLocale());
  const tDocs = await getTranslations("Docs");
  const page = texts.getPage(slug);
  const render = passwordDocsContent[versionId ?? "latest"]?.[slug];

  if (!page || !version || !render) {
    return null;
  }

  const githubIssueHref = buildDocsGithubIssueUrl({
    githubRepo: getProduct("password").github,
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
      headings={page.headings}
      githubIssueHref={githubIssueHref}
      versions={{
        current: version.id,
        links: getDocsVersionLinks(docs, slug),
        upgradeHref: UPGRADE_HREF,
      }}
    >
      {render()}
    </DocsLayout>
  );
}
