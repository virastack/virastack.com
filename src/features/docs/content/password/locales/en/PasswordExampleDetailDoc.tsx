import { getTranslations } from "next-intl/server";

import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { getPasswordExample } from "@/features/docs/config/password-docs.config";
import { PasswordExamplePreview } from "@/features/docs/content/password/examples/ExamplePreview";
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
          <Link href="/password/examples">← All examples</Link>
          <span className="mx-2 text-border">·</span>
          <code>{example.id}</code>
        </p>

        <h2 id="onizleme">Preview</h2>
        <PasswordExamplePreview id={example.id} />

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
