import { useTranslations } from "next-intl";

import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { docsRichTags } from "@/features/docs/lib/docs-rich-tags";
import { Link } from "@/i18n/routing";

const OUTPUT = `ViraStack AI v2.0.0
Framework: nextjs · Agents: claude, cursor · i18n: yes · Package manager: pnpm

  ~ .claude/rules/virastack/architecture.md · updated
  + .claude/rules/virastack/i18n.md · created
  ! .claude/rules/virastack/testing.md · skipped: not an interactive terminal; use --force to overwrite
  ~ .claude/rules/virastack/nextjs.md · updated
  ~ .cursor/rules/virastack/architecture.mdc · updated
  + .cursor/rules/virastack/i18n.mdc · created
  ~ .cursor/rules/virastack/nextjs.mdc · updated
  ~ AGENTS.md · updated
  ~ .virastack/ai.json · updated

2 created · 6 updated · 0 removed · 1 skipped
ViraStack AI rules are ready.`;

const OPTIONS = [
  { flag: "--agent <list>", key: "cliOptionAgent" },
  { flag: "--framework <name>", key: "cliOptionFramework" },
  { flag: "--force, -f", key: "cliOptionForce" },
  { flag: "--dry-run", key: "cliOptionDryRun" },
  { flag: "--yes, -y", key: "cliOptionYes" },
  { flag: "--tr", key: "cliOptionTr" },
  { flag: "--help, -h", key: "cliOptionHelp" },
  { flag: "--version, -v", key: "cliOptionVersion" },
] as const;

export function AiCliDoc() {
  const t = useTranslations("DocsAi");

  return (
    <>
      <DocsPageHeader title={t("cliTitle")} description={t("cliHeaderDesc")} />
      <DocsProse>
        <h2 id="commands">{t("cliHeadingCommands")}</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>{t("cliColCommand")}</th>
                <th>{t("cliColDescription")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>init</code>
                </td>
                <td>{t.rich("cliCommandInit", docsRichTags)}</td>
              </tr>
              <tr>
                <td>
                  <code>remove</code>
                </td>
                <td>{t.rich("cliCommandRemove", docsRichTags)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="options">{t("cliHeadingOptions")}</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>{t("cliColFlag")}</th>
                <th>{t("cliColDescription")}</th>
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

        <h2 id="output">{t("cliHeadingOutput")}</h2>
        <p>{t("cliOutputP")}</p>
        <pre>
          <code>{OUTPUT}</code>
        </pre>
        <ul>
          <li>{t.rich("cliOutputCreated", docsRichTags)}</li>
          <li>{t.rich("cliOutputUpdated", docsRichTags)}</li>
          <li>{t.rich("cliOutputRemoved", docsRichTags)}</li>
          <li>{t.rich("cliOutputSkipped", docsRichTags)}</li>
        </ul>

        <h2 id="examples">{t("cliHeadingExamples")}</h2>
        <p>{t("cliExampleDryRun")}</p>
        <CodeBlockCommand {...convertNpmCommand("npx @virastack/ai init --dry-run")} />
        <p>{t("cliExampleCursor")}</p>
        <CodeBlockCommand {...convertNpmCommand("npx @virastack/ai init --agent cursor")} />
        <p>{t("cliExampleFramework")}</p>
        <CodeBlockCommand {...convertNpmCommand("npx @virastack/ai init --framework tanstack")} />
        <p>{t("cliExampleRemove")}</p>
        <CodeBlockCommand {...convertNpmCommand("npx @virastack/ai remove")} />

        <h2 id="ci">{t("cliHeadingCi")}</h2>
        <p>
          {t.rich("cliCiP", {
            ...docsRichTags,
            customization: (chunks) => <Link href="/ai/docs/customization">{chunks}</Link>,
          })}
        </p>
      </DocsProse>
    </>
  );
}
