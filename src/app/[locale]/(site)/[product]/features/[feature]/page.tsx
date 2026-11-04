import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { siteConfig } from "@/config/site.config";

import { buildAlternates } from "@/lib/canonical";

import { StartFeatureDetailPage } from "@/features/start/components/StartFeatureDetailPage";
import { isFeatureId, visibleFeatures } from "@/features/start/data/feature-catalog";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; product: string; feature: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    visibleFeatures.map(({ id }) => ({ locale, product: "start", feature: id })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, product, feature } = await params;
  if (
    product !== "start" ||
    !isFeatureId(feature) ||
    !visibleFeatures.some(({ id }) => id === feature)
  ) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "StartFeatureCatalog" });

  return {
    title: { absolute: `${t(`names.${feature}`)} · ${siteConfig.name} Start` },
    description: t(`items.${feature}`),
    alternates: buildAlternates(locale, `/start/features/${feature}`),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale, product, feature } = await params;
  setRequestLocale(locale);

  if (
    product !== "start" ||
    !isFeatureId(feature) ||
    !visibleFeatures.some(({ id }) => id === feature)
  ) {
    notFound();
  }

  return (
    <main className="flex-1">
      <StartFeatureDetailPage feature={feature} />
    </main>
  );
}
