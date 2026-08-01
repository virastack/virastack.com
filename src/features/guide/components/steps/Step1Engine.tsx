"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { guideStackTags } from "@/features/guide/components/GuideRichText";
import { GuideStepCta } from "@/features/guide/components/GuideStepCta";
import type { GuideStepProps } from "@/features/guide/types/guide.types";

export function Step1Engine({ onNext, isCompleted, isStyled }: GuideStepProps) {
  const t = useTranslations("Guide");
  const stack = guideStackTags({ linked: true });

  return (
    <section className={cn(isStyled ? "space-y-4" : undefined)}>
      <h2
        className={cn(isStyled ? "text-3xl font-bold tracking-tight" : undefined)}
        style={isStyled ? undefined : { fontSize: "1.5em", fontWeight: "bold", margin: "0.83em 0" }}
      >
        {t("step1Title")}
      </h2>
      <p
        className={cn(isStyled ? "text-lg leading-relaxed text-muted-foreground" : undefined)}
        style={isStyled ? undefined : { margin: "1em 0" }}
      >
        {t.rich("step1Body", {
          react: stack.react,
          typescript: stack.typescript,
          nextjs: stack.nextjs,
          tanstack: stack.tanstack,
        })}
      </p>
      <p
        className={cn(isStyled ? "text-lg text-muted-foreground" : undefined)}
        style={isStyled ? undefined : { margin: "1em 0" }}
      >
        <GuideStepCta
          label={t("step1Cta")}
          onClick={onNext}
          disabled={isCompleted}
          isStyled={isStyled}
        />
      </p>
    </section>
  );
}
