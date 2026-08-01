"use client";

import { ChevronRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Reveal } from "@/components/shared/Reveal";
import { GuideProductMark } from "@/features/guide/components/GuideRichText";
import { Button } from "@/ui/button";
import { Link } from "@/i18n/routing";

export function AiEcosystemCta() {
  const t = useTranslations("Ai");

  return (
    <section className="mx-auto max-w-3xl px-6 pt-8 pb-28 text-center">
      <Reveal>
        <h2 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">
          {t("ctaTitle")}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
          {t.rich("ctaDesc", {
            start: (chunks) => (
              <GuideProductMark id="start" linked={false}>
                {chunks}
              </GuideProductMark>
            ),
          })}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Button size="lg" nativeButton={false} render={<Link href="/start" />}>
            <span>{t("ctaStart")}</span>
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
