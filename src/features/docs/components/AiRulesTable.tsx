import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { aiRules, type AiRuleId } from "@/features/docs/config/ai-rules.config";
import { docsRichTags } from "@/features/docs/lib/docs-rich-tags";

/** The rule catalog, read from the rules config so ids and paths stay in one place. */
export function AiRulesTable() {
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

  const onlyLabels = {
    nextjs: t.rich("rulesOnlyNextjs", docsRichTags),
    tanstack: t.rich("rulesOnlyTanstack", docsRichTags),
    i18n: t("rulesOnlyI18n"),
  };

  return (
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
          {aiRules.map((rule) => (
            <tr key={rule.id}>
              <td className="align-top whitespace-nowrap">
                <code>{rule.id}</code>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
