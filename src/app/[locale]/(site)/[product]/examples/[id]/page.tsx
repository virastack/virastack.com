import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { getProduct, isProductId } from "@/config/products.config";
import { siteConfig } from "@/config/site.config";

import { buildAlternates, localeUrl } from "@/lib/canonical";
import { buildOgImageMetadata } from "@/lib/og";

import {
  getMaskDocsPage,
  getMaskExample,
  getPasswordDocsPage,
  getPasswordExample,
  maskExampleIds,
  passwordExampleIds,
} from "@/features/docs";
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, product: productParam, id } = await params;

  if (!isProductId(productParam) || !isExamplesProductId(productParam)) {
    return {};
  }

  const product = getProduct(productParam);
  const path = `${product.href}/examples/${id}`;
  const label = productParam === "mask" ? "Mask" : "Password";

  if (productParam === "mask") {
    const t = await getTranslations({ locale, namespace: "DocsMask" });
    if (!getMaskExample(id, t)) return {};
    const page = getMaskDocsPage(`examples/${id}`, t);
    if (!page) return {};

    const title = `${page.title} · ${siteConfig.name} ${label}`;
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
  if (!getPasswordExample(id, t)) return {};
  const page = getPasswordDocsPage(`examples/${id}`, t);
  if (!page) return {};

  const title = `${page.title} · ${siteConfig.name} ${label}`;
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
  const { locale, product: productParam, id } = await params;
  setRequestLocale(locale);

  if (!isProductId(productParam) || !isExamplesProductId(productParam)) {
    notFound();
  }

  if (productParam === "mask") {
    const t = await getTranslations("DocsMask");
    if (!getMaskExample(id, t)) notFound();

    return (
      <main className="flex-1">
        <MaskExamplesPage exampleId={id} />
      </main>
    );
  }

  const t = await getTranslations("DocsPassword");
  if (!getPasswordExample(id, t)) notFound();

  return (
    <main className="flex-1">
      <PasswordExamplesPage exampleId={id} />
    </main>
  );
}
