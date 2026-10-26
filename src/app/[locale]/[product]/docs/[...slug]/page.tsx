import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { getProduct, isProductId } from "@/config/products.config";
import { siteConfig } from "@/config/site.config";

import { buildOgImageMetadata } from "@/lib/og";

import {
  AiDocsPage,
  DOCS_PRODUCT_IDS,
  getDocsProduct,
  isDocsProductId,
  MaskDocsPage,
  PasswordDocsPage,
  resolveDocsRoute,
  StartDocsPage,
  type DocsProductId,
} from "@/features/docs";
import { docsPagePath } from "@/features/docs/lib/docs-github-issue";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; product: string; slug: string[] }>;
};

function DocsProductContent({
  product,
  slug,
  versionId,
}: {
  product: DocsProductId;
  slug: string;
  versionId?: string;
}) {
  switch (product) {
    case "start":
      return <StartDocsPage slug={slug} />;
    case "ai":
      return <AiDocsPage slug={slug} versionId={versionId} />;
    case "mask":
      return <MaskDocsPage slug={slug} />;
    case "password":
      return <PasswordDocsPage slug={slug} versionId={versionId} />;
  }
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    DOCS_PRODUCT_IDS.flatMap((product) => {
      const docs = getDocsProduct(product);
      if (!docs) return [];

      const latest = docs.slugs
        .filter((slug) => slug !== "introduction")
        .map((slug) => slug.split("/"));

      const archived = Object.entries(docs.archives).flatMap(([versionId, archive]) =>
        archive.slugs.map((slug) =>
          slug === "introduction" ? [versionId] : [versionId, ...slug.split("/")],
        ),
      );

      return [...latest, ...archived].map((slug) => ({ locale, product, slug }));
    }),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, product: productParam, slug: slugSegments } = await params;

  if (!isProductId(productParam) || !isDocsProductId(productParam)) {
    return {};
  }

  const docs = getDocsProduct(productParam);
  const route = docs ? resolveDocsRoute(docs, slugSegments) : undefined;
  if (!docs || !route) return {};

  const t = await getTranslations({ locale, namespace: route.content.messageNamespace });
  const page = route.content.getPage(route.slug, t);
  if (!page) return {};

  const title = `${page.title} · ${siteConfig.name} ${docs.label}`;
  const description = page.description;
  const path = docsPagePath(route.content.indexHref, route.slug);
  const og = buildOgImageMetadata({
    title: page.title,
    description,
    product: productParam,
    path,
  });

  return {
    title,
    description,
    ...(route.version.latest ? {} : { robots: { index: false } }),
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${path}`,
      ...og.openGraph,
    },
    twitter: og.twitter,
  };
}

export default async function DocsSlugPage({ params }: PageProps) {
  const { locale, product: productParam, slug: slugSegments } = await params;
  setRequestLocale(locale);

  if (!isProductId(productParam) || !isDocsProductId(productParam)) {
    notFound();
  }

  const docs = getDocsProduct(productParam);
  const route = docs ? resolveDocsRoute(docs, slugSegments) : undefined;
  if (!docs || !route) {
    notFound();
  }

  getProduct(productParam);

  return (
    <main className="flex flex-1 flex-col">
      <DocsProductContent
        product={productParam}
        slug={route.slug}
        versionId={route.version.latest ? undefined : route.version.id}
      />
    </main>
  );
}
