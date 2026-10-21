"use client";

import type { ReactNode } from "react";

import { ExternalLinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { DocsArchiveNotice } from "@/features/docs/components/DocsArchiveNotice";
import { DocsMobileNav } from "@/features/docs/components/DocsMobileNav";
import { DocsPager } from "@/features/docs/components/DocsPager";
import { DocsSidebar } from "@/features/docs/components/DocsSidebar";
import { DocsToc } from "@/features/docs/components/DocsToc";
import { DocsVersionSelect } from "@/features/docs/components/DocsVersionSelect";
import { getDocsAdjacentPages } from "@/features/docs/lib/docs-adjacent";
import type { DocsVersionLink } from "@/features/docs/lib/docs-versions";
import type { DocsHeading, DocsNavSection } from "@/features/docs/types/docs.types";

type DocsLayoutVersions = {
  /** Version id of the page being rendered. */
  current: string;
  /** One entry per version; the selector renders only when there is more than one. */
  links: DocsVersionLink[];
  /** Upgrade guide href shown in the archive notice. */
  upgradeHref: string;
};

type DocsLayoutProps = {
  sections: DocsNavSection[];
  docsIndexHref: string;
  /** Current page slug; used for prev/next pager from sidebar nav order. */
  slug: string;
  headings: DocsHeading[];
  /** Prefilled GitHub issue URL for this docs page (product repo + page). */
  githubIssueHref: string;
  versions?: DocsLayoutVersions;
  children: ReactNode;
};

/**
 * Docs shell: sticky left nav + right on-this-page TOC; article body scrolls with the page.
 */
export function DocsLayout({
  sections,
  docsIndexHref,
  slug,
  headings,
  githubIssueHref,
  versions,
  children,
}: DocsLayoutProps) {
  const t = useTranslations("Docs");
  const { prev, next } = getDocsAdjacentPages(sections, slug);
  const versionLinks = versions && versions.links.length > 1 ? versions.links : null;
  const currentVersion = versionLinks?.find((link) => link.id === versions?.current);
  const latestVersion = versionLinks?.find((link) => link.latest);
  const versionSelect =
    versions && versionLinks ? (
      <div className="mb-6 px-2">
        <DocsVersionSelect current={versions.current} links={versionLinks} />
      </div>
    ) : null;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 px-4 sm:px-6">
      <aside className="hidden w-56 shrink-0 lg:block xl:w-60">
        <div className="sticky top-25 h-[calc(100dvh-6.25rem)] overflow-y-auto py-8 pr-4">
          {versionSelect}
          <DocsSidebar sections={sections} docsIndexHref={docsIndexHref} />
        </div>
      </aside>

      <article className="min-w-0 flex-1 px-1 pt-8 pb-16 sm:px-4 lg:px-8 lg:pb-[120px]">
        <div className="mx-auto max-w-3xl">
          <DocsMobileNav
            sections={sections}
            docsIndexHref={docsIndexHref}
            versionSelect={versionSelect}
          />
          {versions && currentVersion && latestVersion && !currentVersion.latest ? (
            <DocsArchiveNotice
              versionLabel={currentVersion.label}
              latestLabel={latestVersion.label}
              upgradeHref={versions.upgradeHref}
            />
          ) : null}
          {children}
          <DocsPager prev={prev} next={next} />
        </div>
      </article>

      <aside className="hidden w-48 shrink-0 xl:block">
        <div className="sticky top-25 h-[calc(100dvh-6.25rem)] overflow-y-auto py-8 pl-4">
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
