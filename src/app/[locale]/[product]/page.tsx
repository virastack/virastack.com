import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { getProduct, isProductId, products } from "@/config/products.config";
import { siteConfig } from "@/config/site.config";

import { ProductPage } from "@/features/product";
import { routing } from "@/i18n/routing";

const productNameKeys = {
  start: "startName",
  ai: "aiName",
  mask: "maskName",
  password: "passwordName",
  guide: "guideName",
} as const;

const productDescKeys = {
  start: "startDesc",
  ai: "aiDesc",
  mask: "maskDesc",
  password: "passwordDesc",
  guide: "guideDesc",
} as const;

type PageProps = {
  params: Promise<{ locale: string; product: string }>;
};

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
  const title = `${siteConfig.name} ${name}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${product.href}`,
    },
    twitter: {
      title,
      description,
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

  return (
    <main className="flex-1">
      <ProductPage product={product} />
    </main>
  );
}
