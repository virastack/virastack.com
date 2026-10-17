import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { setRequestLocale } from "next-intl/server";

import { siteConfig } from "@/config/site.config";

import { buildOgImageMetadata } from "@/lib/og";

import {
  AcademyLessonPageView,
  findAcademyLesson,
  getPublishedLessonPaths,
  loadAcademyLesson,
} from "@/features/academy";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; track: string; lesson: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getPublishedLessonPaths(locale).map((path) => ({
      locale,
      track: path.track,
      lesson: path.lesson,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, track: trackSlug, lesson: lessonSlug } = await params;
  const lookup = findAcademyLesson(locale, trackSlug, lessonSlug);

  if (!lookup || lookup.entry.lesson.status !== "published") {
    return {};
  }

  const document = loadAcademyLesson(locale, trackSlug, lessonSlug);
  const trackTitle = lookup.track.title;
  const title = document
    ? `${document.frontmatter.title} — ${trackTitle}`
    : `${lookup.entry.lesson.title} — ${trackTitle}`;
  const description = (
    document?.frontmatter.description ?? lookup.entry.lesson.description
  ).replace(/\[\^\d+\]/g, "");
  const path = `/academy/${trackSlug}/${lessonSlug}`;
  const og = buildOgImageMetadata({
    title: document?.frontmatter.title ?? lookup.entry.lesson.title,
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
  const { locale, track: trackSlug, lesson: lessonSlug } = await params;
  setRequestLocale(locale);

  const lookup = findAcademyLesson(locale, trackSlug, lessonSlug);

  if (!lookup || lookup.entry.lesson.status !== "published") {
    notFound();
  }

  const document = loadAcademyLesson(locale, trackSlug, lessonSlug);

  if (!document) {
    notFound();
  }

  return (
    <main className="flex-1">
      <AcademyLessonPageView lookup={lookup} document={document} />
    </main>
  );
}
