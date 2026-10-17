import { existsSync, readFileSync } from "node:fs";

import { getCurriculumPath } from "@/features/academy/lib/content-path";
import { academyCurriculumSchema } from "@/features/academy/schemas/curriculum.schema";
import type {
  AcademyCurriculum,
  AcademyLessonEntry,
  AcademyLessonLookup,
  AcademyNumberedLessonGroup,
  AcademyTrack,
  AcademyTrackGroup,
} from "@/features/academy/types/academy.types";

const cachedCurricula = new Map<string, AcademyCurriculum>();

/**
 * Curriculum tree for a UI locale. English pages use the Turkish tree until
 * `content/en/curriculum.json` exists.
 */
function contentLocale(locale: string): "tr" | "en" {
  if (locale !== "tr" && existsSync(getCurriculumPath("en"))) {
    return "en";
  }
  return "tr";
}

export function loadAcademyCurriculum(locale: string): AcademyCurriculum {
  const key = contentLocale(locale);
  const cached = cachedCurricula.get(key);

  if (cached) {
    return cached;
  }

  const raw = JSON.parse(readFileSync(getCurriculumPath(key), "utf8")) as unknown;
  const curriculum = academyCurriculumSchema.parse(raw);
  cachedCurricula.set(key, curriculum);
  return curriculum;
}

export function getAcademyTrackGroups(locale: string): readonly AcademyTrackGroup[] {
  return loadAcademyCurriculum(locale).groups;
}

export function getAcademyTracks(locale: string): AcademyTrack[] {
  return getAcademyTrackGroups(locale).flatMap((group) => [...group.tracks]);
}

export function findAcademyTrack(locale: string, trackSlug: string): AcademyTrack | null {
  return getAcademyTracks(locale).find((track) => track.slug === trackSlug) ?? null;
}

export function findAcademyTrackNeighbours(
  locale: string,
  trackSlug: string,
): {
  previous: AcademyTrack | null;
  next: AcademyTrack | null;
} | null {
  const tracks = getAcademyTracks(locale).filter((track) => track.status === "published");
  const index = tracks.findIndex((track) => track.slug === trackSlug);

  if (index === -1) {
    return null;
  }

  return {
    previous: index > 0 ? (tracks[index - 1] ?? null) : null,
    next: index < tracks.length - 1 ? (tracks[index + 1] ?? null) : null,
  };
}

/** True when at least one lesson in the track has published markdown content. */
export function hasPublishedLessons(track: AcademyTrack): boolean {
  return track.lessonGroups.some((group) =>
    group.lessons.some((lesson) => lesson.status === "published"),
  );
}

export function getNumberedLessonGroups(track: AcademyTrack): AcademyNumberedLessonGroup[] {
  let counter = 0;

  return track.lessonGroups.map((group) => ({
    id: group.id,
    title: group.title,
    entries: group.lessons.map((lesson) => {
      counter += 1;
      return { lesson, number: counter };
    }),
  }));
}

export function getTrackLessonEntries(track: AcademyTrack): AcademyLessonEntry[] {
  return getNumberedLessonGroups(track).flatMap((group) => [...group.entries]);
}

export function findAcademyLesson(
  locale: string,
  trackSlug: string,
  lessonSlug: string,
): AcademyLessonLookup | null {
  const track = findAcademyTrack(locale, trackSlug);

  if (!track) {
    return null;
  }

  const entries = getTrackLessonEntries(track);
  const index = entries.findIndex((entry) => entry.lesson.slug === lessonSlug);

  if (index === -1) {
    return null;
  }

  const entry = entries[index];
  if (!entry) {
    return null;
  }

  return {
    track,
    entry,
    previous: index > 0 ? (entries[index - 1] ?? null) : null,
    next: index < entries.length - 1 ? (entries[index + 1] ?? null) : null,
    total: entries.length,
  };
}

export function formatLessonNumber(lessonNumber: number): string {
  return String(lessonNumber).padStart(2, "0");
}

export function getPublishedLessonPaths(locale: string): { track: string; lesson: string }[] {
  const paths: { track: string; lesson: string }[] = [];

  for (const track of getAcademyTracks(locale)) {
    if (track.status !== "published") continue;

    for (const group of track.lessonGroups) {
      for (const lesson of group.lessons) {
        if (lesson.status === "published") {
          paths.push({ track: track.slug, lesson: lesson.slug });
        }
      }
    }
  }

  return paths;
}
