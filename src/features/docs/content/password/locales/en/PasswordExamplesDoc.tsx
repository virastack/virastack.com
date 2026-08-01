import { getTranslations } from "next-intl/server";

import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { PasswordDemo } from "@/features/docs/components/PasswordDemo";
import { getPasswordExamples } from "@/features/docs/config/password-docs.config";
import { Link } from "@/i18n/routing";

export async function PasswordExamplesDoc() {
  const t = await getTranslations("DocsPassword");
  const passwordExamples = getPasswordExamples(t);

  return (
    <>
      <DocsPageHeader
        title="Examples"
        description="Live previews. Click a title for details and code."
      />
      <DocsProse>
        <h2 id="tum">All examples</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {passwordExamples.map((example) => (
            <div key={example.id} className="flex flex-col gap-3 rounded-xl bg-background p-4">
              <div className="flex items-baseline justify-between gap-2">
                <Link
                  href={`/password/docs/examples/${example.id}`}
                  className="font-semibold text-foreground no-underline hover:underline"
                >
                  {example.title}
                </Link>
                <code>{example.variant}</code>
              </div>
              <PasswordDemo variant={example.variant} />
            </div>
          ))}
        </div>
      </DocsProse>
    </>
  );
}
