import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { setRequestLocale } from "next-intl/server";

import type { EcosystemLocale } from "@/config/ecosystem.config";

import { buildAlternates, localeUrl } from "@/lib/canonical";
import { buildOgImageMetadata } from "@/lib/og";

import {
  findRelease,
  getReleaseHref,
  getReleaseParams,
  getReleases,
  ReleaseDetailPage,
} from "@/features/releases";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; product: string; version: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getReleases().map((release) => ({ locale, ...getReleaseParams(release) })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, product, version } = await params;
  const release = findRelease(product, version);
  if (!release) return {};

  const { title, summary: description } = release.copy[locale as EcosystemLocale];
  const path = getReleaseHref(release);
  const og = buildOgImageMetadata({ title, description, path });

  return {
    title,
    description,
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
  const { locale, product, version } = await params;
  setRequestLocale(locale);

  const release = findRelease(product, version);
  if (!release) notFound();

  return (
    <main className="flex-1">
      <ReleaseDetailPage release={release} />
    </main>
  );
}
