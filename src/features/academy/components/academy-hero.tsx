"use client";

import type { ReactNode } from "react";

import { ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { BrandLockup } from "@/components/shared/BrandLockup";
import { GithubRepoButton } from "@/components/shared/GithubRepoButton";
import { Reveal } from "@/components/shared/Reveal";
import { ACADEMY_FEATURED_AUTHORS } from "@/features/academy/constants/featured-authors.constants";
import { guideBadgeTags } from "@/features/guide/components/GuideRichText";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { Link } from "@/i18n/routing";

type AcademyHeroProps = {
  githubHref: string;
  startHref: string;
  guideCount: number;
  resourceCount: number;
  authorCount: number;
  verifiedLabel: string | null;
};

function authorName(chunks: ReactNode): ReactNode {
  return <span className="font-medium text-foreground">{chunks}</span>;
}

export function AcademyHero({
  githubHref,
  startHref,
  guideCount,
  resourceCount,
  authorCount,
  verifiedLabel,
}: AcademyHeroProps) {
  const t = useTranslations("Academy");
  const moreAuthorCount = Math.max(0, authorCount - ACADEMY_FEATURED_AUTHORS.length);

  const trustLine = verifiedLabel
    ? t("trustLine", {
        guideCount,
        resourceCount,
        authorCount,
        verified: verifiedLabel,
      })
    : t("trustLineNoVerified", {
        guideCount,
        resourceCount,
        authorCount,
      });

  const authorsLine =
    moreAuthorCount > 0
      ? t.rich("authorsAmongSources", {
          count: moreAuthorCount,
          name: authorName,
        })
      : t.rich("authorsAmongSourcesExact", {
          name: authorName,
        });

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 pt-36 pb-16 text-center">
      <BrandLockup nameScale={0.9}>
        <span className="text-brand-academy">{t("name")}</span>
      </BrandLockup>
      <p className="max-w-2xl text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
        {t.rich("descriptionRich", guideBadgeTags())}
      </p>
      <Reveal
        mode="mount"
        delay={0.1}
        className="mt-2 flex flex-wrap items-center justify-center gap-2"
      >
        <Button size="lg" nativeButton={false} render={<a href={startHref} />}>
          <span>{t("startRoadmap")}</span>
          <ArrowDown data-icon="inline-end" aria-hidden className="size-3.5" />
        </Button>
        <GithubRepoButton href={githubHref} label="virastack/academy" />
      </Reveal>
      <div className="mt-6 flex flex-col items-center gap-3">
        <AvatarGroup>
          {ACADEMY_FEATURED_AUTHORS.map((author) => (
            <Tooltip key={author.name}>
              <TooltipTrigger
                render={
                  <a
                    href={author.href}
                    target="_blank"
                    rel="noopener"
                    className="relative z-0 rounded-full outline-none hover:z-10 focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={author.name}
                  />
                }
              >
                <Avatar size="lg">
                  <AvatarImage src={author.imageSrc} alt={author.name} />
                  <AvatarFallback>{author.initials}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>{author.name}</TooltipContent>
            </Tooltip>
          ))}
        </AvatarGroup>
        <div className="flex flex-col items-center gap-2">
          <p className="max-w-2xl text-sm text-balance text-muted-foreground">{authorsLine}</p>
          <Link
            href="/academy/sources"
            className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            {t("viewAllSources")}
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">{trustLine}</p>
      </div>
    </section>
  );
}
