import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { brandPalettes } from "@/config/brand-palettes.config";
import type { EcosystemId } from "@/config/ecosystem.config";
import { siteConfig } from "@/config/site.config";

import { cn } from "@/lib/utils";

import { Link } from "@/i18n/routing";

export type ReleaseFeedEntry = {
  id: string;
  content: ReactNode;
};

const badgeClassName =
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring";

function badgeStateClassName(active: boolean) {
  return active ? "border-foreground/40 bg-muted" : "border-border hover:bg-muted/60";
}

/** Each filter is a page of its own (`/releases/start`), so a filtered list has its own link. */
export async function ReleasesFeed({
  entries,
  activeProduct,
}: {
  entries: readonly ReleaseFeedEntry[];
  activeProduct: EcosystemId | null;
}) {
  const t = await getTranslations("ReleasesPage");

  return (
    <div className="flex flex-col gap-10">
      <nav aria-label={t("filterLabel")}>
        <ul className="flex flex-wrap gap-2">
          <li>
            <Link
              href="/releases"
              scroll={false}
              aria-current={activeProduct === null ? "page" : undefined}
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
                  href={`/releases/${palette.id}`}
                  scroll={false}
                  aria-current={active ? "page" : undefined}
                  aria-label={`${siteConfig.name} ${palette.productName}`}
                  className={cn(badgeClassName, badgeStateClassName(active))}
                >
                  <span aria-hidden className={cn("size-2 rounded-full", palette.bgClass)} />
                  <span className="font-medium text-foreground">{palette.productName}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {entries.length > 0 ? (
        <ul className="flex flex-col gap-6">
          {entries.map((entry) => (
            <li key={entry.id}>{entry.content}</li>
          ))}
        </ul>
      ) : (
        <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          {t("empty")}
        </p>
      )}
    </div>
  );
}
