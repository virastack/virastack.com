import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { getProduct, isProductId } from "@/config/products.config";
import { siteConfig } from "@/config/site.config";

import { buildAlternates, localeUrl } from "@/lib/canonical";
import { buildOgImageMetadata } from "@/lib/og";

import {
  AiDocsPage,
  DOCS_PRODUCT_IDS,
  getDocsProduct,
  isDocsProductId,
  MaskDocsPage,
  PasswordDocsPage,
  StartDocsPage,
  type DocsProductId,
} from "@/features/docs";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; product: string }>;
};

function DocsProductContent({ product, slug }: { product: DocsProductId; slug: string }) {
  switch (product) {
    case "start":
      return <StartDocsPage slug={slug} />;
    case "ai":
      return <AiDocsPage slug={slug} />;
    case "mask":
      return <MaskDocsPage slug={slug} />;
    case "password":
      return <PasswordDocsPage slug={slug} />;
  }
}

/**
 * Params outside `generateStaticParams` must 404 at the routing layer. The
 * `(site)` group opens a streaming boundary, so a `notFound()` raised while
 * rendering lands after the 200 has already been flushed.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    DOCS_PRODUCT_IDS.map((product) => ({ locale, product })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, product: productParam } = await params;

  if (!isProductId(productParam) || !isDocsProductId(productParam)) {
    return {};
  }

  const docs = getDocsProduct(productParam);
  if (!docs) return {};

  const t = await getTranslations({ locale, namespace: docs.messageNamespace });
  const page = docs.getPage("introduction", t);
  if (!page) return {};

  const title = `${page.title} · ${siteConfig.name} ${docs.label}`;
  const description = page.description;
  const og = buildOgImageMetadata({
    title: page.title,
    description,
    product: productParam,
    path: docs.indexHref,
  });

  return {
    title,
    description,
    alternates: buildAlternates(locale, docs.indexHref),
    openGraph: {
      title,
      description,
      url: localeUrl(locale, docs.indexHref),
      ...og.openGraph,
    },
    twitter: og.twitter,
  };
}

export default async function DocsIndexPage({ params }: PageProps) {
  const { locale, product: productParam } = await params;
  setRequestLocale(locale);

  if (!isProductId(productParam) || !isDocsProductId(productParam)) {
    notFound();
  }

  const docs = getDocsProduct(productParam);
  if (!docs || !docs.slugs.includes("introduction")) {
    notFound();
  }

  getProduct(productParam);

  return (
    <main className="flex flex-1 flex-col">
      <DocsProductContent product={productParam} slug="introduction" />
    </main>
  );
}
