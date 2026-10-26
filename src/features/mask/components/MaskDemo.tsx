"use client";

import { ChevronRightIcon } from "lucide-react";
import { createMask, getCardType, useViraMask } from "@virastack/mask";
import { useTranslations } from "next-intl";
import { useForm, useWatch } from "react-hook-form";

import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MaskFieldMeta } from "@/features/mask/components/MaskFieldMeta";
import { Link } from "@/i18n/routing";

type DemoForm = {
  card: string;
  code: string;
};

const masks = {
  card: "card",
  code: { mask: "aaa-999", transform: "uppercase" },
} as const;

const cardMask = createMask(masks.card);
const codeMask = createMask(masks.code);

type MaskDemoProps = {
  /** Rendered beside the hero copy: no section padding, animates on mount. */
  inHero?: boolean;
};

export function MaskDemo({ inHero = false }: MaskDemoProps) {
  const t = useTranslations("Mask");
  const form = useForm<DemoForm>({
    defaultValues: { card: "", code: "" },
  });
  const { card, code } = useViraMask(form, masks);
  const watched = useWatch({ control: form.control, name: ["card", "code"] });
  const values = { card: watched[0], code: watched[1] };
  const cardType = getCardType(values.card);

  const demo = (
    <Reveal
      className="mx-auto w-full max-w-md"
      mode={inHero ? "mount" : "view"}
      delay={inHero ? 0.15 : 0}
    >
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="mask-demo-card">{t("demoCardLabel")}</Label>
              {cardType !== "unknown" ? (
                <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {cardType}
                </span>
              ) : null}
            </div>
            <Input id="mask-demo-card" {...card} placeholder="0000 0000 0000 0000" />
            <MaskFieldMeta formValue={values.card} display={cardMask.format(values.card)} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="mask-demo-code">{t("demoCodeLabel")}</Label>
            <Input id="mask-demo-code" {...code} placeholder="ABC-123" />
            <MaskFieldMeta formValue={values.code} display={codeMask.format(values.code)} />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          nativeButton={false}
          render={<Link href="/mask/examples" />}
        >
          <span>{t("demoMoreExamples")}</span>
          <ChevronRightIcon
            data-icon="inline-end"
            className="transition-transform duration-200 ease-out group-hover/button:translate-x-0.5"
          />
        </Button>
      </div>
    </Reveal>
  );

  if (inHero) return demo;

  return (
    <section id="demo" className="mx-auto max-w-3xl scroll-mt-28 px-6 py-16">
      {demo}
    </section>
  );
}
