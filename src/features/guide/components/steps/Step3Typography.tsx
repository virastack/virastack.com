"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { GuideStepCta } from "@/features/guide/components/GuideStepCta";
import type { GuideFont, GuideStepProps } from "@/features/guide/types/guide.types";
import { Button } from "@/ui/button";

type Step3TypographyProps = GuideStepProps & {
  font: GuideFont;
  onFontChange: (font: GuideFont) => void;
};

const fonts: GuideFont[] = ["serif", "sans", "mono"];

export function Step3Typography({
  onNext,
  isCompleted,
  isStyled,
  font,
  onFontChange,
}: Step3TypographyProps) {
  const t = useTranslations("Guide");

  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">{t("step3Title")}</h2>
      <p className="text-lg leading-relaxed text-muted-foreground">{t("step3Body")}</p>

      <div className="flex flex-wrap gap-2">
        {fonts.map((option) => (
          <Button
            key={option}
            type="button"
            size="sm"
            variant={font === option ? "default" : "outline"}
            onClick={() => onFontChange(option)}
            className={cn(
              "h-auto max-w-full px-3 py-2 text-left whitespace-normal",
              option === "serif" && "font-serif",
              option === "sans" && "font-sans",
              option === "mono" && "font-mono",
            )}
          >
            {t(option)}
          </Button>
        ))}
      </div>

      <p className="text-lg text-muted-foreground">
        <GuideStepCta
          label={t("step3Cta")}
          onClick={onNext}
          disabled={isCompleted}
          isStyled={isStyled}
        />
      </p>
    </section>
  );
}
