import { useTranslations } from "next-intl";

import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { aiRules, type AiRuleId } from "@/features/docs/config/ai-rules.config";
import { docsRichTags } from "@/features/docs/lib/docs-rich-tags";

export function AiRulesDoc() {
  const t = useTranslations("DocsAi");

  const summaries: Record<AiRuleId, string> = {
    core: t("rulesCatalogCore"),
    architecture: t("rulesCatalogArchitecture"),
    react: t("rulesCatalogReact"),
    typescript: t("rulesCatalogTypescript"),
    ui: t("rulesCatalogUi"),
    forms: t("rulesCatalogForms"),
    api: t("rulesCatalogApi"),
    "server-state": t("rulesCatalogServerState"),
    "client-state": t("rulesCatalogClientState"),
    i18n: t("rulesCatalogI18n"),
    performance: t("rulesCatalogPerformance"),
    testing: t("rulesCatalogTesting"),
    nextjs: t("rulesCatalogNextjs"),
    "tanstack-start": t("rulesCatalogTanstackStart"),
  };

  const onlyLabels = {
    nextjs: t("rulesOnlyNextjs"),
    tanstack: t("rulesOnlyTanstack"),
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
