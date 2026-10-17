import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { featureCardChevronClassName, getInteractiveCardClassName } from "@/lib/feature-card";
import { cn } from "@/lib/utils";

import { AcademyTrackIcon } from "@/features/academy/components/academy-track-icon";
import { getTrackIconTags } from "@/features/academy/constants/track-icon.constants";
import type { AcademyTrack } from "@/features/academy/types/academy.types";
import { Link } from "@/i18n/routing";

type TrackPagerCardProps = {
  track: AcademyTrack;
  direction: "previous" | "next";
  className?: string;
};

async function TrackPagerCard({ track, direction, className }: TrackPagerCardProps) {
  const t = await getTranslations("Academy");
  const isPrevious = direction === "previous";
  const isPublished = track.status === "published";
  const iconTags = getTrackIconTags(track.slug);

  const content = (
    <>
      <span className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        {isPrevious ? t("trackPagerPrevious") : t("trackPagerNext")}
        {isPublished ? (
          <ChevronRight className={featureCardChevronClassName} aria-hidden />
        ) : null}
      </span>
      <span className="flex items-start gap-2">
        {iconTags.length > 0 ? (
          <span className="inline-flex max-w-full shrink-0 flex-wrap items-center gap-1">
            {iconTags.map((tag) => (
              <AcademyTrackIcon key={tag} tag={tag} className="size-4 shrink-0 md:size-5" />
            ))}
          </span>
        ) : null}
        <span
          className={cn(
            "text-sm font-medium text-balance text-foreground md:text-base",
            !isPublished && "text-muted-foreground",
          )}
        >
          {track.title}
        </span>
      </span>
    </>
  );

  const cardClassName = cn(getInteractiveCardClassName(!isPublished), className);

  if (!isPublished) {
    return <div className={cardClassName}>{content}</div>;
  }

  return (
    <Link href={`/academy/${track.slug}`} className={cardClassName}>
      {content}
    </Link>
  );
}

type TrackPagerProps = {
  previous: AcademyTrack | null;
  next: AcademyTrack | null;
};

export async function TrackPager({ previous, next }: TrackPagerProps) {
  const t = await getTranslations("Academy");

  if (!previous && !next) {
    return null;
  }

  return (
    <nav
      aria-label={t("trackPagerAria")}
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-6"
    >
      {previous ? <TrackPagerCard track={previous} direction="previous" /> : null}
      {next ? (
        <TrackPagerCard track={next} direction="next" className="sm:col-start-2" />
      ) : null}
    </nav>
  );
}
