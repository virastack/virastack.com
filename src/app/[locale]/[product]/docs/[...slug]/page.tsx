import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { getProduct, isProductId } from "@/config/products.config";
import { siteConfig } from "@/config/site.config";

import {
  DOCS_PRODUCT_IDS,
  getDocsProduct,
  isDocsProductId,
  joinDocsSlug,
  MaskDocsPage,
  PasswordDocsPage,
  StartDocsPage,
  type DocsProductId,
} from "@/features/docs";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; product: string; slug: string[] }>;
};

function DocsProductContent({ product, slug }: { product: DocsProductId; slug: string }) {
  switch (product) {
    case "start":
      return <StartDocsPage slug={slug} />;
    case "mask":
      return <MaskDocsPage slug={slug} />;
    case "password":
      return <PasswordDocsPage slug={slug} />;
  }
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    DOCS_PRODUCT_IDS.flatMap((product) => {
      const docs = getDocsProduct(product);
      if (!docs) return [];

      return docs.slugs
        .filter((slug) => slug !== "introduction")
        .map((slug) => ({
          locale,
          product,
          slug: slug.split("/"),
        }));
    }),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, product: productParam, slug: slugSegments } = await params;
  const slug = joinDocsSlug(slugSegments);

  if (!isProductId(productParam) || !isDocsProductId(productParam)) {
    return {};
  }

  const docs = getDocsProduct(productParam);
  if (!docs || !docs.isSlug(slug)) return {};

  const t = await getTranslations({ locale, namespace: docs.messageNamespace });
  const page = docs.getPage(slug, t);
  if (!page) return {};

  const title = `${page.title} · ${siteConfig.name} ${docs.label}`;

  return {
    title,
    description: page.description,
    openGraph: {
      title,
      description: page.description,
      url: `${siteConfig.url}${docs.indexHref}/${slug}`,
    },
  };
}

export default async function DocsSlugPage({ params }: PageProps) {
  const { locale, product: productParam, slug: slugSegments } = await params;
  setRequestLocale(locale);

  const slug = joinDocsSlug(slugSegments);

  if (!isProductId(productParam) || !isDocsProductId(productParam)) {
    notFound();
  }

  const docs = getDocsProduct(productParam);
  if (!docs || !docs.isSlug(slug) || slug === "introduction") {
    notFound();
  }

  getProduct(productParam);

  return (
    <main className="flex flex-1 flex-col">
      <DocsProductContent product={productParam} slug={slug} />
    </main>
  );
}
