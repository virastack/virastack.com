import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { getProduct } from "@/config/products.config";

import { DocsLayout } from "@/features/docs/components/DocsLayout";
import { docsProducts, getDocsVersionContent } from "@/features/docs/config/docs-products";
import {
  MaskCustomMaskDoc,
  MaskHelpersDoc,
  MaskIntroductionDoc,
  MaskServerDoc,
  MaskTypesDoc,
  MaskUiLibrariesDoc,
  MaskUpgradeDoc,
  MaskUseViraMaskDoc,
  MaskValidationDoc,
} from "@/features/docs/content/mask";
import {
  MaskV1CustomMaskDoc,
  MaskV1HelpersDoc,
  MaskV1IntroductionDoc,
  MaskV1TypesDoc,
  MaskV1UiLibrariesDoc,
  MaskV1UseViraMaskDoc,
  MaskV1ValidationDoc,
} from "@/features/docs/content/mask/v1";
import { buildDocsGithubIssueUrl, docsPagePath } from "@/features/docs/lib/docs-github-issue";
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
  const t = await getTranslations(content.messageNamespace);
  const tDocs = await getTranslations("Docs");
  const page = content.getPage(slug, t);
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
