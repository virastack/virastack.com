"use client";

import { Check, CircleAlert, Lightbulb, TriangleAlert, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

const calloutConfig = {
  TIP: {
    labelKey: "calloutTip" as const,
    Icon: Lightbulb,
    className: "border-info/30 bg-info/10",
    iconClassName: "text-info",
  },
  NOTE: {
    labelKey: "calloutTip" as const,
    Icon: Lightbulb,
    className: "border-info/30 bg-info/10",
    iconClassName: "text-info",
  },
  WARNING: {
    labelKey: "calloutWarning" as const,
    Icon: TriangleAlert,
    className: "border-warning/30 bg-warning/10",
    iconClassName: "text-warning",
  },
  CAUTION: {
    labelKey: "calloutCaution" as const,
    Icon: CircleAlert,
    className: "border-destructive/30 bg-destructive/10",
    iconClassName: "text-destructive",
  },
  DO: {
    labelKey: "calloutDo" as const,
    Icon: Check,
    className: "border-success/30 bg-success/10",
    iconClassName: "text-success",
  },
  DONT: {
    labelKey: "calloutDont" as const,
    Icon: X,
    className: "border-destructive/30 bg-destructive/10",
    iconClassName: "text-destructive",
  },
} as const;

function isCalloutKind(kind: string): kind is keyof typeof calloutConfig {
  return Object.hasOwn(calloutConfig, kind);
}

type AcademyCalloutProps = {
  kind: string;
  children: React.ReactNode;
};

export function AcademyCallout({ kind, children }: AcademyCalloutProps) {
  const t = useTranslations("Academy");
  const config = isCalloutKind(kind) ? calloutConfig[kind] : calloutConfig.TIP;
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
