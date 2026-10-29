import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { getProduct, isProductId } from "@/config/products.config";

import { buildAlternates, localeUrl } from "@/lib/canonical";
import { buildOgImageMetadata } from "@/lib/og";
import { buildDocsSeoTitle } from "@/lib/seo-title";

import {
  getMaskDocsPage,
  getMaskExample,
  getPasswordDocsPage,
  getPasswordExample,
  maskExampleIds,
  passwordExampleIds,
} from "@/features/docs";
import { DocsJsonLd } from "@/features/docs/components/DocsJsonLd";
import { MaskExamplesPage } from "@/features/mask/components/MaskExamplesPage";
import { PasswordExamplesPage } from "@/features/password/components/PasswordExamplesPage";
import { routing } from "@/i18n/routing";

const EXAMPLES_PRODUCTS = ["mask", "password"] as const;

type ExamplesProductId = (typeof EXAMPLES_PRODUCTS)[number];

type PageProps = {
  params: Promise<{ locale: string; product: string; id: string }>;
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
  return routing.locales.flatMap((locale) => [
    ...maskExampleIds.map((id) => ({ locale, product: "mask" as const, id })),
    ...passwordExampleIds.map((id) => ({ locale, product: "password" as const, id })),
  ]);
}

const productLabels = { mask: "Mask", password: "Password" } as const;

/** The example's docs page, or `undefined` when `id` is not an example of that product. */
async function getExamplePage(locale: string, product: ExamplesProductId, id: string) {
  if (product === "mask") {
    const t = await getTranslations({ locale, namespace: "DocsMask" });
    return getMaskExample(id, t) ? getMaskDocsPage(`examples/${id}`, t) : undefined;
  }

  const t = await getTranslations({ locale, namespace: "DocsPassword" });
  return getPasswordExample(id, t) ? getPasswordDocsPage(`examples/${id}`, t) : undefined;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, product: productParam, id } = await params;

  if (!isProductId(productParam) || !isExamplesProductId(productParam)) {
    return {};
  }

  const product = getProduct(productParam);
  const path = `${product.href}/examples/${id}`;
  const page = await getExamplePage(locale, productParam, id);
  if (!page) return {};

  const title = await buildDocsSeoTitle({
    locale,
    productLabel: productLabels[productParam],
    pageTitle: page.title,
    kind: "example",
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
  const { locale, product: productParam, id } = await params;
  setRequestLocale(locale);

  if (!isProductId(productParam) || !isExamplesProductId(productParam)) {
    notFound();
  }

  const page = await getExamplePage(locale, productParam, id);
  if (!page) notFound();

  const product = getProduct(productParam);

  return (
    <main className="flex-1">
      <DocsJsonLd
        locale={locale}
        productLabel={productLabels[productParam]}
        productHref={product.href}
        section="examples"
        sectionPath={`${product.href}/examples`}
        pageTitle={page.title}
        description={page.description}
        path={`${product.href}/examples/${id}`}
      />
      {productParam === "mask" ? (
        <MaskExamplesPage exampleId={id} />
      ) : (
        <PasswordExamplesPage exampleId={id} />
      )}
    </main>
  );
}
