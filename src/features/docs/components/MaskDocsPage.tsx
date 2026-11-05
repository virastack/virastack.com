import type { ReactNode } from "react";

import { getLocale, getMessages, getTranslations } from "next-intl/server";

import { getProduct } from "@/config/products.config";

import { buildDocsGithubIssueUrl, docsPagePath } from "@/lib/docs-github-issue";

import { DocsLayout } from "@/features/docs/components/DocsLayout";
import { docsProducts, getDocsVersionContent } from "@/features/docs/config/docs-products";
import { MaskBanksDoc } from "@/features/docs/content/mask/MaskBanksDoc";
import { MaskCustomMaskDoc } from "@/features/docs/content/mask/MaskCustomMaskDoc";
import { MaskHelpersDoc } from "@/features/docs/content/mask/MaskHelpersDoc";
import { MaskIntroductionDoc } from "@/features/docs/content/mask/MaskIntroductionDoc";
import { MaskServerDoc } from "@/features/docs/content/mask/MaskServerDoc";
import { MaskTestingDoc } from "@/features/docs/content/mask/MaskTestingDoc";
import { MaskTypesDoc } from "@/features/docs/content/mask/MaskTypesDoc";
import { MaskUiLibrariesDoc } from "@/features/docs/content/mask/MaskUiLibrariesDoc";
import { MaskUpgradeDoc } from "@/features/docs/content/mask/MaskUpgradeDoc";
import { MaskUseViraMaskDoc } from "@/features/docs/content/mask/MaskUseViraMaskDoc";
import { MaskValidationDoc } from "@/features/docs/content/mask/MaskValidationDoc";
import { MaskV1CustomMaskDoc } from "@/features/docs/content/mask/v1/MaskV1CustomMaskDoc";
import { MaskV1HelpersDoc } from "@/features/docs/content/mask/v1/MaskV1HelpersDoc";
import { MaskV1IntroductionDoc } from "@/features/docs/content/mask/v1/MaskV1IntroductionDoc";
import { MaskV1TypesDoc } from "@/features/docs/content/mask/v1/MaskV1TypesDoc";
import { MaskV1UiLibrariesDoc } from "@/features/docs/content/mask/v1/MaskV1UiLibrariesDoc";
import { MaskV1UseViraMaskDoc } from "@/features/docs/content/mask/v1/MaskV1UseViraMaskDoc";
import { MaskV1ValidationDoc } from "@/features/docs/content/mask/v1/MaskV1ValidationDoc";
import { getDocsVersionLinks } from "@/features/docs/lib/docs-versions";

const UPGRADE_HREF = "/mask/docs/upgrade";

const maskDocsContent: Record<string, Record<string, () => ReactNode>> = {
  latest: {
    introduction: () => <MaskIntroductionDoc />,
    upgrade: () => <MaskUpgradeDoc />,
    "use-vira-mask": () => <MaskUseViraMaskDoc />,
    "custom-mask": () => <MaskCustomMaskDoc />,
    validation: () => <MaskValidationDoc />,
    server: () => <MaskServerDoc />,
    helpers: () => <MaskHelpersDoc />,
    banks: () => <MaskBanksDoc />,
    testing: () => <MaskTestingDoc />,
    types: () => <MaskTypesDoc />,
    "ui-libraries": () => <MaskUiLibrariesDoc />,
  },
  v1: {
    introduction: () => <MaskV1IntroductionDoc />,
    "use-vira-mask": () => <MaskV1UseViraMaskDoc />,
    "custom-mask": () => <MaskV1CustomMaskDoc />,
    validation: () => <MaskV1ValidationDoc />,
    helpers: () => <MaskV1HelpersDoc />,
    types: () => <MaskV1TypesDoc />,
    "ui-libraries": () => <MaskV1UiLibrariesDoc />,
  },
};

type MaskDocsPageProps = {
  slug: string;
  /** Archived version id (e.g. "v1"); omit for the latest version. */
  versionId?: string;
};

export async function MaskDocsPage({ slug, versionId }: MaskDocsPageProps) {
  const docs = docsProducts.mask;
  const content = getDocsVersionContent(docs, versionId);
  const version = docs.versions.find((item) => (versionId ? item.id === versionId : item.latest));
  const texts = content.texts(await getMessages(), await getLocale());
  const tDocs = await getTranslations("Docs");
  const page = texts.getPage(slug);
  const render = maskDocsContent[versionId ?? "latest"]?.[slug];

  if (!page || !version || !render) {
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
