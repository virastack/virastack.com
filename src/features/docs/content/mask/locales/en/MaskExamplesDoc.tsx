import { getTranslations } from "next-intl/server";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DocsPageHeader, DocsProse } from "@/features/docs/components/DocsProse";
import { MaskCheckIcon } from "@/features/docs/components/MaskCheckIcon";
import { MaskCreditCardDemo } from "@/features/docs/components/MaskCreditCardDemo";
import { MaskFieldDemo } from "@/features/docs/components/MaskFieldDemo";
import {
  getMaskExampleGroups,
  getMaskExampleLabel,
  getMaskExamples,
  getMaskExampleSpec,
} from "@/features/docs/config/mask-docs.config";
import { CUSTOM_EXAMPLE_CONFIG } from "@/features/docs/content/mask/mask-example-configs";
import { MaskPasswordExample } from "@/features/docs/content/mask/MaskPasswordExample";
import { Link } from "@/i18n/routing";

export async function MaskExamplesDoc() {
  const t = await getTranslations("DocsMask");
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
                {items.map((example) => {
                  const isCreditCard = example.id === "credit-card";
                  const validationTooltip = example.check?.title;

                  return (
                    <div
                      key={example.id}
                      className={
                        isCreditCard
                          ? "flex flex-col gap-3 rounded-xl bg-background p-4 sm:col-span-2"
                          : "flex flex-col gap-3 rounded-xl bg-background p-4"
                      }
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-1.5">
                          <Link
                            href={`/mask/examples/${example.id}`}
                            className="font-semibold text-foreground no-underline hover:underline"
                          >
                            {example.title}
                          </Link>
                          {validationTooltip ? (
                            <Tooltip>
                              <TooltipTrigger
                                className="inline-flex shrink-0 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                aria-label={validationTooltip}
                              >
                                <MaskCheckIcon />
                              </TooltipTrigger>
                              <TooltipContent>{validationTooltip}</TooltipContent>
                            </Tooltip>
                          ) : null}
                        </div>
                        <code>
                          {example.id === "password"
                            ? "mask + password"
                            : (getMaskExampleLabel(example) ??
                              example.maskPattern ??
                              "card + expiry + cvv")}
                        </code>
                      </div>
                      {isCreditCard ? (
                        <MaskCreditCardDemo showMeta={false} />
                      ) : example.id === "password" ? (
                        <MaskPasswordExample />
                      ) : (
                        <MaskFieldDemo
                          config={getMaskExampleSpec(example) ?? CUSTOM_EXAMPLE_CONFIG}
                          placeholder={example.placeholder}
                          showMeta={false}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </DocsProse>
    </>
  );
}
