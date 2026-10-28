import type { Metadata } from "next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { buildAlternates, localeUrl } from "@/lib/canonical";
import { buildOgImageMetadata } from "@/lib/og";

import { SupportPage } from "@/features/support";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SupportPage" });

  const title = t("title");
  const description = t("description");
  const og = buildOgImageMetadata({ title, description, path: "/support" });

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/support"),
    openGraph: {
      title,
      description,
      url: localeUrl(locale, "/support"),
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
      <SupportPage />
    </main>
  );
}
