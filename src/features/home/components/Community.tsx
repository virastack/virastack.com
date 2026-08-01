import { StarIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site.config";

import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { Button } from "@/ui/button";

export function Community() {
  const t = useTranslations("Home");

  return (
    <section id="community" className="mx-auto max-w-3xl px-6 py-16 text-center">
      <RevealGroup className="mb-8">
        <RevealItem>
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            {t("communityTitle")}
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="mx-auto mt-3 max-w-xl text-base text-balance text-muted-foreground">
            {t("communityDesc")}
          </p>
        </RevealItem>
      </RevealGroup>

      <Reveal mode="view">
        <Button
          variant="outline"
          className="h-10 px-4 py-2"
          nativeButton={false}
          render={<a href={siteConfig.links.github} target="_blank" rel="noreferrer" />}
        >
          <StarIcon className="size-4" />
          <span>{t("communityGithub")}</span>
        </Button>
      </Reveal>
    </section>
  );
}
