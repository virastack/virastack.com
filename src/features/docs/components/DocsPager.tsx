"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import type { DocsNavItem } from "@/features/docs/types/docs.types";
import { Link } from "@/i18n/routing";

type DocsPagerProps = {
  prev: DocsNavItem | null;
  next: DocsNavItem | null;
};

function PagerButton({ item, direction }: { item: DocsNavItem; direction: "prev" | "next" }) {
  const t = useTranslations("Docs");
  const isPrev = direction === "prev";
  const label = isPrev ? t("previous") : t("next");
  const className =
    "h-auto max-w-[calc(50%-0.5rem)] flex-1 flex-col gap-1 px-4 py-3 whitespace-normal " +
    (isPrev ? "items-start" : "items-end");

  const content = (
    <>
      <span className="text-xs font-normal text-muted-foreground">{label}</span>
      <span
        className={
          isPrev
            ? "inline-flex items-center gap-1 text-left font-medium"
            : "inline-flex items-center gap-1 text-right font-medium"
        }
      >
        {isPrev ? <ChevronLeftIcon className="size-4 shrink-0" aria-hidden /> : null}
        {item.title}
        {isPrev ? null : <ChevronRightIcon className="size-4 shrink-0" aria-hidden />}
      </span>
    </>
  );

  if (item.external) {
    return (
      <Button
        variant="outline"
        size="lg"
        nativeButton={false}
        render={<a href={item.href} />}
        className={className}
      >
        {content}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="lg"
      nativeButton={false}
      render={<Link href={item.href} />}
      className={className}
    >
      {content}
    </Button>
  );
}

export function DocsPager({ prev, next }: DocsPagerProps) {
  const t = useTranslations("Docs");

  if (!prev && !next) return null;

  return (
    <nav
      aria-label={t("pagerNav")}
      className="mt-12 flex items-stretch justify-between gap-4 border-t border-border pt-8"
    >
      {prev ? <PagerButton item={prev} direction="prev" /> : <div className="flex-1" />}
      {next ? <PagerButton item={next} direction="next" /> : <div className="flex-1" />}
    </nav>
  );
}
