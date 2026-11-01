import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { StartFeatureCatalog } from "@/features/start/components/StartFeatureCatalog";
import { featureMarks } from "@/features/start/constants/feature-tags.constants";

const included = ["ui", "tests", "packages", "own"] as const;

export function StartFeaturesPage() {
  const t = useTranslations("StartFeatureCatalog");

  return (
    <div className="mx-auto flex w-full max-w-5xl min-w-0 flex-col gap-10 px-6 pt-28 pb-24">
      <header className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-foreground lg:text-5xl">
            {t("title")}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            {t("description")}
          </p>
        </div>

        <section aria-label={t("included.label")}>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
            {included.map((key) => {
              const { icon: Icon, textClass } = featureMarks[key];

              return (
                <li key={key} className="flex items-start gap-2.5">
                  <Icon className={cn("mt-0.5 size-4 shrink-0", textClass)} aria-hidden />
                  <p className="min-w-0 text-sm">
                    <span className="font-medium text-foreground">{t(`included.${key}`)}</span>
                    <span className="block text-xs text-muted-foreground">
                      {t(`included.${key}Desc`)}
                    </span>
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      </header>

      <StartFeatureCatalog />
    </div>
  );
}
