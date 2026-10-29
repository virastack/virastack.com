"use client";

import { useLocale, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

type TurkeyOnlyNoticeProps = {
  /** `inline` sits under the product hero copy; `block` opens a docs page. */
  variant?: "inline" | "block";
  className?: string;
};

/**
 * Tells non-Turkish readers that ViraStack Address only covers Türkiye.
 * Turkish readers already know, so the notice renders nothing for them.
 */
export function TurkeyOnlyNotice({ variant = "block", className }: TurkeyOnlyNoticeProps) {
  const locale = useLocale();
  const t = useTranslations("Address");

  if (locale === "tr") return null;

  if (variant === "inline") {
    return (
      <p
        role="note"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-orange-600/30 bg-orange-500/10 px-3 py-1 text-xs text-muted-foreground dark:border-orange-400/30 dark:bg-orange-400/10",
          className,
        )}
      >
        <span className="shrink-0 text-sm leading-none" aria-hidden>
          🇹🇷
        </span>
        <span>
          <span className="font-medium text-foreground">{t("regionNoticeTitle")}:</span>{" "}
          {t("regionNoticeShort")}
        </span>
      </p>
    );
  }

  return (
    <div
      role="note"
      className={cn(
        "not-prose my-6 flex gap-3 rounded-xl border border-orange-600/30 bg-orange-500/10 p-4 dark:border-orange-400/30 dark:bg-orange-400/10",
        className,
      )}
    >
      <span className="shrink-0 text-base leading-6" aria-hidden>
        🇹🇷
      </span>
      <div className="space-y-1 text-sm leading-relaxed">
        <p className="font-semibold text-foreground">{t("regionNoticeTitle")}</p>
        <p className="text-muted-foreground">{t("regionNotice")}</p>
      </div>
    </div>
  );
}
