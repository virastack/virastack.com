import { ChevronRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site.config";

import { GithubRepoButton } from "@/components/shared/GithubRepoButton";
import { NpxInstallCommand } from "@/components/shared/NpxInstallCommand";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/ui/button";
import { Link } from "@/i18n/routing";

export function Hero() {
  const t = useTranslations("Home");

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 pt-36 pb-28 text-center">
      <h1 className="mb-2 text-center text-4xl font-black tracking-tight text-balance text-primary lg:text-6xl">
        {siteConfig.brandMark}
      </h1>

      <p className="max-w-2xl text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
        {t.rich("heroDesc", {
          bold: (chunks) => <strong className="font-semibold text-foreground">{chunks}</strong>,
          italic: (chunks) => <em className="italic">{chunks}</em>,
        })}
      </p>

      <Reveal mode="mount" delay={0.08} className="mt-2 flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button size="lg" nativeButton={false} render={<Link href="/start/docs" />}>
            <span>{t("ctaStart")}</span>
            <ChevronRightIcon
              data-icon="inline-end"
              className="transition-transform duration-200 ease-out group-hover/button:translate-x-0.5"
            />
          </Button>
          <GithubRepoButton href={siteConfig.links.github} label="virastack" />
        </div>

        <NpxInstallCommand />
      </Reveal>
    </section>
  );
}
