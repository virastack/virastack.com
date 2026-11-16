"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/** One entry of a page's table of contents; `id` is the id of the heading on the page. */
type PageTocHeading = {
  id: string;
  title: string;
  level?: 2 | 3;
};

type PageTocProps = {
  headings: readonly PageTocHeading[];
  /** Title of the list and name of the landmark, such as "On this page". */
  label: string;
};

/** The headings of the page as links; the one being read is highlighted while scrolling. */
export function PageToc({ headings, label }: PageTocProps) {
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
    <nav aria-label={label} className="flex flex-col gap-3">
      <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{label}</p>
      <ul className="flex flex-col gap-1 border-l border-border">
        {headings.map((heading) => {
          const active = activeId === heading.id;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={active ? "location" : undefined}
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
