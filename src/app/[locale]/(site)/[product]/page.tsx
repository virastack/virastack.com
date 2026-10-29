import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { getProduct, isProductId, products } from "@/config/products.config";
import { siteConfig } from "@/config/site.config";

import { buildAlternates, localeUrl } from "@/lib/canonical";
import { buildBreadcrumbJsonLd, buildSoftwareJsonLd } from "@/lib/json-ld";
import { buildOgImageMetadata } from "@/lib/og";
import { getProductSeoName } from "@/lib/seo-title";

import { JsonLd } from "@/components/shared/JsonLd";
import { PageGlow } from "@/components/shared/PageGlow";
import { ProductPage } from "@/features/product";
import { routing } from "@/i18n/routing";

const productNameKeys = {
  start: "startName",
  ai: "aiName",
  mask: "maskName",
  password: "passwordName",
  address: "addressName",
  guide: "guideName",
} as const;

const productDescKeys = {
  start: "startDesc",
  ai: "aiDesc",
  mask: "maskDesc",
  password: "passwordDesc",
  address: "addressDesc",
  guide: "guideDesc",
} as const;

type PageProps = {
  params: Promise<{ locale: string; product: string }>;
};

/**
 * Params outside `generateStaticParams` must 404 at the routing layer. The
 * `(site)` group opens a streaming boundary, so a `notFound()` raised while
 * rendering lands after the 200 has already been flushed.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    products.map((product) => ({ locale, product: product.id })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, product: productParam } = await params;

  if (!isProductId(productParam)) {
    return {};
  }

  const product = getProduct(productParam);
  const t = await getTranslations({ locale, namespace: "Products" });
  const name = t(productNameKeys[product.id]);
  const description = String(t.raw(productDescKeys[product.id])).replace(/<\/?[a-zA-Z]+>/g, "");
  const title = await getProductSeoName(locale, product.id);

  const og = buildOgImageMetadata({
    title: name,
    description,
    product: product.id,
    path: product.href,
  });

  return {
    title: { absolute: title },
    description,
    alternates: buildAlternates(locale, product.href),
    openGraph: {
      title,
      description,
      url: localeUrl(locale, product.href),
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

  if (!isProductId(productParam)) {
    notFound();
  }

  const product = getProduct(productParam);
  const t = await getTranslations({ locale, namespace: "Products" });
  const name = `${siteConfig.name} ${t(productNameKeys[product.id])}`;
  const description = String(t.raw(productDescKeys[product.id])).replace(/<\/?[a-zA-Z]+>/g, "");

  return (
    <main className="relative isolate flex-1">
      <JsonLd
        data={buildBreadcrumbJsonLd({
          locale,
          items: [{ name: siteConfig.name, path: "/" }, { name }],
        })}
      />
      {product.id !== "guide" ? (
        <JsonLd
          data={buildSoftwareJsonLd({
            locale,
            name,
            description,
            path: product.href,
            repository: product.github,
          })}
        />
      ) : null}
      <PageGlow colorClass={product.colorClass} />
      <ProductPage product={product} />
    </main>
  );
}
