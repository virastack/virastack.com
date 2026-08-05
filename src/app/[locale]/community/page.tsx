import type { Metadata } from "next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { siteConfig } from "@/config/site.config";

import { buildOgImageMetadata } from "@/lib/og";

import { CommunityPage } from "@/features/community";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CommunityPage" });

  const title = t("title");
  const description = t("description");
  const og = buildOgImageMetadata({ title, description, path: "/community" });

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/community`,
      ...og.openGraph,
    },
    twitter: og.twitter,
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <CommunityPage />
    </main>
  );
}
