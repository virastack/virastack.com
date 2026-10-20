import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { setRequestLocale } from "next-intl/server";

import { siteConfig } from "@/config/site.config";

import { buildOgImageMetadata } from "@/lib/og";

import { AcademyTrackPageView, findAcademyTrack, getAcademyTracks } from "@/features/academy";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; track: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAcademyTracks(locale)
      .filter((track) => track.status === "published")
      .map((track) => ({ locale, track: track.slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, track: trackSlug } = await params;
  const track = findAcademyTrack(locale, trackSlug);

  if (!track || track.status !== "published") {
    return {};
  }

  const trackTitle = track.title;
  const description = track.description;
  const title = `${trackTitle} — ${siteConfig.name} Academy`;
  const path = `/academy/${track.slug}`;
  const og = buildOgImageMetadata({ title: trackTitle, description, path });

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
  const { locale, track: trackSlug } = await params;
  setRequestLocale(locale);

  const track = findAcademyTrack(locale, trackSlug);

  if (!track || track.status !== "published") {
    notFound();
  }

  return (
    <main className="flex-1">
      <AcademyTrackPageView track={track} />
    </main>
  );
}
