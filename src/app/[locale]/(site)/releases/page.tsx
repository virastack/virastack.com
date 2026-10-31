import type { Metadata } from "next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { buildAlternates, localeUrl } from "@/lib/canonical";
import { buildOgImageMetadata } from "@/lib/og";

import { ReleasesPage } from "@/features/releases";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ReleasesPage" });

  const title = t("title");
  const description = t("description");
  const og = buildOgImageMetadata({ title, description, path: "/releases" });

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/releases"),
    openGraph: {
      title,
      description,
      url: localeUrl(locale, "/releases"),
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
      <ReleasesPage />
    </main>
  );
}
