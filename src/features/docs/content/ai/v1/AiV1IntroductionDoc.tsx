import { useTranslations } from "next-intl";

import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { docsRichTags } from "@/features/docs/lib/docs-rich-tags";

const V1_RULES = [
  "api",
  "core-principles",
  "forms",
  "i18n",
  "nextjs",
  "performance",
  "react-best-practices",
  "state-management",
  "tanstack-query",
  "tanstack-start",
  "testing",
  "typescript",
  "ui-components",
] as const;

const V1_TREE = `AGENTS.md
CLAUDE.md                     # @AGENTS.md
.cursor/rules/*.mdc
docs/architecture-guide.md
docs/MEMORIES.md`;

const OPTIONS = [
  { flag: "--force, -f", key: "introductionOptionForce" },
  { flag: "--framework <name>", key: "introductionOptionFramework" },
  { flag: "--tr", key: "introductionOptionTr" },
] as const;

export function AiV1IntroductionDoc() {
  const t = useTranslations("DocsAiV1");

  return (
    <>
      <DocsPageHeader title={t("introductionTitle")} description={t("introductionHeaderDesc")} />
      <DocsProse>
        <p>{t.rich("introductionLead", docsRichTags)}</p>

        <h2 id="install">{t("introductionHeadingInstall")}</h2>
        <CodeBlockCommand {...convertNpmCommand("npx @virastack/ai@1 init")} />
        <p>{t.rich("introductionInstallP", docsRichTags)}</p>

        <h2 id="options">{t("introductionHeadingOptions")}</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>{t("introductionColFlag")}</th>
                <th>{t("introductionColDescription")}</th>
              </tr>
            </thead>
            <tbody>
              {OPTIONS.map((option) => (
                <tr key={option.flag}>
                  <td className="whitespace-nowrap">
                    <code>{option.flag}</code>
                  </td>
                  <td>{t.rich(option.key, docsRichTags)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="rules">{t("introductionHeadingRules")}</h2>
        <p>{t.rich("introductionRulesP", docsRichTags)}</p>
        <ul>
          {V1_RULES.map((rule) => (
            <li key={rule}>
              <code>{rule}.mdc</code>
            </li>
          ))}
        </ul>

        <h2 id="files">{t("introductionHeadingFiles")}</h2>
        <pre>
          <code>{V1_TREE}</code>
        </pre>
        <p>{t.rich("introductionFilesP", docsRichTags)}</p>
      </DocsProse>
    </>
  );
}
