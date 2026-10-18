import { cn } from "@/lib/utils";

import type { AcademyResourceKind } from "@/features/academy/constants/resource.constants";

const RESOURCE_BADGE_CLASS: Record<AcademyResourceKind, string> = {
  doc: "border-border bg-muted text-foreground",
  article:
    "border-sky-500/30 bg-sky-300/15 text-sky-700 dark:border-sky-300/30 dark:bg-sky-300/15 dark:text-sky-50",
  research:
    "border-emerald-600/30 bg-emerald-500/15 text-emerald-950 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-100",
  repo: "border-orange-500/30 bg-orange-300/15 text-orange-900 dark:border-orange-300/30 dark:bg-orange-300/15 dark:text-orange-50",
  video:
    "border-rose-500/30 bg-rose-300/15 text-rose-900 dark:border-rose-300/30 dark:bg-rose-200/15 dark:text-rose-50",
  podcast:
    "border-violet-500/30 bg-violet-300/15 text-violet-900 dark:border-violet-300/30 dark:bg-violet-300/15 dark:text-violet-50",
};

type AcademyResourceBadgeProps = {
  kind: AcademyResourceKind;
  label: string;
  className?: string;
};

export function AcademyResourceBadge({ kind, label, className }: AcademyResourceBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border px-1.5 py-0.5 text-xs font-medium md:px-2",
        RESOURCE_BADGE_CLASS[kind],
        className,
      )}
    >
      {label}
    </span>
  );
}
