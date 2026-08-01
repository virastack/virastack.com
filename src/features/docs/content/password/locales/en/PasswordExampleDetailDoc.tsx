import { getTranslations } from "next-intl/server";

import { ComponentPreview } from "@/components/shared/ComponentPreview";
import { DocsCodeBlock } from "@/components/shared/DocsCodeBlock";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordDemo } from "@/features/docs/components/PasswordDemo";
import { getPasswordExample } from "@/features/docs/config/password-docs.config";
import { Link } from "@/i18n/routing";

type PasswordExampleDetailDocProps = {
  id: string;
};

export async function PasswordExampleDetailDoc({ id }: PasswordExampleDetailDocProps) {
  const t = await getTranslations("DocsPassword");
  const example = getPasswordExample(id, t);
  if (!example) return null;

  return (
    <>
      <DocsPageHeader title={example.title} description={example.description} />
      <DocsProse>
        <p>
          <Link href="/password/docs/examples">← All examples</Link>
          <span className="mx-2 text-border">·</span>
          <code>{example.variant}</code>
        </p>

        <h2 id="onizleme">Preview</h2>
        <ComponentPreview preview={<PasswordDemo variant={example.variant} />} code={example.code}>
          <DocsCodeBlock code={example.code} lang="tsx" />
        </ComponentPreview>

        <h2 id="detaylar">Details</h2>
        <ul>
          {example.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>

        <p>
          For the hook API see{" "}
          <Link href="/password/docs/use-vira-password">useViraPassword()</Link>, for styling and
          icons see <Link href="/password/docs/customization">customization</Link>.
        </p>
      </DocsProse>
    </>
  );
}
