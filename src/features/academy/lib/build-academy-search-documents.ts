import type { SearchDocument } from "@/types/search.types";

import { getAcademyTracks } from "@/features/academy/lib/load-curriculum";
import { loadAcademyLesson } from "@/features/academy/lib/load-lesson";

const CITATION = /\[\^\d+\]/g;
const CODE_FENCE = /^```[\s\S]*?^```/gm;
const HEADING = /^#{2,3}\s+(.+)$/gm;

function plainMarkdown(value: string): string {
  return value.replace(CITATION, "").replace(/`/g, "").trim();
}

function lessonHeadings(markdown: string): string {
  const prose = markdown.replace(CODE_FENCE, "");
  return [...prose.matchAll(HEADING)].map((match) => plainMarkdown(match[1] ?? "")).join(" ");
}

/** Server only: published Academy tracks and lessons, read from the pulled content. */
export function buildAcademySearchDocuments(locale: string): SearchDocument[] {
  return getAcademyTracks(locale)
    .filter((track) => track.status === "published")
    .flatMap((track) => {
      const trackHref = `/academy/${track.slug}`;
      const trackDocument: SearchDocument = {
        id: `academy:track:${track.slug}`,
        sectionId: "academy",
        href: trackHref,
        title: track.title,
        description: track.description,
        body: "",
        kind: "track",
      };

      const lessonDocuments = track.lessonGroups.flatMap((group) =>
        group.lessons
          .filter((lesson) => lesson.status === "published")
          .map((lesson): SearchDocument => {
            const document = loadAcademyLesson(locale, track.slug, lesson.slug);
            const description = plainMarkdown(
              document?.frontmatter.description ?? lesson.description,
            );

            return {
              id: `academy:lesson:${track.slug}/${lesson.slug}`,
              sectionId: "academy",
              href: `${trackHref}/${lesson.slug}`,
              title: document?.frontmatter.title ?? lesson.title,
              description: `${track.title} · ${description}`,
              body: document ? lessonHeadings(document.body) : "",
              kind: lesson.kind === "project" ? "project" : "lesson",
            };
          }),
      );

      return [trackDocument, ...lessonDocuments];
    });
}
