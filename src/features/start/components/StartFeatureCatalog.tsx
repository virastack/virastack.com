"use client";

import { Suspense } from "react";
import Image from "next/image";

import { SearchIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { debounce, parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import {
  featureGroups,
  visibleFeatures,
  visibleGroups,
  type FeatureGroup,
  type FeatureId,
  type FeatureStatus,
} from "@/config/start-modules.config";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import {
  filterPillClassName,
  filterPillStateClassName,
} from "@/features/start/helpers/filter-pill";
import { Link } from "@/i18n/routing";

/** Modules with screenshots in `public/start/features/`: `<id>-<locale>-<light|dark>.webp`. */
const PREVIEW_IMAGE_IDS: readonly FeatureId[] = [
  "users",
  "checkout-address",
  "checkout-card",
  "products",
  "cart",
];

const STATUS_RANK: Record<FeatureStatus, number> = { ready: 0, building: 1, planned: 2 };

function hasPreviewImage(id: FeatureId): boolean {
  return PREVIEW_IMAGE_IDS.includes(id);
}

const SEARCH_DEBOUNCE_MS = 300;

const catalogParams = {
  group: parseAsStringLiteral(visibleGroups),
  q: parseAsString.withDefault(""),
};

type CatalogViewProps = {
  group: FeatureGroup | null;
  search: string;
  onGroupChange: (group: FeatureGroup | null) => void;
  onSearchChange: (search: string) => void;
};

function CatalogView({ group, search, onGroupChange, onSearchChange }: CatalogViewProps) {
  const t = useTranslations("StartFeatureCatalog");
  const locale = useLocale();

  const query = search.trim().toLocaleLowerCase(locale);
  // A group shows its own order. "All" puts ready modules first, then building, then planned,
  // each by group and then by order.
  const features = visibleFeatures
    .filter(
      (feature) =>
        (!group || feature.group === group) &&
        [
          feature.id,
          t(`names.${feature.id}`),
          t(`items.${feature.id}`),
          ...(feature.packages ?? []),
        ]
          .join(" ")
          .toLocaleLowerCase(locale)
          .includes(query),
    )
    .toSorted(
      (a, b) =>
        (group ? 0 : STATUS_RANK[a.status] - STATUS_RANK[b.status]) ||
        featureGroups.indexOf(a.group) - featureGroups.indexOf(b.group) ||
        a.order - b.order,
    );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label={t("filterLabel")} className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={group === null}
            onClick={() => onGroupChange(null)}
            className={cn(filterPillClassName, filterPillStateClassName(group === null), "gap-1.5")}
          >
            {t("filterAll")}
            <span className="text-xs text-muted-foreground tabular-nums">
              {visibleFeatures.length}
            </span>
          </button>
          {visibleGroups.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={group === item}
              onClick={() => onGroupChange(item)}
              className={cn(
                filterPillClassName,
                filterPillStateClassName(group === item),
                "gap-1.5",
              )}
            >
              {t(`group.${item}`)}
              <span className="text-xs text-muted-foreground tabular-nums">
                {visibleFeatures.filter((feature) => feature.group === item).length}
              </span>
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64 md:shrink-0">
          <SearchIcon
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={t("searchPlaceholder")}
            aria-label={t("searchPlaceholder")}
            className="pl-9"
          />
        </div>
      </div>

      {features.length === 0 ? (
        <p role="status" className="py-8 text-center text-sm text-muted-foreground">
          {t("searchEmpty")}
        </p>
      ) : null}

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <li
            key={feature.id}
            id={feature.id}
            className={cn(
              "group relative scroll-mt-32 rounded-3xl border border-border bg-muted/40 p-1 transition-colors duration-150 ease-out hover:bg-muted/70",
              feature.status !== "ready" && "border-dashed",
            )}
          >
            <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-border bg-background">
              {hasPreviewImage(feature.id) ? (
                <>
                  <Image
                    src={`/start/features/${feature.id}-${locale}-light.webp`}
                    alt=""
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover dark:hidden"
                  />
                  <Image
                    src={`/start/features/${feature.id}-${locale}-dark.webp`}
                    alt=""
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="hidden object-cover dark:block"
                  />
                </>
              ) : (
                <p className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  {feature.status === "planned"
                    ? t("detail.plannedTitle")
                    : t("detail.underConstructionTitle")}
                </p>
              )}
            </div>
            <div className="flex items-baseline justify-between gap-3 p-2">
              <h3 className="min-w-0 text-sm font-medium tracking-tight text-foreground">
                <Link
                  href={`/start/features/${feature.id}`}
                  className="outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:ring-2 focus-visible:after:ring-ring"
                >
                  {t(`names.${feature.id}`)}
                </Link>
              </h3>
              <span className="shrink-0 text-sm text-muted-foreground">
                {t(`group.${feature.group}`)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Group and search live in the URL, so a filtered list can be shared and survives going back. */
function UrlCatalog() {
  const [{ group, q }, setParams] = useQueryStates(catalogParams);

  return (
    <CatalogView
      group={group}
      search={q}
      onGroupChange={(value) => setParams({ group: value })}
      onSearchChange={(value) =>
        setParams({ q: value || null }, { limitUrlUpdates: debounce(SEARCH_DEBOUNCE_MS) })
      }
    />
  );
}

export function StartFeatureCatalog() {
  return (
    <NuqsAdapter>
      {/* The fallback is the unfiltered list, so the static HTML still holds every card. */}
      <Suspense
        fallback={
          <CatalogView group={null} search="" onGroupChange={() => {}} onSearchChange={() => {}} />
        }
      >
        <UrlCatalog />
      </Suspense>
    </NuqsAdapter>
  );
}
