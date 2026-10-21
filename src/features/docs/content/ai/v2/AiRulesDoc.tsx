import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { AcademyBadgeLogo } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { aiRules, type AiRuleId } from "@/features/docs/config/ai-rules.config";
import { docsRichTags } from "@/features/docs/lib/docs-rich-tags";

export function AiRulesDoc() {
  const t = useTranslations("DocsAi");

  const summaries: Record<AiRuleId, ReactNode> = {
    core: t.rich("rulesCatalogCore", docsRichTags),
    architecture: t.rich("rulesCatalogArchitecture", docsRichTags),
    react: t.rich("rulesCatalogReact", docsRichTags),
    typescript: t.rich("rulesCatalogTypescript", docsRichTags),
    ui: t.rich("rulesCatalogUi", docsRichTags),
    forms: t.rich("rulesCatalogForms", docsRichTags),
    api: t.rich("rulesCatalogApi", docsRichTags),
    "server-state": t.rich("rulesCatalogServerState", docsRichTags),
    "client-state": t.rich("rulesCatalogClientState", docsRichTags),
    i18n: t.rich("rulesCatalogI18n", docsRichTags),
    performance: t.rich("rulesCatalogPerformance", docsRichTags),
    testing: t.rich("rulesCatalogTesting", docsRichTags),
    nextjs: t.rich("rulesCatalogNextjs", docsRichTags),
    "tanstack-start": t.rich("rulesCatalogTanstackStart", docsRichTags),
  };

  const ruleBadges: Partial<Record<AiRuleId, string>> = {
    react: "react",
    typescript: "typescript",
    "server-state": "tanstack-query",
    "client-state": "zustand",
    testing: "vitest",
    nextjs: "nextjs",
    "tanstack-start": "tanstack-start",
  };

  const onlyLabels = {
    nextjs: t.rich("rulesOnlyNextjs", docsRichTags),
    tanstack: t.rich("rulesOnlyTanstack", docsRichTags),
    i18n: t("rulesOnlyI18n"),
  };

  return (
    <>
      <DocsPageHeader title={t("rulesTitle")} description={t("rulesHeaderDesc")} />
      <DocsProse>
        <h2 id="loading">{t("rulesHeadingLoading")}</h2>
        <ul>
          <li>{t.rich("rulesLoadingAlways", docsRichTags)}</li>
          <li>{t.rich("rulesLoadingPaths", docsRichTags)}</li>
          <li>{t.rich("rulesLoadingOthers", docsRichTags)}</li>
        </ul>

        <h2 id="catalog">{t("rulesHeadingCatalog")}</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>{t("rulesColRule")}</th>
                <th>{t("rulesColCovers")}</th>
                <th>{t("rulesColLoaded")}</th>
              </tr>
            </thead>
            <tbody>
              {aiRules.map((rule) => {
                const badge = ruleBadges[rule.id];
                return (
                  <tr key={rule.id}>
                    <td className="align-top whitespace-nowrap">
                      <span className="inline-flex items-center gap-2">
                        {badge ? <AcademyBadgeLogo kind={badge} /> : null}
                        <code>{rule.id}</code>
                      </span>
                    </td>
                    <td className="align-top">
                      {summaries[rule.id]}
                      {rule.only ? (
                        <span className="mt-1 block text-xs">{onlyLabels[rule.only]}</span>
                      ) : null}
                    </td>
                    <td className="align-top">
                      {rule.paths.length === 0 ? (
                        <strong>{t("rulesAlways")}</strong>
                      ) : (
                        <span className="flex flex-col gap-1">
                          {rule.paths.map((path) => (
                            <code key={path} className="w-fit">
                              {path}
                            </code>
                          ))}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h2 id="conditional">{t("rulesHeadingConditional")}</h2>
        <ul>
          <li>{t.rich("rulesConditionalFramework", docsRichTags)}</li>
          <li>{t.rich("rulesConditionalI18n", docsRichTags)}</li>
          <li>{t.rich("rulesConditionalLines", docsRichTags)}</li>
          <li>{t.rich("rulesConditionalCommands", docsRichTags)}</li>
        </ul>
      </DocsProse>
    </>
  );
}
