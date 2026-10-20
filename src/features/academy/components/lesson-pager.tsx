import { ChevronLeft, ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { featureCardChevronClassName, getInteractiveCardClassName } from "@/lib/feature-card";
import { cn } from "@/lib/utils";

import { formatLessonNumber } from "@/features/academy/lib/load-curriculum";
import type { AcademyLessonEntry } from "@/features/academy/types/academy.types";
import { Link } from "@/i18n/routing";

type LessonPagerCardProps = {
  trackSlug: string;
  entry: AcademyLessonEntry;
  direction: "previous" | "next";
  className?: string;
};

async function LessonPagerCard({ trackSlug, entry, direction, className }: LessonPagerCardProps) {
  const t = await getTranslations("Academy");
  const { lesson, number } = entry;
  const isPublished = lesson.status === "published";
  const isProject = lesson.kind === "project";
  const isPrevious = direction === "previous";

  const content = (
    <>
      <span
        className={cn(
          "flex items-center gap-2 text-xs text-muted-foreground",
          isPrevious ? "justify-start" : "justify-between",
        )}
      >
        {isPrevious && isPublished ? (
          <ChevronLeft className={featureCardChevronClassName} aria-hidden />
        ) : null}
        <span className={cn(isPrevious && "ml-auto")}>
          {isPrevious ? t("pagerPrevious") : t("pagerNext")}
        </span>
        {isPrevious || !isPublished ? null : (
          <ChevronRight className={featureCardChevronClassName} aria-hidden />
        )}
      </span>
      <span
        className={cn(
          "flex items-start gap-2",
          isPrevious ? "justify-end text-right" : "justify-between",
        )}
      >
        <span
          className={cn(
            "text-sm font-medium text-balance text-foreground md:text-base",
            isPrevious && "min-w-0 flex-1",
            !isPublished && "text-muted-foreground",
          )}
        >
          {formatLessonNumber(number)}. {lesson.title}
        </span>
        {isProject ? (
          <span className="shrink-0 rounded-md border border-green-500/30 bg-green-500/10 px-1.5 py-0.5 text-xs font-medium text-green-700 dark:text-green-400">
            {t("projectLabel")}
          </span>
        ) : null}
      </span>
    </>
  );

  const cardClassName = cn(getInteractiveCardClassName(!isPublished), className);

  if (!isPublished) {
    return <div className={cardClassName}>{content}</div>;
  }

  return (
    <Link href={`/academy/${trackSlug}/${lesson.slug}`} className={cardClassName}>
      {content}
    </Link>
  );
}

type LessonPagerProps = {
  trackSlug: string;
  previous: AcademyLessonEntry | null;
  next: AcademyLessonEntry | null;
};

export async function LessonPager({ trackSlug, previous, next }: LessonPagerProps) {
  const t = await getTranslations("Academy");

  if (!previous && !next) {
    return null;
  }

  return (
    <nav aria-label={t("pagerAria")} className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6">
      {previous ? (
        <LessonPagerCard trackSlug={trackSlug} entry={previous} direction="previous" />
      ) : null}
      {next ? (
        <LessonPagerCard
          trackSlug={trackSlug}
          entry={next}
          direction="next"
          className="sm:col-start-2"
        />
      ) : null}
    </nav>
  );
}
