import type { Metadata } from "next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { siteConfig } from "@/config/site.config";

import { buildAlternates, localeUrl } from "@/lib/canonical";
import { buildHomeJsonLd } from "@/lib/json-ld";
import { buildLandingOgImageMetadata } from "@/lib/og";

import { JsonLd } from "@/components/shared/JsonLd";
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
  const description = t("metaDesc");
  const og = buildLandingOgImageMetadata(locale, "home", title);

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: buildAlternates(locale),
    openGraph: {
      title,
      description,
      url: localeUrl(locale),
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
  const t = await getTranslations({ locale, namespace: "Home" });

  return (
    <main className="relative isolate flex-1">
      <JsonLd data={buildHomeJsonLd({ locale, description: t("metaDesc") })} />
      <HomePage />
    </main>
  );
}
