import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { getProduct, isProductId } from "@/config/products.config";

import { buildAlternates, localeUrl } from "@/lib/canonical";
import { buildOgImageMetadata } from "@/lib/og";
import { buildDocsSeoTitle } from "@/lib/seo-title";

import { getMaskDocsPage, getPasswordDocsPage } from "@/features/docs";
import { DocsJsonLd } from "@/features/docs/components/DocsJsonLd";
import { MaskExamplesPage } from "@/features/mask/components/MaskExamplesPage";
import { PasswordExamplesPage } from "@/features/password/components/PasswordExamplesPage";
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

const productLabels = { mask: "Mask", password: "Password" } as const;

function getExamplesIndexPage(product: ExamplesProductId, t: (key: string) => string) {
  return product === "mask" ? getMaskDocsPage("examples", t) : getPasswordDocsPage("examples", t);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, product: productParam } = await params;

  if (!isProductId(productParam) || !isExamplesProductId(productParam)) {
    return {};
  }

  const product = getProduct(productParam);
  const path = `${product.href}/examples`;
  const t = await getTranslations({
    locale,
    namespace: productParam === "mask" ? "DocsMask" : "DocsPassword",
  });
  const page = getExamplesIndexPage(productParam, t);
  if (!page) return {};

  const title = await buildDocsSeoTitle({
    locale,
    productLabel: productLabels[productParam],
    pageTitle: page.title,
  });
  const description = page.description;
  const og = buildOgImageMetadata({
    title: page.title,
    description,
    product: productParam,
    path,
  });

  return {
    title: { absolute: title },
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

  const product = getProduct(productParam);
  const path = `${product.href}/examples`;
  const t = await getTranslations({
    locale,
    namespace: productParam === "mask" ? "DocsMask" : "DocsPassword",
  });
  const page = getExamplesIndexPage(productParam, t);

  return (
    <main className="flex-1">
      {page ? (
        <DocsJsonLd
          locale={locale}
          productLabel={productLabels[productParam]}
          productHref={product.href}
          section="examples"
          sectionPath={path}
          pageTitle={page.title}
          description={page.description}
          path={path}
        />
      ) : null}
      {productParam === "mask" ? <MaskExamplesPage /> : <PasswordExamplesPage />}
    </main>
  );
}
