import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { getProduct } from "@/config/products.config";

import { DocsLayout } from "@/features/docs/components/DocsLayout";
import { docsProducts, getDocsVersionContent } from "@/features/docs/config/docs-products";
import {
  PasswordAccessibilityDoc,
  PasswordConfirmDoc,
  PasswordCustomizationDoc,
  PasswordHelpersDoc,
  PasswordIntroductionDoc,
  PasswordPwnedDoc,
  PasswordReactHookFormDoc,
  PasswordServerDoc,
  PasswordStrengthDoc,
  PasswordTypesDoc,
  PasswordUiLibrariesDoc,
  PasswordUpgradeDoc,
  PasswordUseViraPasswordDoc,
} from "@/features/docs/content/password";
import {
  PasswordV1AccessibilityDoc,
  PasswordV1CustomizationDoc,
  PasswordV1HelpersDoc,
  PasswordV1IntroductionDoc,
  PasswordV1TypesDoc,
  PasswordV1UiLibrariesDoc,
  PasswordV1UseViraPasswordDoc,
} from "@/features/docs/content/password/v1";
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
  const t = await getTranslations(content.messageNamespace);
  const tDocs = await getTranslations("Docs");
  const page = content.getPage(slug, t);
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
      {render()}
    </DocsLayout>
  );
}
