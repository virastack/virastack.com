import { useTranslations } from "next-intl";

import { convertNpmCommand } from "@/lib/convert-npm-command";

import { CodeBlockCommand } from "@/components/code-block-command";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { docsRichTags } from "@/features/docs/lib/docs-rich-tags";

const OWN_RULES = `.claude/rules/
├── virastack/        # managed by ViraStack AI
└── team.md           # yours
.cursor/rules/
├── virastack/        # managed by ViraStack AI
└── team.mdc          # yours`;

const OVERRIDE = `## Project rules

- Ignore the ViraStack \`testing\` rule: this project uses Playwright for end-to-end tests.`;

export function AiCustomizationDoc() {
  const t = useTranslations("DocsAi");

  return (
    <>
      <DocsPageHeader title={t("customizationTitle")} description={t("customizationHeaderDesc")} />
      <DocsProse>
        <h2 id="own-rules">{t("customizationHeadingOwn")}</h2>
        <p>{t.rich("customizationOwnP", docsRichTags)}</p>
        <pre>
          <code>{OWN_RULES}</code>
        </pre>
        <p>{t.rich("customizationOwnAgents", docsRichTags)}</p>

        <h2 id="override">{t("customizationHeadingOverride")}</h2>
        <p>{t.rich("customizationOverrideP", docsRichTags)}</p>
        <pre>
          <code>{OVERRIDE}</code>
        </pre>

        <h2 id="editing">{t("customizationHeadingEditing")}</h2>
        <ul>
          <li>{t.rich("customizationEditingAsk", docsRichTags)}</li>
          <li>{t.rich("customizationEditingCi", docsRichTags)}</li>
          <li>{t.rich("customizationEditingRemove", docsRichTags)}</li>
        </ul>
        <p>{t.rich("customizationEditingPrefer", docsRichTags)}</p>

        <h2 id="force">{t("customizationHeadingForce")}</h2>
        <p>{t.rich("customizationForceP", docsRichTags)}</p>
        <CodeBlockCommand {...convertNpmCommand("npx @virastack/ai init --force")} />
        <p>{t.rich("customizationForceSafe", docsRichTags)}</p>
      </DocsProse>
    </>
  );
}
