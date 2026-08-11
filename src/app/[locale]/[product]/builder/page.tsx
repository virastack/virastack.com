import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { getProduct, isProductId } from "@/config/products.config";
import { siteConfig } from "@/config/site.config";

import { buildOgImageMetadata } from "@/lib/og";

import { StartBuilderPage } from "@/features/start";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; product: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale, product: "start" }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, product: productParam } = await params;

  if (!isProductId(productParam) || productParam !== "start") {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "StartBuilder" });
  const product = getProduct("start");
  const title = `${t("title")} · ${siteConfig.name} Start`;
  const description = t("description");
  const path = `${product.href}/builder`;
  const og = buildOgImageMetadata({
    title: t("title"),
    description,
    product: "start",
    path,
  });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${path}`,
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

  if (!isProductId(productParam) || productParam !== "start") {
    notFound();
  }

  return (
    <main className="flex-1">
      <StartBuilderPage />
    </main>
  );
}
