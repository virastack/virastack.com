import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { getProduct, isProductId } from "@/config/products.config";
import { siteConfig } from "@/config/site.config";

import { GuidePlayPage } from "@/features/guide";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; product: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale, product: "guide" }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, product: productParam } = await params;

  if (!isProductId(productParam) || productParam !== "guide") {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "Products" });
  const title = `${siteConfig.name} ${t("guideName")}`;
  const description = t("guideDesc");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/guide/play`,
    },
  };
}

export default async function GuidePlayRoute({ params }: PageProps) {
  const { locale, product: productParam } = await params;
  setRequestLocale(locale);

  if (!isProductId(productParam) || productParam !== "guide") {
    notFound();
  }

  // Ensure product exists in catalog
  getProduct("guide");

  return <GuidePlayPage />;
}
