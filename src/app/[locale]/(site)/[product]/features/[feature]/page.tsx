import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { isFeatureCatalogLive } from "@/config/product-subnav.config";
import { siteConfig } from "@/config/site.config";

import { StartFeatureDetailPage } from "@/features/start/components/StartFeatureDetailPage";
import { routing } from "@/i18n/routing";

const LIVE_FEATURES = ["users"];

type PageProps = {
  params: Promise<{ locale: string; product: string; feature: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    LIVE_FEATURES.map((feature) => ({ locale, product: "start", feature })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, feature } = await params;
  const t = await getTranslations({ locale, namespace: "StartFeatureCatalog" });

  return {
    title: { absolute: `${feature} · ${t("title")} · ${siteConfig.name} Start` },
    robots: { index: false },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale, product, feature } = await params;
  setRequestLocale(locale);

  if (product !== "start" || !isFeatureCatalogLive || !LIVE_FEATURES.includes(feature)) {
    notFound();
  }

  return (
    <main className="flex-1">
      <StartFeatureDetailPage feature={feature} />
    </main>
  );
}
