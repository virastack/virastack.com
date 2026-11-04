import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { getProduct } from "@/config/products.config";

import { buildDocsGithubIssueUrl, docsPagePath } from "@/lib/docs-github-issue";

import { DocsLayout } from "@/features/docs/components/DocsLayout";
import { getAddressDocsNav, getAddressDocsPage } from "@/features/docs/config/address-docs.config";
import { AddressDataDoc } from "@/features/docs/content/address/AddressDataDoc";
import { AddressHelpersDoc } from "@/features/docs/content/address/AddressHelpersDoc";
import { AddressIntroductionDoc } from "@/features/docs/content/address/AddressIntroductionDoc";
import { AddressPostalCodeDoc } from "@/features/docs/content/address/AddressPostalCodeDoc";
import { AddressReactHookFormDoc } from "@/features/docs/content/address/AddressReactHookFormDoc";
import { AddressServerDoc } from "@/features/docs/content/address/AddressServerDoc";
import { AddressTypesDoc } from "@/features/docs/content/address/AddressTypesDoc";
import { AddressUiLibrariesDoc } from "@/features/docs/content/address/AddressUiLibrariesDoc";
import { AddressUseViraAddressDoc } from "@/features/docs/content/address/AddressUseViraAddressDoc";

const DOCS_INDEX = "/address/docs";

const addressDocsContent: Record<string, () => ReactNode> = {
  introduction: () => <AddressIntroductionDoc />,
  "use-vira-address": () => <AddressUseViraAddressDoc />,
  "react-hook-form": () => <AddressReactHookFormDoc />,
  "postal-code": () => <AddressPostalCodeDoc />,
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
