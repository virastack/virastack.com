import { ChevronRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site.config";

import { GithubIcon } from "@/components/icons";
import { ProductDots } from "@/components/shared/ProductDots";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/ui/button";
import { Link } from "@/i18n/routing";

export function Hero() {
  const t = useTranslations("Home");

  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 pt-36 pb-28 text-center">
      <p className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
        {t("heroBadge")}
      </p>

      <h1 className="mb-2 text-center text-[7.5vw] leading-tight font-bold tracking-tight text-balance text-foreground sm:text-5xl sm:leading-tight md:text-6xl lg:text-[72px] lg:leading-[92px]">
        {t.rich("heroTitle", {
          line: (chunks) => <span className="block whitespace-nowrap">{chunks}</span>,
          learn: (chunks) => <span className="text-green-600 dark:text-green-500">{chunks}</span>,
          start: (chunks) => <span className="text-teal-600 dark:text-teal-500">{chunks}</span>,
          build: (chunks) => <span className="text-indigo-500">{chunks}</span>,
        })}
      </h1>

      <p className="max-w-2xl text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
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
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/start/docs" />}
          >
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

        <ProductDots label={t("productDots")} autoplay align="center" />
      </Reveal>
    </section>
  );
}
