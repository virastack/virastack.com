import type { ReactNode } from "react";

import { getFormatter, getLocale, getTranslations } from "next-intl/server";

import { getBrandPalette } from "@/config/brand-palettes.config";
import type { EcosystemLocale } from "@/config/ecosystem.config";
import { siteConfig } from "@/config/site.config";

import { cn } from "@/lib/utils";

import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import type { Release } from "@/features/releases/data/releases";

const linkClassName =
  "font-medium text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground/60";

function ReleaseSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <div className="space-y-3 text-base leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

export async function ReleaseCard({ release }: { release: Release }) {
  const locale = (await getLocale()) as EcosystemLocale;
  const t = await getTranslations("ReleasesPage");
  const format = await getFormatter();
  const copy = release.copy[locale];

  return (
    <article id={release.id} className="scroll-mt-24 space-y-6">
      <header className="space-y-3">
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
        <h2 className="text-2xl font-semibold tracking-tight text-balance text-foreground">
          <a href={`#${release.id}`} className="transition-colors hover:text-foreground/70">
            {copy.title}
          </a>
        </h2>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {release.products.map((product) => {
            const palette = getBrandPalette(product.id);

            return (
              <li key={product.id}>
                <span className="font-semibold text-primary">{siteConfig.name}</span>{" "}
                <span className={cn("font-bold", palette.textClass)}>{palette.productName}</span>{" "}
                <code className="text-muted-foreground">v{product.version}</code>
              </li>
            );
          })}
        </ul>
      </header>

      <ReleaseSection title={t("whatChanged")}>
        <p>{copy.whatChanged}</p>
      </ReleaseSection>

      <ReleaseSection title={t("why")}>
        <p>{copy.why}</p>
      </ReleaseSection>

      {release.sources.length > 0 ? (
        <ReleaseSection title={t("sources")}>
          <ul className="list-disc space-y-1 pl-5">
            {release.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer" className={linkClassName}>
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        </ReleaseSection>
      ) : null}

      {copy.migration ? (
        <ReleaseSection title={t("migration")}>
          <p>{copy.migration}</p>
          {release.migrationCode ? <DocsCodeBlock code={release.migrationCode} /> : null}
        </ReleaseSection>
      ) : null}
    </article>
  );
}
