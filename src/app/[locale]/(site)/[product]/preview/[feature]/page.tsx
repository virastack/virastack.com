import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { siteConfig } from "@/config/site.config";

import {
  demoFeatures,
  FeatureDemoPage,
  isDemoFeature,
} from "@/features/start/components/FeatureDemoPage";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; product: string; feature: string }>;
};

/** Only the module pages' iframes open this, so it stays out of search results and the sitemap. */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    demoFeatures.map((feature) => ({ locale, product: "start", feature })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, product, feature } = await params;
  if (product !== "start" || !isDemoFeature(feature)) return {};

  const t = await getTranslations({ locale, namespace: "StartFeatureCatalog" });

  return {
    title: { absolute: `${t(`names.${feature}`)} · ${siteConfig.name} Start` },
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale, product, feature } = await params;
  setRequestLocale(locale);

  if (product !== "start" || !isDemoFeature(feature)) {
    notFound();
  }

  return <FeatureDemoPage feature={feature} />;
}
