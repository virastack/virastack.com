import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { siteConfig } from "@/config/site.config";

import { StartFeatureDetailPage } from "@/features/start/components/StartFeatureDetailPage";
import { featureCatalog } from "@/features/start/data/feature-catalog";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; product: string; feature: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    featureCatalog.map(({ id }) => ({ locale, product: "start", feature: id })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, feature } = await params;
  const t = await getTranslations({ locale, namespace: "StartFeatureCatalog" });

  return {
    title: { absolute: `${feature} · ${t("title")} · ${siteConfig.name} Start` },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale, product, feature } = await params;
  setRequestLocale(locale);

  if (product !== "start" || !featureCatalog.some(({ id }) => id === feature)) {
    notFound();
  }

  return (
    <main className="flex-1">
      <StartFeatureDetailPage feature={feature} />
    </main>
  );
}
