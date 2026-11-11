"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useCompletedCount } from "@/features/academy/hooks/use-academy-progress";

type AcademyTrackProgressProps = {
  lessonIds: readonly string[];
  /**
   * `compact` fills the width with the bar and shows only "3/10", for narrow
   * track cards. `full` keeps the sentence from `sm` up, for the track page.
   */
  variant: "compact" | "full";
  className?: string;
};

/** A thin bar with the completed count. Hidden until the reader completes a lesson here. */
export function AcademyTrackProgress({ lessonIds, variant, className }: AcademyTrackProgressProps) {
  const t = useTranslations("Academy");
  const completed = useCompletedCount(lessonIds);
  const total = lessonIds.length;

  if (!completed || total === 0) return null;

  const label = t("trackProgress", { completed, total });
  const short = t("trackProgressShort", { completed, total });

  return (
    <Tooltip>
      <TooltipTrigger render={<div className={cn("flex min-w-0 items-center gap-2", className)} />}>
        <div
          role="progressbar"
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={completed}
          className={cn(
            "h-1.5 overflow-hidden rounded-full bg-muted",
            variant === "compact" ? "min-w-0 flex-1" : "w-16 shrink-0",
          )}
        >
          <div
            className="h-full rounded-full bg-success transition-[width]"
            style={{ width: `${(completed / total) * 100}%` }}
          />
        </div>
        <span
          className="shrink-0 text-xs whitespace-nowrap text-muted-foreground tabular-nums"
          aria-hidden
        >
          {variant === "compact" ? (
            short
          ) : (
            <>
              <span className="sm:hidden">{short}</span>
              <span className="hidden sm:inline">{label}</span>
            </>
          )}
        </span>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
