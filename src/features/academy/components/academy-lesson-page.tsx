import { getLocale, getTranslations } from "next-intl/server";

import { GithubIcon } from "@/components/icons";

import { formatDate } from "@/helpers";

import { AcademyBackLink } from "@/features/academy/components/academy-back-link";
import { AcademyMarkdown } from "@/features/academy/components/academy-markdown";
import { LessonPager } from "@/features/academy/components/lesson-pager";
import { getAcademyLessonEditUrl } from "@/features/academy/lib/load-lesson";
import { formatLessonNumber } from "@/features/academy/lib/load-curriculum";
import type {
  AcademyLessonDocument,
  AcademyLessonLookup,
} from "@/features/academy/types/academy.types";

type AcademyLessonPageViewProps = {
  lookup: AcademyLessonLookup;
  document: AcademyLessonDocument;
};

export async function AcademyLessonPageView({
  lookup,
  document,
}: AcademyLessonPageViewProps) {
  const t = await getTranslations("Academy");
  const locale = await getLocale();
  const { track, entry, previous, next, total } = lookup;
  const { lesson, number } = entry;
  const editUrl = getAcademyLessonEditUrl(document);

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-2xl flex-col gap-10 px-6 pt-28 pb-24">
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex items-center justify-between gap-4">
          <AcademyBackLink
            href={`/academy/${track.slug}`}
            label={track.title}
          />
          <p className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums md:text-sm">
            {formatLessonNumber(number)} / {formatLessonNumber(total)}
            {lesson.kind === "project" ? (
              <span className="ml-2 rounded-md border border-green-500/30 bg-green-500/10 px-1.5 py-0.5 text-[0.7rem] font-sans font-medium text-green-700 dark:text-green-400">
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
