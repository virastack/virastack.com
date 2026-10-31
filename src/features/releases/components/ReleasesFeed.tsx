"use client";

import { Suspense, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";

import { useTranslations } from "next-intl";

import { brandPalettes } from "@/config/brand-palettes.config";
import type { EcosystemId } from "@/config/ecosystem.config";
import { siteConfig } from "@/config/site.config";

import { cn } from "@/lib/utils";

import { Link } from "@/i18n/routing";

export type ReleaseFeedEntry = {
  id: string;
  productIds: readonly EcosystemId[];
  content: ReactNode;
};

const badgeClassName =
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring";

function badgeStateClassName(active: boolean) {
  return active ? "border-foreground/40 bg-muted" : "border-border hover:bg-muted/60";
}

function FeedView({
  entries,
  activeProduct,
}: {
  entries: readonly ReleaseFeedEntry[];
  activeProduct: EcosystemId | null;
}) {
  const t = useTranslations("ReleasesPage");
  const visible = activeProduct
    ? entries.filter((entry) => entry.productIds.includes(activeProduct))
    : entries;

  return (
    <div className="flex flex-col gap-10">
      <nav aria-label={t("filterLabel")}>
        <ul className="flex flex-wrap gap-2">
          <li>
            <Link
              href="/releases"
              scroll={false}
              aria-current={activeProduct === null ? "true" : undefined}
              className={cn(
                badgeClassName,
                badgeStateClassName(activeProduct === null),
                "font-medium text-foreground",
              )}
            >
              {t("filterAll")}
            </Link>
          </li>
          {brandPalettes.map((palette) => {
            const active = activeProduct === palette.id;

            return (
              <li key={palette.id}>
                <Link
                  href={
                    active ? "/releases" : { pathname: "/releases", query: { product: palette.id } }
                  }
                  scroll={false}
                  aria-current={active ? "true" : undefined}
                  aria-label={`${siteConfig.name} ${palette.productName}`}
                  className={cn(badgeClassName, badgeStateClassName(active))}
                >
                  <span aria-hidden className={cn("size-2 rounded-full", palette.bgClass)} />
                  <span className={cn("font-bold", palette.textClass)}>{palette.productName}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {visible.length > 0 ? (
        <div className="flex flex-col gap-12 divide-y divide-border [&>*:not(:last-child)]:pb-12">
          {visible.map((entry) => (
            <div key={entry.id}>{entry.content}</div>
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          {t("empty")}
        </p>
      )}
    </div>
  );
}

function FilteredFeed({ entries }: { entries: readonly ReleaseFeedEntry[] }) {
  const product = useSearchParams().get("product");
  const activeProduct = brandPalettes.find((palette) => palette.id === product)?.id ?? null;

  return <FeedView entries={entries} activeProduct={activeProduct} />;
}

/**
 * The filter lives in `?product=`, so a filtered list has its own link. The fallback renders
 * the full list, which keeps every note in the prerendered HTML.
 */
export function ReleasesFeed({ entries }: { entries: readonly ReleaseFeedEntry[] }) {
  return (
    <Suspense fallback={<FeedView entries={entries} activeProduct={null} />}>
      <FilteredFeed entries={entries} />
    </Suspense>
  );
}
