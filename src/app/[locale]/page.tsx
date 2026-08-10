import type { Metadata } from "next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { siteConfig } from "@/config/site.config";

import { buildOgImageMetadata } from "@/lib/og";

import { HomePage } from "@/features/home";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });

  const title = `${siteConfig.name} - ${t("title")}`;
  const description = t("heroDesc");
  const og = buildOgImageMetadata({ description, path: "/" });

  return {
    title: {
      absolute: title,
    },
    description,
    openGraph: {
      title,
      description,
      url: siteConfig.url,
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
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <HomePage />
    </main>
  );
}
