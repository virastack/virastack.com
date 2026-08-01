"use client";

import { useTranslations } from "next-intl";

import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskCreditCardDemo } from "@/features/docs/components/MaskCreditCardDemo";
import { MaskPresetDemo } from "@/features/docs/components/MaskPresetDemo";
import { getMaskExampleGroups, getMaskExamples } from "@/features/docs/config/mask-docs.config";
import { Link } from "@/i18n/routing";

export function MaskExamplesDoc() {
  const t = useTranslations("DocsMask");
  const groups = getMaskExampleGroups(t);
  const examples = getMaskExamples(t);

  return (
    <>
      <DocsPageHeader title={t("examplesTitle")} description={t("examplesPageHeaderDescription")} />
      <DocsProse>
        {groups.map((group) => {
          const items = examples.filter((example) => example.group === group.id);
          if (items.length === 0) return null;

          return (
            <section key={group.id} className="space-y-4">
              <h2 id={group.id}>{group.title}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {items.map((example) => (
                  <div
                    key={example.id}
                    className={
                      example.id === "credit-card"
                        ? "flex flex-col gap-3 rounded-xl bg-background p-4 sm:col-span-2"
                        : "flex flex-col gap-3 rounded-xl bg-background p-4"
                    }
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <Link
                        href={`/mask/docs/examples/${example.id}`}
                        className="font-semibold text-foreground no-underline hover:underline"
                      >
                        {example.title}
                      </Link>
                      {example.preset ? (
                        <code>{example.preset}</code>
                      ) : (
                        <code>{t("exampleDetailSchemaFallback")}</code>
                      )}
                    </div>
                    {example.id === "credit-card" ? (
                      <MaskCreditCardDemo />
                    ) : example.preset ? (
                      <MaskPresetDemo preset={example.preset} placeholder={example.placeholder} />
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </DocsProse>
    </>
  );
}
