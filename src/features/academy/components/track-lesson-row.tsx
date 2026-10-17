import { ChevronRight } from "lucide-react";
import { getLocale } from "next-intl/server";

import {
  featureCardChevronClassName,
  interactiveListRowBleedClassName,
  interactiveListRowClassName,
} from "@/lib/feature-card";
import { cn } from "@/lib/utils";

import { AcademyLessonMetaBadges } from "@/features/academy/components/academy-lesson-meta-badges";
import { countLessonResources } from "@/features/academy/lib/count-lesson-resources";
import { formatLessonNumber } from "@/features/academy/lib/load-curriculum";
import { loadAcademyLesson } from "@/features/academy/lib/load-lesson";
import type { AcademyLessonEntry } from "@/features/academy/types/academy.types";
import { Link } from "@/i18n/routing";

type TrackLessonRowProps = {
  trackSlug: string;
  entry: AcademyLessonEntry;
};

export async function TrackLessonRow({ trackSlug, entry }: TrackLessonRowProps) {
  const locale = await getLocale();
  const { lesson, number } = entry;
  const isComingSoon = lesson.status === "coming_soon";
  const isProject = lesson.kind === "project";
  const document = loadAcademyLesson(locale, trackSlug, lesson.slug);
  const counts = document ? countLessonResources(document.body) : [];

  const body = (
    <>
      <span className="mt-0.5 w-5 shrink-0 font-mono text-xs text-muted-foreground tabular-nums md:mt-1 md:text-sm">
        {formatLessonNumber(number)}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5 md:gap-x-3">
          <span
            className={cn(
              "max-w-full shrink-0 text-sm leading-6 font-normal text-balance text-foreground md:text-base md:leading-7",
              isComingSoon && "text-muted-foreground",
            )}
          >
            {lesson.title}
          </span>
          <span className="flex max-w-full shrink-0 flex-wrap items-center justify-end gap-1.5 md:gap-2">
            <AcademyLessonMetaBadges counts={counts} isProject={isProject} />
            {isComingSoon ? null : (
              <ChevronRight className={cn(featureCardChevronClassName, "mt-0.5")} aria-hidden />
            )}
          </span>
        </span>
        <span className="text-xs leading-5 text-pretty text-muted-foreground md:text-sm md:leading-6">
          {lesson.description.replace(/\[\^\d+\]/g, "")}
        </span>
      </span>
    </>
  );

  const rowClassName = cn(
    interactiveListRowBleedClassName,
    "flex items-start gap-3 md:gap-4",
    !isComingSoon && interactiveListRowClassName,
  );

  if (isComingSoon) {
    return <div className={rowClassName}>{body}</div>;
  }

  return (
    <Link href={`/academy/${trackSlug}/${lesson.slug}`} className={rowClassName}>
      {body}
    </Link>
  );
}
