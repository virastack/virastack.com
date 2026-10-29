import { ChevronRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site.config";

import { GithubIcon } from "@/components/icons";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/ui/button";
import { Link } from "@/i18n/routing";

import { HeroBrand } from "./HeroBrand";

export function Hero() {
  const t = useTranslations("Home");

  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 pt-36 pb-28 text-center">
      <p className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
        {t("heroBadge")}
      </p>

      <HeroBrand />

      <p className="text-lg font-semibold text-balance text-primary sm:text-xl">
        {t.rich("heroTitle", {
          line: (chunks) => chunks,
          learn: (chunks) => chunks,
          start: (chunks) => chunks,
          build: (chunks) => chunks,
        })}
      </p>

      <p className="-mt-3 max-w-2xl text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
        {t("heroDesc")}
      </p>

      <Reveal mode="mount" delay={0.08} className="mt-2 flex flex-col items-center gap-5">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button size="lg" nativeButton={false} render={<Link href="/academy" />}>
            <span>{t("ctaLearn")}</span>
            <ChevronRightIcon
              data-icon="inline-end"
              className="transition-transform duration-200 ease-out group-hover/button:translate-x-0.5"
            />
          </Button>
          <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/start" />}>
            <span>{t("ctaStart")}</span>
          </Button>
          <Button
            variant="outline"
            size="icon-lg"
            nativeButton={false}
            aria-label="GitHub"
            render={<a href={siteConfig.links.github} target="_blank" rel="noreferrer" />}
          >
            <GithubIcon className="size-4" />
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
