import type { Metadata } from "next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { siteConfig } from "@/config/site.config";

import { buildOgImageMetadata } from "@/lib/og";

import { AcademyContributePageView } from "@/features/academy";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Academy" });
  const title = `${t("contributeTitle")} — ${siteConfig.name} Academy`;
  const description = t("contributeDescription");
  const path = "/academy/contribute";
  const og = buildOgImageMetadata({
    title: t("contributeTitle"),
    description,
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
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <AcademyContributePageView />
    </main>
  );
}
