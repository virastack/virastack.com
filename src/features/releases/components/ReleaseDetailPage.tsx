import type { ReactNode } from "react";

import { ArrowLeft } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import type { EcosystemLocale } from "@/config/ecosystem.config";

import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { ReleaseDate, ReleaseProducts } from "@/features/releases/components/ReleaseMeta";
import { ReleaseRichText } from "@/features/releases/components/ReleaseRichText";
import type { Release } from "@/features/releases/data/releases";
import { Link } from "@/i18n/routing";

const linkClassName =
  "font-medium text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground/60";

function ReleaseSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-1.5">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

export async function ReleaseDetailPage({ release }: { release: Release }) {
  const locale = (await getLocale()) as EcosystemLocale;
  const t = await getTranslations("ReleasesPage");
  const copy = release.copy[locale];

  return (
    <article className="mx-auto flex w-full max-w-3xl min-w-0 flex-col gap-8 px-6 pt-28 pb-24">
      <Link
        href="/releases"
        className="-my-1 inline-flex w-fit items-center gap-1 rounded-sm py-1 text-sm text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft aria-hidden className="size-4" />
        {t("backToList")}
      </Link>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <ReleaseProducts release={release} />
          <ReleaseDate release={release} />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-balance text-foreground">
          {copy.title}
        </h1>
        <p className="text-base leading-relaxed text-pretty text-muted-foreground">
          {copy.summary}
        </p>
      </header>

      <div className="space-y-6">
        <ReleaseSection title={t("whatChanged")}>
          <ReleaseRichText>{copy.whatChanged}</ReleaseRichText>
        </ReleaseSection>

        <ReleaseSection title={t("why")}>
          <ReleaseRichText>{copy.why}</ReleaseRichText>
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

        {release.commits && release.commits.length > 0 ? (
          <ReleaseSection title={t("commits")}>
            <ul className="list-disc space-y-1 pl-5">
              {release.commits.map((commit) => (
                <li key={commit.hash}>
                  <a
                    href={`https://github.com/${commit.repo}/commit/${commit.hash}`}
                    target="_blank"
                    rel="noreferrer"
                    className={linkClassName}
                  >
                    <code className="font-mono text-xs">{commit.hash.slice(0, 7)}</code>{" "}
                    {commit.title}
                  </a>
                </li>
              ))}
            </ul>
          </ReleaseSection>
        ) : null}

        {copy.migration ? (
          <ReleaseSection title={t("migration")}>
            <ReleaseRichText>{copy.migration}</ReleaseRichText>
            {release.migrationCode?.map((block) => (
              <div key={block.kind} className="space-y-2">
                <AcademyBadge kind={block.kind} />
                <DocsCodeBlock code={block.code} />
              </div>
            ))}
          </ReleaseSection>
        ) : null}
      </div>
    </article>
  );
}
