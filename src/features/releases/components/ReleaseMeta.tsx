import { Rocket, Sparkles, Wrench } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";

import { getBrandPalette } from "@/config/brand-palettes.config";
import { siteConfig } from "@/config/site.config";

import { cn } from "@/lib/utils";

import { getReleaseType, type Release } from "@/features/releases/data/releases";

export async function ReleaseDate({ release }: { release: Release }) {
  const t = await getTranslations("ReleasesPage");
  const format = await getFormatter();

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
      <time dateTime={release.date}>
        {format.dateTime(new Date(release.date), { dateStyle: "long", timeZone: "UTC" })}
      </time>
      {release.draft ? (
        <span className="rounded-full border border-dashed border-border px-2 py-0.5 text-xs font-medium">
          {t("draft")}
        </span>
      ) : null}
    </div>
  );
}

const releaseTypes = {
  major: { label: "Major", Icon: Rocket },
  minor: { label: "Minor", Icon: Sparkles },
  patch: { label: "Patch", Icon: Wrench },
} as const;

function ReleaseType({ version }: { version: string }) {
  const { label, Icon } = releaseTypes[getReleaseType(version)];

  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
      <Icon aria-hidden className="size-3" />
      {label}
    </span>
  );
}

export function ReleaseProducts({ release }: { release: Release }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
      {release.products.map((product) => {
        const palette = getBrandPalette(product.id);

        return (
          <li key={product.id} className="inline-flex items-center gap-1.5">
            <span aria-hidden className={cn("size-2 rounded-full", palette.bgClass)} />
            <span className="font-medium text-foreground">
              {siteConfig.name} {palette.productName}
            </span>
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
              v{product.version}
            </code>
            <ReleaseType version={product.version} />
          </li>
        );
      })}
    </ul>
  );
}
