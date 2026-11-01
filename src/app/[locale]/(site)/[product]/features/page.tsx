import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { isFeatureCatalogLive } from "@/config/product-subnav.config";
import { siteConfig } from "@/config/site.config";

import { buildAlternates } from "@/lib/canonical";

import { StartFeaturesPage } from "@/features/start/components/StartFeaturesPage";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; product: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale, product: "start" }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, product } = await params;
  if (product !== "start") return {};

  const t = await getTranslations({ locale, namespace: "StartFeatureCatalog" });

  return {
    title: { absolute: `${t("title")} · ${siteConfig.name} Start` },
    description: t("description"),
    alternates: buildAlternates(locale, "/start/features"),
    robots: isFeatureCatalogLive ? undefined : { index: false },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale, product } = await params;
  setRequestLocale(locale);

  if (product !== "start" || !isFeatureCatalogLive) {
    notFound();
  }

  return (
    <main className="flex-1">
      <StartFeaturesPage />
    </main>
  );
}
