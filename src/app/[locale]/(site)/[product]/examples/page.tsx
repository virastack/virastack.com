import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { getProduct, isProductId } from "@/config/products.config";
import { siteConfig } from "@/config/site.config";

import { buildAlternates, localeUrl } from "@/lib/canonical";
import { buildOgImageMetadata } from "@/lib/og";

import { getMaskDocsPage, getPasswordDocsPage } from "@/features/docs";
import { MaskExamplesPage } from "@/features/mask";
import { PasswordExamplesPage } from "@/features/password";
import { routing } from "@/i18n/routing";

const EXAMPLES_PRODUCTS = ["mask", "password"] as const;

type ExamplesProductId = (typeof EXAMPLES_PRODUCTS)[number];

type PageProps = {
  params: Promise<{ locale: string; product: string }>;
};

function isExamplesProductId(value: string): value is ExamplesProductId {
  return (EXAMPLES_PRODUCTS as readonly string[]).includes(value);
}

/**
 * Params outside `generateStaticParams` must 404 at the routing layer. The
 * `(site)` group opens a streaming boundary, so a `notFound()` raised while
 * rendering lands after the 200 has already been flushed.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    EXAMPLES_PRODUCTS.map((product) => ({ locale, product })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, product: productParam } = await params;

  if (!isProductId(productParam) || !isExamplesProductId(productParam)) {
    return {};
  }

  const product = getProduct(productParam);
  const path = `${product.href}/examples`;

  if (productParam === "mask") {
    const t = await getTranslations({ locale, namespace: "DocsMask" });
    const page = getMaskDocsPage("examples", t);
    if (!page) return {};

    const title = `${page.title} · ${siteConfig.name} Mask`;
    const description = page.description;
    const og = buildOgImageMetadata({
      title: page.title,
      description,
      product: "mask",
      path,
    });

    return {
      title,
      description,
      alternates: buildAlternates(locale, path),
      openGraph: {
        title,
        description,
        url: localeUrl(locale, path),
        ...og.openGraph,
      },
      twitter: {
        title,
        description,
        ...og.twitter,
      },
    };
  }

  const t = await getTranslations({ locale, namespace: "DocsPassword" });
  const page = getPasswordDocsPage("examples", t);
  if (!page) return {};

  const title = `${page.title} · ${siteConfig.name} Password`;
  const description = page.description;
  const og = buildOgImageMetadata({
    title: page.title,
    description,
    product: "password",
    path,
  });

  return {
    title,
    description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      title,
      description,
      url: localeUrl(locale, path),
      ...og.openGraph,
    },
    twitter: {
      title,
      description,
      ...og.twitter,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale, product: productParam } = await params;
  setRequestLocale(locale);

  if (!isProductId(productParam) || !isExamplesProductId(productParam)) {
    notFound();
  }

  return (
    <main className="flex-1">
      {productParam === "mask" ? <MaskExamplesPage /> : <PasswordExamplesPage />}
    </main>
  );
}
