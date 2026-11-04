import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { buildAlternates, localeUrl } from "@/lib/canonical";
import { buildOgImageMetadata } from "@/lib/og";

import { ReleasesPage } from "@/features/releases/components/ReleasesPage";
import { getReleases, releasePalettes } from "@/features/releases/data/releases";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; product: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    releasePalettes.map((palette) => ({ locale, product: palette.id })),
  );
}

const findPalette = (product: string) => releasePalettes.find((palette) => palette.id === product);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, product } = await params;
  const palette = findPalette(product);
  if (!palette) return {};

  const t = await getTranslations({ locale, namespace: "ReleasesPage" });
  const title = t("productTitle", { product: palette.productName });
  const description = t("description");
  const path = `/releases/${palette.id}`;
  const og = buildOgImageMetadata({ title, description, path });
  const hasNotes = getReleases().some((release) =>
    release.products.some((item) => item.id === palette.id),
  );

  return {
    title,
    description,
    // A product without notes is only an empty state, so it stays out of search results.
    robots: hasNotes ? undefined : { index: false },
    alternates: buildAlternates(locale, path),
    openGraph: {
      title,
      description,
      url: localeUrl(locale, path),
      ...og.openGraph,
    },
    twitter: og.twitter,
  };
}

export default async function Page({ params }: PageProps) {
  const { locale, product } = await params;
  setRequestLocale(locale);

  const palette = findPalette(product);
  if (!palette) notFound();

  return (
    <main className="flex-1">
      <ReleasesPage product={palette.id} />
    </main>
  );
}
