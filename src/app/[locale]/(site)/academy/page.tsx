import type { Metadata } from "next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { buildAlternates, localeUrl } from "@/lib/canonical";
import { buildLandingOgImageMetadata } from "@/lib/og";

import { AcademyLanding } from "@/features/academy";
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
  const tSeo = await getTranslations({ locale, namespace: "Seo" });
  const title = tSeo("productAcademy");
  const description = t("metaDescription");
  const og = buildLandingOgImageMetadata(locale, "academy", title);

  return {
    title: { absolute: title },
    description,
    alternates: buildAlternates(locale, "/academy"),
    openGraph: {
      title,
      description,
      url: localeUrl(locale, "/academy"),
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
      <AcademyLanding />
    </main>
  );
}
