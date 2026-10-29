import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { StatusIcon } from "@/features/docs/components/StatusIcon";
import { docsRichTags } from "@/features/docs/lib/docs-rich-tags";

const GEMINI_SETTINGS = `{ "context": { "fileName": ["AGENTS.md", "GEMINI.md"] } }`;
const AIDER_SETTINGS = `read: AGENTS.md`;

function Supported({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <StatusIcon status="yes" label={label} />
      {children}
    </span>
  );
}

function NotSupported({ label }: { label: string }) {
  return <StatusIcon status="no" label={label} />;
}

export function AiSupportedToolsDoc() {
  const t = useTranslations("DocsAi");
  const yes = t("supportedToolsYes");
  const no = t("supportedToolsNo");

  return (
    <>
      <DocsPageHeader
        title={t("supportedToolsTitle")}
        description={t("supportedToolsHeaderDesc")}
      />
      <DocsProse>
        <h2 id="tools">{t("supportedToolsHeadingTools")}</h2>
        <p>{t.rich("supportedToolsP", docsRichTags)}</p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>{t("supportedToolsColTool")}</th>
                <th>{t("supportedToolsColNative")}</th>
                <th>{t("supportedToolsColMap")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <AcademyBadge kind="claudeCode" />
                </td>
                <td>
                  <Supported label={yes}>
                    <code>.claude/rules/virastack/</code>
                  </Supported>
                </td>
                <td>
                  <Supported label={yes} />
                </td>
              </tr>
              <tr>
                <td>
                  <AcademyBadge kind="cursor" />
                </td>
                <td>
                  <Supported label={yes}>
                    <code>.cursor/rules/virastack/</code>
                  </Supported>
                </td>
                <td>
                  <Supported label={yes} />
                </td>
              </tr>
              <tr>
                <td>
                  <AcademyBadge kind="codex" />
                </td>
                <td>
                  <NotSupported label={no} />
                </td>
                <td>
                  <Supported label={yes} />
                </td>
              </tr>
              <tr>
                <td>
                  <AcademyBadge kind="copilot" />
                </td>
                <td>
                  <NotSupported label={no} />
                </td>
                <td>
                  <Supported label={yes} />
                </td>
              </tr>
              <tr>
                <td>
                  <AcademyBadge kind="geminiCli" />
                </td>
                <td>
                  <NotSupported label={no} />
                </td>
                <td>
                  <Supported label={yes}>{t("supportedToolsOneSetting")}</Supported>
                </td>
              </tr>
              <tr>
                <td>Aider</td>
                <td>
                  <NotSupported label={no} />
                </td>
                <td>
                  <Supported label={yes}>{t("supportedToolsOneSetting")}</Supported>
                </td>
              </tr>
              <tr>
                <td>{t("supportedToolsOthers")}</td>
                <td>
                  <NotSupported label={no} />
                </td>
                <td>
                  <Supported label={yes} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>{t.rich("supportedToolsMapP", docsRichTags)}</p>

        <h2 id="gemini-cli">{t("supportedToolsHeadingGemini")}</h2>
        <p>{t.rich("supportedToolsGeminiP", docsRichTags)}</p>
        <pre>
          <code>{GEMINI_SETTINGS}</code>
        </pre>

        <h2 id="aider">{t("supportedToolsHeadingAider")}</h2>
        <p>{t.rich("supportedToolsAiderP", docsRichTags)}</p>
        <pre>
          <code>{AIDER_SETTINGS}</code>
        </pre>

        <h2 id="frameworks">{t("supportedToolsHeadingFrameworks")}</h2>
        <ul>
          <li>{t.rich("supportedToolsFrameworkNext", docsRichTags)}</li>
          <li>{t.rich("supportedToolsFrameworkTanstack", docsRichTags)}</li>
          <li>{t.rich("supportedToolsFrameworkDetect", docsRichTags)}</li>
        </ul>
      </DocsProse>
    </>
  );
}
