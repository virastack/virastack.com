import { getLocale, getTranslations } from "next-intl/server";

import { formatDate } from "@/helpers/format-date";

import { GithubIcon } from "@/components/shared/icons/GithubIcon";
import { AcademyBackLink } from "@/features/academy/components/AcademyBackLink";
import { AcademyLessonCompleteButton } from "@/features/academy/components/AcademyLessonCompleteButton";
import { AcademyLessonQuiz } from "@/features/academy/components/AcademyLessonQuiz";
import { AcademyMarkdown } from "@/features/academy/components/AcademyMarkdown";
import { LessonPager } from "@/features/academy/components/LessonPager";
import { highlightAcademyCode } from "@/features/academy/lib/highlight-academy-code";
import { formatLessonNumber, getAcademyLessonId } from "@/features/academy/lib/load-curriculum";
import { getAcademyLessonEditUrl } from "@/features/academy/lib/load-lesson";
import type {
  AcademyLessonDocument,
  AcademyLessonLookup,
  AcademyQuizItem,
} from "@/features/academy/types/academy.types";

/** Code samples are highlighted here on the server; the quiz itself is a client component. */
async function toQuizItems(document: AcademyLessonDocument): Promise<AcademyQuizItem[] | null> {
  const quiz = document.frontmatter.quiz;
  if (!quiz) return null;

  return Promise.all(
    quiz.map(async ({ code, lang, ...question }) => ({
      ...question,
      codeHtml: code ? await highlightAcademyCode(code, lang ?? "tsx") : null,
    })),
  );
}

type AcademyLessonPageViewProps = {
  lookup: AcademyLessonLookup;
  document: AcademyLessonDocument;
};

export async function AcademyLessonPageView({ lookup, document }: AcademyLessonPageViewProps) {
  const t = await getTranslations("Academy");
  const locale = await getLocale();
  const { track, entry, previous, next, total } = lookup;
  const { lesson, number } = entry;
  const editUrl = getAcademyLessonEditUrl(document);
  const lessonId = getAcademyLessonId(track.slug, lesson.slug);
  const quiz = lesson.kind === "lesson" ? await toQuizItems(document) : null;

  return (
    <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-col gap-10 px-6 pt-28 pb-24">
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex items-center justify-between gap-4">
          <AcademyBackLink href={`/academy/${track.slug}`} label={track.title} />
          <p className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums md:text-sm">
            {formatLessonNumber(number)} / {formatLessonNumber(total)}
            {lesson.kind === "project" ? (
              <span className="ml-2 rounded-md border border-brand-academy/30 bg-brand-academy/10 px-1.5 py-0.5 font-sans text-[0.7rem] font-medium text-brand-academy">
                {t("projectLabel")}
              </span>
            ) : null}
          </p>
        </div>
        <header className="space-y-3 border-b border-border pb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            {document.frontmatter.title}
          </h1>
          <p className="max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">
            {document.frontmatter.description.replace(/\[\^\d+\]/g, "")}
          </p>
        </header>
      </div>

      <AcademyMarkdown content={document.body} />

      {quiz ? (
        <div className="border-t border-border pt-10">
          <AcademyLessonQuiz lessonId={lessonId} questions={quiz} />
        </div>
      ) : null}

      <AcademyLessonCompleteButton lessonId={lessonId} />

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
        <a
          href={editUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          <GithubIcon className="size-4" />
          {t("editOnGitHub")}
        </a>
        <p className="text-xs text-muted-foreground">
          {t("lastUpdated", {
            date: formatDate(document.frontmatter.lastVerified, locale),
          })}
        </p>
      </div>

      <LessonPager trackSlug={track.slug} previous={previous} next={next} />
    </div>
  );
}
