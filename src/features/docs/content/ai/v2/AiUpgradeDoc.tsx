import { useTranslations } from "next-intl";

import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { docsRichTags } from "@/features/docs/lib/docs-rich-tags";
import { Link } from "@/i18n/routing";

const RENAMED = [
  { from: ".cursor/rules/core-principles.mdc", to: "core" },
  { from: "docs/architecture-guide.md", to: "architecture" },
  { from: ".cursor/rules/react-best-practices.mdc", to: "react" },
  { from: ".cursor/rules/ui-components.mdc", to: "ui" },
  { from: ".cursor/rules/tanstack-query.mdc", to: "server-state" },
  { from: ".cursor/rules/state-management.mdc", to: "client-state" },
] as const;

const SAME_NAME = [
  "api",
  "forms",
  "i18n",
  "nextjs",
  "performance",
  "tanstack-start",
  "testing",
  "typescript",
] as const;

const MIGRATION_OUTPUT = `  - .cursor/rules/core-principles.mdc (v1) · removed
  - docs/architecture-guide.md (v1) · removed
  - docs/MEMORIES.md (v1) · removed
  ! .cursor/rules/ui-components.mdc (v1) · kept: v1 file you changed; delete it yourself if no longer needed`;

export function AiUpgradeDoc() {
  const t = useTranslations("DocsAi");

  return (
    <>
      <DocsPageHeader title={t("upgradeTitle")} description={t("upgradeHeaderDesc")} />
      <DocsProse>
        <h2 id="what-changed">{t("upgradeHeadingChanged")}</h2>
        <ul>
          <li>
            {t.rich("upgradeChangedLocation", {
              ...docsRichTags,
              files: (chunks) => <Link href="/ai/docs/installed-files">{chunks}</Link>,
            })}
          </li>
          <li>{t.rich("upgradeChangedDocs", docsRichTags)}</li>
          <li>{t.rich("upgradeChangedAgents", docsRichTags)}</li>
          <li>{t.rich("upgradeChangedNext", docsRichTags)}</li>
          <li>{t.rich("upgradeChangedConstants", docsRichTags)}</li>
          <li>{t.rich("upgradeChangedApiError", docsRichTags)}</li>
        </ul>

        <h2 id="renamed-rules">{t("upgradeHeadingRenamed")}</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table>
            <thead>
              <tr>
                <th>{t("upgradeColV1")}</th>
                <th>{t("upgradeColV2")}</th>
              </tr>
            </thead>
            <tbody>
              {RENAMED.map((item) => (
                <tr key={item.from}>
                  <td>
                    <code>{item.from}</code>
                  </td>
                  <td>
                    <code>{item.to}</code>
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <code>docs/MEMORIES.md</code>
                </td>
                <td>{t("upgradeRenamedRemoved")}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          {t.rich("upgradeRenamedSame", {
            ...docsRichTags,
            names: () => (
              <>
                {SAME_NAME.map((name, index) => (
                  <span key={name}>
                    {index > 0 ? ", " : null}
                    <code>{name}</code>
                  </span>
                ))}
              </>
            ),
          })}
        </p>

        <h2 id="command">{t("upgradeHeadingCommand")}</h2>
        <p>{t("upgradeCommandP")}</p>
        <CodeBlockCommand {...convertNpmCommand("npx @virastack/ai@2 init")} />
        <ul>
          <li>{t.rich("upgradeCommandDeletes", docsRichTags)}</li>
          <li>{t.rich("upgradeCommandKeeps", docsRichTags)}</li>
          <li>{t.rich("upgradeCommandAgents", docsRichTags)}</li>
          <li>{t.rich("upgradeCommandClaude", docsRichTags)}</li>
        </ul>
        <pre>
          <code>{MIGRATION_OUTPUT}</code>
        </pre>
        <p>{t.rich("upgradeCommandDryRun", docsRichTags)}</p>

        <h2 id="checklist">{t("upgradeHeadingChecklist")}</h2>
        <ul>
          <li>
            {t.rich("upgradeChecklistKept", {
              ...docsRichTags,
              customization: (chunks) => <Link href="/ai/docs/customization">{chunks}</Link>,
            })}
          </li>
          <li>{t.rich("upgradeChecklistAgents", docsRichTags)}</li>
          <li>{t.rich("upgradeChecklistMemories", docsRichTags)}</li>
          <li>{t.rich("upgradeChecklistData", docsRichTags)}</li>
          <li>{t.rich("upgradeChecklistCommit", docsRichTags)}</li>
        </ul>

        <h2 id="rollback">{t("upgradeHeadingRollback")}</h2>
        <p>{t("upgradeRollbackP")}</p>
        <CodeBlockCommand {...convertNpmCommand("npx @virastack/ai remove")} />
        <CodeBlockCommand {...convertNpmCommand("npx @virastack/ai@1 init")} />
        <p>
          {t.rich("upgradeRollbackArchive", {
            archive: (chunks) => <Link href="/ai/docs/v1">{chunks}</Link>,
          })}
        </p>
      </DocsProse>
    </>
  );
}
