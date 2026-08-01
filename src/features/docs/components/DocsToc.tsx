"use client";

import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import type { DocsHeading } from "@/features/docs/types/docs.types";

type DocsTocProps = {
  headings: DocsHeading[];
};

export function DocsToc({ headings }: DocsTocProps) {
  const t = useTranslations("Docs");
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const top = visible[0];
        if (top?.target.id) {
          setActiveId(top.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label={t("onThisPage")} className="flex flex-col gap-3">
      <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {t("onThisPage")}
      </p>
      <ul className="flex flex-col gap-1 border-l border-border">
        {headings.map((heading) => {
          const active = activeId === heading.id;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  "-ml-px block border-l-2 py-1 text-sm transition-colors",
                  heading.level === 3 ? "pl-5" : "pl-3",
                  active
                    ? "border-foreground font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {heading.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
