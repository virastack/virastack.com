"use client";

import { useTranslations } from "next-intl";

import { guideStackTags } from "@/features/guide/components/GuideRichText";
import { GuideStepCta } from "@/features/guide/components/GuideStepCta";
import type { GuideStepProps } from "@/features/guide/types/guide.types";

export function Step2Foundation({ onNext, isCompleted, isStyled }: GuideStepProps) {
  const t = useTranslations("Guide");
  const stack = guideStackTags({ linked: true });

  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">{t("step2Title")}</h2>
      <p className="text-lg leading-relaxed text-muted-foreground">
        {t.rich("step2Body", {
          tailwind: stack.tailwind,
        })}
      </p>
      <p className="text-lg text-muted-foreground">
        <GuideStepCta
          label={t("step2Cta")}
          onClick={onNext}
          disabled={isCompleted}
          isStyled={isStyled}
        />
      </p>
    </section>
  );
}
