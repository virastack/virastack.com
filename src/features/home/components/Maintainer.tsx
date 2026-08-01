import { ArrowUpRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site.config";

import { GithubIcon } from "@/components/icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";

export function Maintainer() {
  const t = useTranslations("Home");
  const { author } = siteConfig;

  return (
    <section id="maintainer" className="mx-auto max-w-3xl px-6 py-16 text-center">
      <RevealGroup className="mb-8">
        <RevealItem>
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            {t("maintainerTitle")}
          </h2>
        </RevealItem>
      </RevealGroup>

      <Reveal mode="view" className="flex flex-col items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={author.avatar}
          alt=""
          width={72}
          height={72}
          className="size-[72px] rounded-full border border-border bg-muted ring-1 ring-border ring-offset-4 ring-offset-background"
        />
        <div>
          <p className="text-lg font-semibold tracking-tight">{author.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{t("maintainerRole")}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <a
            href={author.website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-foreground/80 transition-colors hover:text-foreground"
          >
            {t("maintainerWebsite")}
            <ArrowUpRightIcon className="size-3.5" aria-hidden />
          </a>
          <a
            href={author.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-foreground/80 transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-3.5" aria-hidden />
            {t("maintainerGithub")}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
