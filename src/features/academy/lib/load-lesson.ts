import { existsSync, readFileSync } from "node:fs";

import matter from "gray-matter";

import { academyLessonFrontmatterSchema } from "@/features/academy/schemas/curriculum.schema";
import {
  getLessonEditUrl,
  getLessonFilePath,
} from "@/features/academy/lib/content-path";
import type { AcademyLessonDocument } from "@/features/academy/types/academy.types";

type ContentLocale = "tr" | "en";

function readLessonAt(
  locale: ContentLocale,
  trackSlug: string,
  lessonSlug: string,
): AcademyLessonDocument | null {
  const path = getLessonFilePath(locale, trackSlug, lessonSlug);

  if (!existsSync(path)) {
    return null;
  }

  const file = readFileSync(path, "utf8");
  const parsed = matter(file);
  const frontmatter = academyLessonFrontmatterSchema.parse(parsed.data);

  return {
    frontmatter,
    body: parsed.content.trim(),
    locale,
    relativePath: `content/${locale}/${trackSlug}/${lessonSlug}.md`,
  };
}

/**
 * Loads a lesson markdown body. Prefers the UI locale; falls back to Turkish.
 */
export function loadAcademyLesson(
  locale: string,
  trackSlug: string,
  lessonSlug: string,
): AcademyLessonDocument | null {
  const preferred: ContentLocale = locale === "en" ? "en" : "tr";
  const preferredDoc = readLessonAt(preferred, trackSlug, lessonSlug);

  if (preferredDoc) {
    return preferredDoc;
  }

  if (preferred !== "tr") {
    return readLessonAt("tr", trackSlug, lessonSlug);
  }

  return null;
}

export function getAcademyLessonEditUrl(doc: AcademyLessonDocument): string {
  const [trackSlug, lessonSlug] = doc.frontmatter.translationKey.split("/");
  if (!trackSlug || !lessonSlug) {
    return getLessonEditUrl(doc.locale, "unknown", "unknown");
  }
  return getLessonEditUrl(doc.locale, trackSlug, lessonSlug);
}
