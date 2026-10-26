"use client";

import { ChevronRightIcon } from "lucide-react";
import { getCardType, useViraMask } from "@virastack/mask";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

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

type MaskDemoProps = {
  /** Rendered beside the hero copy: no section padding, animates on mount. */
  inHero?: boolean;
};

export function MaskDemo({ inHero = false }: MaskDemoProps) {
  const t = useTranslations("Mask");
  const form = useForm<DemoForm>({
    defaultValues: { card: "", code: "" },
  });

  const { card, code } = useViraMask({
    form,
    schema: {
      card: "card",
      code: {
        mask: "aaa-999",
        transform: "uppercase",
      },
    },
  });

  const { rawValue: cardRaw, value: cardValue, ...cardProps } = card;
  const { rawValue: codeRaw, value: codeValue, ...codeProps } = code;
  const cardType = getCardType(cardRaw);

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
            <Input
              id="mask-demo-card"
              {...cardProps}
              value={cardValue}
              placeholder="0000 0000 0000 0000"
            />
            <MaskFieldMeta rawValue={cardRaw} value={cardValue} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="mask-demo-code">{t("demoCodeLabel")}</Label>
            <Input id="mask-demo-code" {...codeProps} value={codeValue} placeholder="ABC-123" />
            <MaskFieldMeta rawValue={codeRaw} value={codeValue} />
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
