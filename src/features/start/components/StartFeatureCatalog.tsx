"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";

import { featureCardClassName } from "@/lib/feature-card";
import { cn } from "@/lib/utils";

import { CopyButton } from "@/components/copy-button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { featureMarks } from "@/features/start/constants/feature-tags.constants";
import {
  featureCatalog,
  featureGroups,
  type FeatureGroup,
} from "@/features/start/data/feature-catalog";
import { Link } from "@/i18n/routing";

const PackageIcon = featureMarks.packages.icon;

const badgeClassName = "inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs";

const filterClassName =
  "inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring";

function filterStateClassName(active: boolean) {
  return active ? "border-foreground/40 bg-muted" : "border-border hover:bg-muted/60";
}

export function StartFeatureCatalog() {
  const t = useTranslations("StartFeatureCatalog");
  const [group, setGroup] = useState<FeatureGroup | null>(null);

  const features = featureCatalog.filter((feature) => !group || feature.group === group);

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label={t("filterLabel")} className="flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={group === null}
          onClick={() => setGroup(null)}
          className={cn(filterClassName, filterStateClassName(group === null))}
        >
          {t("filterAll")}
        </button>
        {featureGroups.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={group === item}
            onClick={() => setGroup(item)}
            className={cn(filterClassName, filterStateClassName(group === item))}
          >
            {t(`group.${item}`)}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <li key={feature.id} className={featureCardClassName}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-mono text-base font-semibold text-foreground">
                {feature.status === "ready" ? (
                  <Link
                    href={`/start/features/${feature.id}`}
                    className="underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {feature.id}
                  </Link>
                ) : (
                  feature.id
                )}
              </h3>
              <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                {t(`status.${feature.status}`)}
              </span>
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
                  <li className="flex">
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
              <div className="flex min-w-0 items-center justify-between gap-2 rounded-md border border-border py-1 pr-1 pl-3">
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
