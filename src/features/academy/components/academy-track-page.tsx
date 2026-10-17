import { getLocale, getTranslations } from "next-intl/server";

import { AcademyBackLink } from "@/features/academy/components/academy-back-link";
import { TrackLessonRow } from "@/features/academy/components/track-lesson-row";
import { TrackPager } from "@/features/academy/components/track-pager";
import { AcademyTrackIcon } from "@/features/academy/components/academy-track-icon";
import { getTrackIconTags } from "@/features/academy/constants/track-icon.constants";
import {
  findAcademyTrackNeighbours,
  getNumberedLessonGroups,
} from "@/features/academy/lib/load-curriculum";
import type { AcademyTrack } from "@/features/academy/types/academy.types";

type AcademyTrackPageProps = {
  track: AcademyTrack;
};

export async function AcademyTrackPageView({ track }: AcademyTrackPageProps) {
  const locale = await getLocale();
  const t = await getTranslations("Academy");
  const lessonGroups = getNumberedLessonGroups(track);
  const neighbours = findAcademyTrackNeighbours(locale, track.slug);
  const iconTags = getTrackIconTags(track.slug);

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-2xl flex-col gap-10 px-6 pt-28 pb-24">
      <div className="flex flex-col gap-4 md:gap-6">
        <AcademyBackLink />
        <header className="space-y-3 border-b border-border pb-8">
          <h1 className="flex flex-wrap items-center gap-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {iconTags.length > 0 ? (
              <span className="inline-flex shrink-0 flex-wrap items-center gap-2">
                {iconTags.map((tag) => (
                  <AcademyTrackIcon key={tag} tag={tag} className="size-7 sm:size-8" />
                ))}
              </span>
            ) : null}
            <span className="min-w-0 text-balance">{track.title}</span>
          </h1>
          <p className="max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">
            {track.description}
          </p>
        </header>
      </div>

      {lessonGroups.map((group) => (
        <section key={group.id} className="flex flex-col gap-3">
          {lessonGroups.length > 1 ? (
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              {group.title}
            </h2>
          ) : null}
          <ol
            className="flex flex-col gap-1"
            aria-label={
              lessonGroups.length > 1
                ? `${group.title}: ${t("lessonListAria")}`
                : t("lessonListAria")
            }
          >
            {group.entries.map((entry) => (
              <li key={entry.lesson.slug}>
                <TrackLessonRow trackSlug={track.slug} entry={entry} />
              </li>
            ))}
          </ol>
        </section>
      ))}

      {neighbours ? (
        <TrackPager previous={neighbours.previous} next={neighbours.next} />
      ) : null}
    </div>
  );
}
