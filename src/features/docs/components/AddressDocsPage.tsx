import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { getProduct } from "@/config/products.config";

import { DocsLayout } from "@/features/docs/components/DocsLayout";
import { getAddressDocsNav, getAddressDocsPage } from "@/features/docs/config/address-docs.config";
import {
  AddressDataDoc,
  AddressHelpersDoc,
  AddressIntroductionDoc,
  AddressReactHookFormDoc,
  AddressServerDoc,
  AddressTypesDoc,
  AddressUiLibrariesDoc,
  AddressUseViraAddressDoc,
} from "@/features/docs/content/address";
import { buildDocsGithubIssueUrl, docsPagePath } from "@/features/docs/lib/docs-github-issue";

const DOCS_INDEX = "/address/docs";

const addressDocsContent: Record<string, () => ReactNode> = {
  introduction: () => <AddressIntroductionDoc />,
  "use-vira-address": () => <AddressUseViraAddressDoc />,
  "react-hook-form": () => <AddressReactHookFormDoc />,
  "ui-libraries": () => <AddressUiLibrariesDoc />,
  server: () => <AddressServerDoc />,
  data: () => <AddressDataDoc />,
  helpers: () => <AddressHelpersDoc />,
  types: () => <AddressTypesDoc />,
};

type AddressDocsPageProps = {
  slug: string;
};

export async function AddressDocsPage({ slug }: AddressDocsPageProps) {
  const t = await getTranslations("DocsAddress");
  const tDocs = await getTranslations("Docs");
  const page = getAddressDocsPage(slug, t);
  const render = addressDocsContent[slug];

  if (!page || !render) {
    return null;
  }

  const githubIssueHref = buildDocsGithubIssueUrl({
    githubRepo: getProduct("address").github,
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
      sections={getAddressDocsNav(t)}
      docsIndexHref={DOCS_INDEX}
      slug={slug}
      headings={page.headings}
      githubIssueHref={githubIssueHref}
    >
      {render()}
    </DocsLayout>
  );
}
