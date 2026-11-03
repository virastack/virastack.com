"use client";

import { Suspense } from "react";

import { ChevronRight, SearchIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { debounce, parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { featureCardChevronClassName, featureCardClassName } from "@/lib/feature-card";
import { cn } from "@/lib/utils";

import { CopyButton } from "@/components/copy-button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { featureMarks } from "@/features/start/constants/feature-tags.constants";
import {
  visibleFeatures,
  visibleGroups,
  type FeatureGroup,
} from "@/features/start/data/feature-catalog";
import {
  filterPillClassName,
  filterPillStateClassName,
} from "@/features/start/helpers/filter-pill";
import { Link } from "@/i18n/routing";

const PackageIcon = featureMarks.packages.icon;

const badgeClassName = "inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs";

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
  const features = visibleFeatures.filter(
    (feature) =>
      (!group || feature.group === group) &&
      [feature.id, t(`names.${feature.id}`), t(`items.${feature.id}`), ...(feature.packages ?? [])]
        .join(" ")
        .toLocaleLowerCase(locale)
        .includes(query),
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

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <li
            key={feature.id}
            id={feature.id}
            className={cn(
              featureCardClassName,
              "relative scroll-mt-32 transition-colors",
              feature.status === "soon" ? "border-dashed" : "hover:bg-accent/30",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold text-foreground">
                <Link
                  href={`/start/features/${feature.id}`}
                  className="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-ring"
                >
                  {t(`names.${feature.id}`)}
                </Link>
              </h3>
              <ChevronRight className={featureCardChevronClassName} aria-hidden />
            </div>
            <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
              {t(`items.${feature.id}`)}
            </p>
            <div className="mt-auto flex flex-col gap-3 pt-1">
              <ul className="flex flex-wrap gap-1.5">
                {feature.tags.map((tag) => {
                  const { icon: Icon, textClass } = featureMarks[tag];

                  return (
                    <li key={tag} className={cn(badgeClassName, "text-foreground")}>
                      <Icon className={cn("size-3 shrink-0", textClass)} aria-hidden />
                      {t(`tag.${tag}`)}
                    </li>
                  );
                })}
                {feature.packages ? (
                  <li className="relative z-10 flex">
                    <Popover>
                      <PopoverTrigger
                        aria-label={t("packagesLabel")}
                        className={cn(
                          badgeClassName,
                          "cursor-pointer text-foreground outline-none hover:bg-muted/70 focus-visible:ring-2 focus-visible:ring-ring",
                        )}
                      >
                        <PackageIcon
                          className={cn("size-3 shrink-0", featureMarks.packages.textClass)}
                          aria-hidden
                        />
                        {t("packagesCount", { count: feature.packages.length })}
                      </PopoverTrigger>
                      <PopoverContent className="rounded-lg border border-border bg-popover p-3 text-popover-foreground shadow-md">
                        <p className="mb-2 font-medium">{t("packagesLabel")}</p>
                        <ul className="flex flex-col gap-1 font-mono text-muted-foreground">
                          {feature.packages.map((name) => (
                            <li key={name}>{name}</li>
                          ))}
                        </ul>
                      </PopoverContent>
                    </Popover>
                  </li>
                ) : null}
              </ul>
              <div className="relative z-10 flex min-w-0 items-center justify-between gap-2 rounded-md border border-border bg-card py-1 pr-1 pl-3">
                <code className="min-w-0 truncate font-mono text-xs text-foreground">
                  {`npx virastack add ${feature.id}`}
                </code>
                <CopyButton
                  text={`npx virastack add ${feature.id}`}
                  variant="ghost"
                  size="icon-sm"
                  className="shrink-0"
                />
              </div>
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
