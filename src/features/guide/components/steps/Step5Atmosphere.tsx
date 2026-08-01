"use client";

import { useEffect, useRef } from "react";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { GuideStepCta } from "@/features/guide/components/GuideStepCta";
import type { GuideStepProps } from "@/features/guide/types/guide.types";
import { Button } from "@/ui/button";

export function Step5Atmosphere({ onNext, isCompleted, isStyled }: GuideStepProps) {
  const t = useTranslations("Guide");
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const didFlash = useRef(false);

  useEffect(() => {
    if (didFlash.current) return;

    const timer = window.setTimeout(() => {
      didFlash.current = true;
      const original = document.documentElement.classList.contains("dark") ? "dark" : "light";
      const opposite = original === "dark" ? "light" : "dark";

      setTheme(opposite);
      window.setTimeout(() => {
        setTheme(original);
      }, 1000);
    }, 80);

    return () => {
      window.clearTimeout(timer);
    };
    // Flash once when the theme step first appears.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight">{t("step5Title")}</h2>
      <p className="text-lg leading-relaxed text-muted-foreground">{t("step5Body")}</p>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={!isDark ? "default" : "outline"}
          onClick={() => setTheme("light")}
        >
          <SunIcon data-icon="inline-start" />
          {t("themeLight")}
        </Button>
        <Button
          type="button"
          size="sm"
          variant={isDark ? "default" : "outline"}
          onClick={() => setTheme("dark")}
        >
          <MoonIcon data-icon="inline-start" />
          {t("themeDark")}
        </Button>
      </div>

      <p className="text-lg text-muted-foreground">
        <GuideStepCta
          label={t("step5Cta")}
          onClick={onNext}
          disabled={isCompleted}
          isStyled={isStyled}
        />
      </p>
    </section>
  );
}
