"use client";

import { ChevronRightIcon } from "lucide-react";
import { getCardType, useViraMask } from "@virastack/mask";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/routing";

type DemoForm = {
  phone: string;
  card: string;
};

export function MaskDemo() {
  const t = useTranslations("Mask");
  const form = useForm<DemoForm>({
    defaultValues: { phone: "", card: "" },
  });

  const { phone, card } = useViraMask({
    form,
    schema: {
      phone: "phone",
      card: "card",
    },
  });

  const { rawValue: phoneRaw, ...phoneProps } = phone;
  const { rawValue: cardRaw, ...cardProps } = card;
  const cardType = getCardType(cardRaw);

  return (
    <section id="demo" className="mx-auto max-w-3xl scroll-mt-28 px-6 py-16">
      <Reveal className="mx-auto w-full max-w-md">
        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="mask-demo-phone">{t("demoPhoneLabel")}</Label>
              <Input id="mask-demo-phone" {...phoneProps} placeholder="(555) 555 55 55" />
              <p className="font-mono text-xs text-muted-foreground">
                {t("demoRawLabel")}: {phoneRaw || "—"}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="mask-demo-card">{t("demoCardLabel")}</Label>
                {cardType !== "unknown" ? (
                  <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    {cardType}
                  </span>
                ) : null}
              </div>
              <Input id="mask-demo-card" {...cardProps} placeholder="0000 0000 0000 0000" />
              <p className="font-mono text-xs text-muted-foreground">
                {t("demoRawLabel")}: {cardRaw || "—"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="/mask/docs/examples" />}
          >
            <span>{t("demoMoreExamples")}</span>
            <ChevronRightIcon
              data-icon="inline-end"
              className="transition-transform duration-200 ease-out group-hover/button:translate-x-0.5"
            />
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
