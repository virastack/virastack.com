import type { LucideIcon } from "lucide-react";
import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleQuestionMarkIcon,
  CircleXIcon,
  MinusIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

export type Status = "yes" | "no" | "partial" | "na" | "unknown";

/** Fills the circle in the current color and draws the inner mark in white. */
const filled = "fill-current [&>path]:fill-none [&>path]:stroke-white";

const statusIcons = {
  yes: {
    icon: CircleCheckIcon,
    strokeWidth: 2.5,
    className: cn("text-emerald-600 dark:text-emerald-500", filled),
    labelKey: "statusYes",
  },
  no: {
    icon: CircleXIcon,
    strokeWidth: 2.5,
    className: cn("text-rose-600 dark:text-rose-500", filled),
    labelKey: "statusNo",
  },
  partial: {
    icon: CircleDashedIcon,
    strokeWidth: 2.5,
    className: "text-amber-600 dark:text-amber-400",
    labelKey: "statusPartial",
  },
  na: {
    icon: MinusIcon,
    strokeWidth: 2,
    className: "text-muted-foreground",
    labelKey: "statusNa",
  },
  unknown: {
    icon: CircleQuestionMarkIcon,
    strokeWidth: 2,
    className: "text-muted-foreground",
    labelKey: "statusUnknown",
  },
} as const satisfies Record<
  Status,
  { icon: LucideIcon; strokeWidth: number; className: string; labelKey: `status${string}` }
>;

type StatusIconProps = {
  status: Status;
  /** Overrides the default screen reader label. */
  label?: string;
  /** For legends where the meaning is written next to the icon. */
  decorative?: boolean;
  className?: string;
};

/** Comparison and support marks: one icon and color per status, site-wide. */
export function StatusIcon({ status, label, decorative = false, className }: StatusIconProps) {
  const t = useTranslations("Docs");
  const { icon: Icon, strokeWidth, className: colorClass, labelKey } = statusIcons[status];

  return (
    <span
      className={cn("inline-flex items-center align-[-0.2em]", decorative && "mr-1", className)}
    >
      <Icon className={cn("size-4 shrink-0", colorClass)} strokeWidth={strokeWidth} aria-hidden />
      {decorative ? null : <span className="sr-only">{label ?? t(labelKey)}</span>}
    </span>
  );
}
