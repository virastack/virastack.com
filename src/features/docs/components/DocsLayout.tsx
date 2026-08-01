"use client";

import type { ReactNode } from "react";

import { ExternalLinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { DocsMobileNav } from "@/features/docs/components/DocsMobileNav";
import { DocsPager } from "@/features/docs/components/DocsPager";
import { DocsSidebar } from "@/features/docs/components/DocsSidebar";
import { DocsToc } from "@/features/docs/components/DocsToc";
import { getDocsAdjacentPages } from "@/features/docs/lib/docs-adjacent";
import type { DocsHeading, DocsNavSection } from "@/features/docs/types/docs.types";

type DocsLayoutProps = {
  sections: DocsNavSection[];
  productLabel: ReactNode;
  docsIndexHref: string;
  /** Current page slug; used for prev/next pager from sidebar nav order. */
  slug: string;
  headings: DocsHeading[];
  /** Prefilled GitHub issue URL for this docs page (product repo + page). */
  githubIssueHref: string;
  children: ReactNode;
};

/**
 * Docs shell: sticky left nav + right on-this-page TOC; article body scrolls with the page.
 */
export function DocsLayout({
  sections,
  productLabel,
  docsIndexHref,
  slug,
  headings,
  githubIssueHref,
  children,
}: DocsLayoutProps) {
  const t = useTranslations("Docs");
  const { prev, next } = getDocsAdjacentPages(sections, slug);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 px-4 sm:px-6">
      <aside className="hidden w-56 shrink-0 lg:block xl:w-60">
        <div className="sticky top-14 h-[calc(100dvh-3.5rem)] overflow-y-auto py-8 pr-4">
          <DocsSidebar
            sections={sections}
            productLabel={productLabel}
            docsIndexHref={docsIndexHref}
          />
        </div>
      </aside>

      <article className="min-w-0 flex-1 px-1 pt-8 pb-16 sm:px-4 lg:px-8 lg:pb-[120px]">
        <div className="mx-auto max-w-3xl">
          <DocsMobileNav
            sections={sections}
            productLabel={productLabel}
            docsIndexHref={docsIndexHref}
          />
          {children}
          <DocsPager prev={prev} next={next} />
        </div>
      </article>

      <aside className="hidden w-48 shrink-0 xl:block">
        <div className="sticky top-14 h-[calc(100dvh-3.5rem)] overflow-y-auto py-8 pl-4">
          <DocsToc headings={headings} />
          <div className={headings.length > 0 ? "mt-6 border-t border-border pt-4" : undefined}>
            <a
              href={githubIssueHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs leading-none text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="italic">{t("fixIssue")}</span>
              <ExternalLinkIcon className="size-3 shrink-0" aria-hidden />
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
