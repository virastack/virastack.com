import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { featureCardChevronClassName, getInteractiveCardClassName } from "@/lib/feature-card";
import { cn } from "@/lib/utils";

import { AcademyTrackIcon } from "@/features/academy/components/academy-track-icon";
import { getTrackIconTags } from "@/features/academy/constants/track-icon.constants";
import type { AcademyTrack } from "@/features/academy/types/academy.types";
import { Link } from "@/i18n/routing";

type AcademyTrackCardProps = {
  track: AcademyTrack;
  className?: string;
};

function AcademyTrackCardIcons({ tags }: { tags: readonly string[] }) {
  if (tags.length > 3) {
    return (
      <div className="grid shrink-0 grid-cols-3 gap-1 pt-0.5">
        {tags.map((tag) => (
          <AcademyTrackIcon key={tag} tag={tag} className="size-5" />
        ))}
      </div>
    );
  }

  if (tags.length === 2) {
    return (
      <div className="flex shrink-0 flex-col items-center gap-1.5 pt-0.5">
        {tags.map((tag) => (
          <AcademyTrackIcon key={tag} tag={tag} className="size-8" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-1.5 pt-0.5">
      {tags.map((tag) => (
        <AcademyTrackIcon key={tag} tag={tag} className="size-8" />
      ))}
    </div>
  );
}

export async function AcademyTrackCard({ track, className }: AcademyTrackCardProps) {
  const t = await getTranslations("Academy");
  const isComingSoon = track.status === "coming_soon";
  const iconTags = getTrackIconTags(track.slug);

  const content = (
    <div className="flex items-start gap-3">
      <AcademyTrackCardIcons tags={iconTags} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="min-w-0 text-sm font-semibold tracking-tight text-balance text-foreground md:text-base">
            {track.title}
          </h3>
          {isComingSoon ? (
            <span className="inline-flex shrink-0 items-center rounded-full border border-border bg-muted px-1.5 py-0.5 text-xs leading-none font-medium text-muted-foreground">
              {t("comingSoon")}
            </span>
          ) : (
            <ChevronRight className={cn(featureCardChevronClassName, "mt-0.5")} aria-hidden />
          )}
        </div>
        <p className="text-pretty text-xs leading-relaxed text-muted-foreground md:text-sm">
          {track.description}
        </p>
      </div>
    </div>
  );

  const cardClass = cn(
    getInteractiveCardClassName(isComingSoon),
    isComingSoon && "opacity-60",
    className,
  );

  if (isComingSoon) {
    return <div className={cardClass}>{content}</div>;
  }

  return (
    <Link href={`/academy/${track.slug}`} className={cardClass}>
      {content}
    </Link>
  );
}
