import { useTranslations } from "next-intl";

import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { docsRichTags } from "@/features/docs/lib/docs-rich-tags";
import { Link } from "@/i18n/routing";

const OUTPUT = `ViraStack AI v2.0.0
Framework: nextjs · Agents: claude, cursor · i18n: no · Package manager: pnpm

  + .claude/rules/virastack/core.md · created
  + .claude/rules/virastack/architecture.md · created
  ...
  + .cursor/rules/virastack/nextjs.mdc · created
  + AGENTS.md · created
  + CLAUDE.md · created
  + .virastack/ai.json · created

27 created · 0 updated · 0 removed · 0 skipped
ViraStack AI rules are ready.`;

export function AiInstallationDoc() {
  const t = useTranslations("DocsAi");

  return (
    <>
      <DocsPageHeader title={t("installationTitle")} description={t("installationHeaderDesc")} />
      <DocsProse>
        <h2 id="requirements">{t("installationHeadingRequirements")}</h2>
        <ul>
          <li>{t.rich("installationReqNode", docsRichTags)}</li>
          <li>{t.rich("installationReqFramework", docsRichTags)}</li>
          <li>{t.rich("installationReqRoot", docsRichTags)}</li>
        </ul>

        <h2 id="install">{t("installationHeadingInstall")}</h2>
        <CodeBlockCommand {...convertNpmCommand("npx @virastack/ai init")} />
        <p>{t.rich("installationInstallP", docsRichTags)}</p>
        <pre>
          <code>{OUTPUT}</code>
        </pre>
        <p>{t.rich("installationInstallCommit", docsRichTags)}</p>

        <h2 id="choose-tools">{t("installationHeadingAgents")}</h2>
        <p>{t.rich("installationAgentsP", docsRichTags)}</p>
        <CodeBlockCommand {...convertNpmCommand("npx @virastack/ai init --agent claude")} />
        <ul>
          <li>{t.rich("installationAgentsClaude", docsRichTags)}</li>
          <li>{t.rich("installationAgentsCursor", docsRichTags)}</li>
          <li>{t.rich("installationAgentsBoth", docsRichTags)}</li>
          <li>{t.rich("installationAgentsNone", docsRichTags)}</li>
        </ul>
        <p>{t.rich("installationAgentsSaved", docsRichTags)}</p>

        <h2 id="with-start">{t("installationHeadingStart")}</h2>
        <p>
          {t.rich("installationStartP", {
            ...docsRichTags,
            start: (chunks) => <Link href="/start/docs/installation">{chunks}</Link>,
          })}
        </p>
        <CodeBlockCommand {...convertNpmCommand("npx virastack@latest add ai --agent claude")} />

        <h2 id="update">{t("installationHeadingUpdate")}</h2>
        <CodeBlockCommand {...convertNpmCommand("npx @virastack/ai@2 init")} />
        <p>
          {t.rich("installationUpdateP", {
            ...docsRichTags,
            customization: (chunks) => <Link href="/ai/docs/customization">{chunks}</Link>,
          })}
        </p>
      </DocsProse>
    </>
  );
}
