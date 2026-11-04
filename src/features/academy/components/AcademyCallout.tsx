"use client";

import { Check, CircleAlert, Lightbulb, TriangleAlert, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

const calloutConfig = {
  TIP: {
    labelKey: "calloutTip" as const,
    Icon: Lightbulb,
    className: "border-sky-600/30 bg-sky-500/10 dark:border-sky-400/30 dark:bg-sky-400/10",
    iconClassName: "text-sky-600 dark:text-sky-400",
  },
  NOTE: {
    labelKey: "calloutTip" as const,
    Icon: Lightbulb,
    className: "border-sky-600/30 bg-sky-500/10 dark:border-sky-400/30 dark:bg-sky-400/10",
    iconClassName: "text-sky-600 dark:text-sky-400",
  },
  WARNING: {
    labelKey: "calloutWarning" as const,
    Icon: TriangleAlert,
    className: "border-amber-600/30 bg-amber-500/10 dark:border-amber-400/30 dark:bg-amber-400/10",
    iconClassName: "text-amber-600 dark:text-amber-400",
  },
  CAUTION: {
    labelKey: "calloutCaution" as const,
    Icon: CircleAlert,
    className: "border-rose-600/30 bg-rose-500/10 dark:border-rose-400/30 dark:bg-rose-400/10",
    iconClassName: "text-rose-600 dark:text-rose-400",
  },
  DO: {
    labelKey: "calloutDo" as const,
    Icon: Check,
    className:
      "border-emerald-600/30 bg-emerald-500/10 dark:border-emerald-400/30 dark:bg-emerald-400/10",
    iconClassName: "text-emerald-600 dark:text-emerald-400",
  },
  DONT: {
    labelKey: "calloutDont" as const,
    Icon: X,
    className: "border-rose-600/30 bg-rose-500/10 dark:border-rose-400/30 dark:bg-rose-400/10",
    iconClassName: "text-rose-600 dark:text-rose-400",
  },
} as const;

type AcademyCalloutProps = {
  kind: string;
  children: React.ReactNode;
};

export function AcademyCallout({ kind, children }: AcademyCalloutProps) {
  const t = useTranslations("Academy");
  const config = calloutConfig[kind as keyof typeof calloutConfig] ?? calloutConfig.TIP;
  const Icon = config.Icon;

  return (
    <div role="note" className={cn("flex gap-3 rounded-xl border p-3 md:p-4", config.className)}>
      <Icon className={cn("mt-0.5 size-4 shrink-0", config.iconClassName)} aria-hidden />
      <div className="flex min-w-0 flex-col gap-1 text-sm leading-relaxed text-pretty text-muted-foreground">
        <p className="font-medium text-foreground">{t(config.labelKey)}</p>
        <div className="[&_p]:m-0 [&_ul]:my-1 [&_ul]:pl-4">{children}</div>
      </div>
    </div>
  );
}
