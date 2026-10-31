import { ChevronRight } from "lucide-react";
import { getLocale } from "next-intl/server";

import type { EcosystemLocale } from "@/config/ecosystem.config";

import { featureCardChevronClassName, featureCardClassName } from "@/lib/feature-card";
import { cn } from "@/lib/utils";

import { ReleaseDate, ReleaseProducts } from "@/features/releases/components/ReleaseMeta";
import { getReleaseHref, type Release } from "@/features/releases/data/releases";
import { Link } from "@/i18n/routing";

export async function ReleaseCard({ release }: { release: Release }) {
  const locale = (await getLocale()) as EcosystemLocale;
  const copy = release.copy[locale];

  return (
    <article>
      <Link
        href={getReleaseHref(release)}
        className={cn(
          featureCardClassName,
          "gap-2 ring-transparent transition-[background-color,border-color,box-shadow] hover:bg-accent/30 focus-visible:ring-foreground/8",
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <ReleaseProducts release={release} />
          <ReleaseDate release={release} />
        </div>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold tracking-tight text-balance text-foreground">
            {copy.title}
          </h2>
          {/* Touch has no hover, so the arrow stays visible as the static cue. */}
          <ChevronRight
            className={cn(
              featureCardChevronClassName,
              "[@media(hover:none)]:scale-100 [@media(hover:none)]:opacity-100 [@media(hover:none)]:blur-none",
            )}
            aria-hidden
          />
        </div>
        <p className="text-sm leading-relaxed text-pretty text-muted-foreground">{copy.summary}</p>
      </Link>
    </article>
  );
}
