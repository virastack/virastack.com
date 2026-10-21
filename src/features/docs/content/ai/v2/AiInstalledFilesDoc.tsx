import { useTranslations } from "next-intl";

import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { docsRichTags } from "@/features/docs/lib/docs-rich-tags";

const TREE = `.claude/rules/virastack/*.md     # --agent claude
.cursor/rules/virastack/*.mdc    # --agent cursor
.agents/rules/virastack/*.md     # --agent none
.virastack/ai.json               # manifest
AGENTS.md                        # virastack-ai block
CLAUDE.md                        # @AGENTS.md (--agent claude)`;

const AGENTS_BLOCK = `<!-- BEGIN:virastack-ai -->
# ViraStack AI

## Persona
## Commands
## Operational Guardrails
## Rules
<!-- END:virastack-ai -->`;

const MANIFEST_FIELDS = [
  { field: "$schema", key: "installedFilesFieldSchema" },
  { field: "version", key: "installedFilesFieldVersion" },
  { field: "cliVersion", key: "installedFilesFieldCliVersion" },
  { field: "framework", key: "installedFilesFieldFramework" },
  { field: "agents", key: "installedFilesFieldAgents" },
  { field: "claudeImport", key: "installedFilesFieldClaudeImport" },
  { field: "files", key: "installedFilesFieldFiles" },
] as const;

export function AiInstalledFilesDoc() {
  const t = useTranslations("DocsAi");

  return (
    <>
      <DocsPageHeader
        title={t("installedFilesTitle")}
        description={t("installedFilesHeaderDesc")}
      />
      <DocsProse>
        <h2 id="tree">{t("installedFilesHeadingTree")}</h2>
        <pre>
          <code>{TREE}</code>
        </pre>
        <p>{t.rich("installedFilesTreeP", docsRichTags)}</p>

        <h2 id="agents-md">{t("installedFilesHeadingAgents")}</h2>
        <p>{t.rich("installedFilesAgentsP", docsRichTags)}</p>
        <pre>
          <code>{AGENTS_BLOCK}</code>
        </pre>
        <ul>
          <li>{t.rich("installedFilesAgentsCommands", docsRichTags)}</li>
          <li>{t.rich("installedFilesAgentsMap", docsRichTags)}</li>
          <li>{t.rich("installedFilesAgentsOutside", docsRichTags)}</li>
        </ul>

        <h2 id="claude-md">{t("installedFilesHeadingClaude")}</h2>
        <p>{t.rich("installedFilesClaudeP", docsRichTags)}</p>

        <h2 id="manifest">{t("installedFilesHeadingManifest")}</h2>
        <p>{t.rich("installedFilesManifestP", docsRichTags)}</p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>{t("installedFilesColField")}</th>
                <th>{t("installedFilesColMeaning")}</th>
              </tr>
            </thead>
            <tbody>
              {MANIFEST_FIELDS.map((item) => (
                <tr key={item.field}>
                  <td>
                    <code>{item.field}</code>
                  </td>
                  <td>{t.rich(item.key, docsRichTags)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="managed">{t("installedFilesHeadingManaged")}</h2>
        <p>{t.rich("installedFilesManagedP", docsRichTags)}</p>
        <ul>
          <li>{t.rich("installedFilesManagedRules", docsRichTags)}</li>
          <li>{t.rich("installedFilesManagedBlock", docsRichTags)}</li>
          <li>{t.rich("installedFilesManagedImport", docsRichTags)}</li>
        </ul>
        <p>{t.rich("installedFilesManagedNot", docsRichTags)}</p>
      </DocsProse>
    </>
  );
}
