import type { ReactNode } from "react";

import { getLocale, getTranslations } from "next-intl/server";

import { AcademyBackLink } from "@/features/academy/components/academy-back-link";
import {
  AcademyCriterionExamples,
  type AcademyCriterionExample,
} from "@/features/academy/components/academy-criterion-examples";
import { AcademySourcesTable } from "@/features/academy/components/academy-sources-table";
import {
  collectAcademySources,
  type AcademySourceEntry,
  type AcademySourceKind,
} from "@/features/academy/lib/collect-academy-sources";

const CRITERION_EXAMPLE_COUNT = 5;

/**
 * Top sources for a criterion card, matching the table rank for that kind.
 */
function pickCriterionExamples(
  sources: readonly AcademySourceEntry[],
  kind: AcademySourceKind,
): AcademyCriterionExample[] {
  const category = kind === "engineer" ? "person" : "organization";
  return sources
    .filter((source) => source.kind === kind)
    .slice(0, CRITERION_EXAMPLE_COUNT)
    .map((source) => ({ name: source.name, category }));
}

function SourceCriterion({
  title,
  body,
  examples,
}: {
  title: string;
  body: string;
  examples: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col gap-2 rounded-lg border border-border p-4">
      <dt className="text-sm font-medium text-foreground">{title}</dt>
      <dd className="text-sm leading-relaxed text-pretty text-muted-foreground">{body}</dd>
      <dd className="mt-auto pt-3">{examples}</dd>
    </div>
  );
}

export async function AcademySourcesPageView() {
  const locale = await getLocale();
  const t = await getTranslations("Academy");
  const catalog = collectAcademySources(locale);
  const officialExamples = pickCriterionExamples(catalog.sources, "official");
  const engineerExamples = pickCriterionExamples(catalog.sources, "engineer");
  const institutionExamples = pickCriterionExamples(catalog.sources, "institution");

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-10 px-6 pt-28 pb-24">
      <div className="flex flex-col gap-4 md:gap-6">
        <AcademyBackLink />
        <header className="flex flex-col gap-8 border-b border-border pb-8">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              {t("sourcesTitle")}
            </h1>
            <p className="max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">
              {t("sourcesDescription")}
            </p>
          </div>
          <section aria-labelledby="sources-criteria-heading" className="flex flex-col gap-4">
            <h2
              id="sources-criteria-heading"
              className="text-lg font-semibold tracking-tight text-balance text-foreground"
            >
              {t("sourcesCriteriaTitle")}
            </h2>
            <dl className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <SourceCriterion
                title={t("sourcesCriteriaOfficialTitle")}
                body={t("sourcesCriteriaOfficialBody")}
                examples={
                  <AcademyCriterionExamples
                    label={t("sourcesCriteriaExamplesAria")}
                    items={officialExamples}
                  />
                }
              />
              <SourceCriterion
                title={t("sourcesCriteriaEngineerTitle")}
                body={t("sourcesCriteriaEngineerBody")}
                examples={
                  <AcademyCriterionExamples
                    label={t("sourcesCriteriaExamplesAria")}
                    items={engineerExamples}
                  />
                }
              />
              <SourceCriterion
                title={t("sourcesCriteriaInstitutionTitle")}
                body={t("sourcesCriteriaInstitutionBody")}
                examples={
                  <AcademyCriterionExamples
                    label={t("sourcesCriteriaExamplesAria")}
                    items={institutionExamples}
                  />
                }
              />
            </dl>
          </section>
        </header>
      </div>

      <AcademySourcesTable sources={catalog.sources} lastVerified={catalog.lastVerified} />
    </div>
  );
}
