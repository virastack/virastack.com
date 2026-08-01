"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { GuideStepCta } from "@/features/guide/components/GuideStepCta";
import type { GuideStepProps } from "@/features/guide/types/guide.types";

export function Step0Content({ onNext, isCompleted, isStyled }: GuideStepProps) {
  const t = useTranslations("Guide");

  return (
    <section className={cn(isStyled ? "space-y-4" : undefined)}>
      <h1
        className={cn(isStyled ? "text-3xl font-bold tracking-tight" : undefined)}
        style={isStyled ? undefined : { fontSize: "2em", fontWeight: "bold", margin: "0.67em 0" }}
      >
        {t("step0Title")}
      </h1>
      <p
        className={cn(isStyled ? "text-lg leading-relaxed text-muted-foreground" : undefined)}
        style={isStyled ? undefined : { margin: "1em 0" }}
      >
        {t("step0Body")}
      </p>
      <p
        className={cn(isStyled ? "text-lg text-muted-foreground" : undefined)}
        style={isStyled ? undefined : { margin: "1em 0" }}
      >
        <GuideStepCta
          label={t("step0Cta")}
          onClick={onNext}
          disabled={isCompleted}
          isStyled={isStyled}
        />
      </p>
    </section>
  );
}
