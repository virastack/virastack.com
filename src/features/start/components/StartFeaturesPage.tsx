import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { StartFeatureCatalog } from "@/features/start/components/StartFeatureCatalog";
import { Link } from "@/i18n/routing";

const HOW_STEPS = ["add", "page", "api"] as const;

const codeTag = (chunks: ReactNode) => (
  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs whitespace-nowrap text-foreground">
    {chunks}
  </code>
);

/** Install, put on a page, connect the API: the path every module takes after the catalog. */
function HowToAdd() {
  const t = useTranslations("StartFeatureCatalog.how");

  return (
    <section aria-labelledby="how-to-add" className="space-y-6">
      <h2 id="how-to-add" className="text-xl font-semibold text-foreground">
        {t("title")}
      </h2>
      <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {HOW_STEPS.map((step, index) => (
          <li key={step} className="flex gap-3">
            <span
              aria-hidden
              className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground tabular-nums"
            >
              {index + 1}
            </span>
            <div className="min-w-0 space-y-1">
              <h3 className="text-sm font-medium text-foreground">{t(`${step}Title`)}</h3>
              <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                {t.rich(`${step}Desc`, { code: codeTag })}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
        {t.rich("requirement", {
          code: codeTag,
          link: (chunks) => (
            <Link
              href="/start/docs/modules"
              className="font-medium text-foreground underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>
    </section>
  );
}

export function StartFeaturesPage() {
  const t = useTranslations("StartFeatureCatalog");

  return (
    <div className="mx-auto flex w-full max-w-5xl min-w-0 flex-col gap-10 px-6 pt-28 pb-24">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight text-balance text-foreground lg:text-5xl">
          {t("title")}
        </h1>
        <p className="text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          {t("description")}
        </p>
      </header>

      <HowToAdd />

      <StartFeatureCatalog />
    </div>
  );
}
