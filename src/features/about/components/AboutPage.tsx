import type { ReactNode } from "react";

import { ChevronRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { brandPalettes } from "@/config/brand-palettes.config";
import { siteConfig } from "@/config/site.config";

import { cn } from "@/lib/utils";

import { GithubRepoButton } from "@/components/shared/GithubRepoButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { AboutTimeline } from "@/features/about/components/AboutTimeline";
import { AcademyBadge } from "@/features/academy/components/academy-badge";
import { GuideProductMark, guideProductTags } from "@/features/guide/components/GuideRichText";
import { Button } from "@/ui/button";
import { Link } from "@/i18n/routing";

const academyPalette = brandPalettes.find((palette) => palette.id === "academy");

/** Order matches the copy: complement, headless and typed, Turkey-ready, evidence. */
const principleIds = [1, 2, 3, 4] as const;

const linkClassName =
  "font-medium text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground/60";

function richHandlers() {
  const products = guideProductTags({
    ids: ["start", "ai", "mask", "password", "address", "guide"],
    linked: true,
  });

  return {
    bold: (chunks: ReactNode) => (
      <strong className="font-semibold text-foreground">{chunks}</strong>
    ),
    italic: (chunks: ReactNode) => <em className="italic">{chunks}</em>,
    turkuaz: (chunks: ReactNode) => (
      <a href="https://turkuazcss.com" target="_blank" rel="noreferrer" className={linkClassName}>
        {chunks}
      </a>
    ),
    shadcn: (chunks: ReactNode) => (
      <a href="https://shadcn.com/" target="_blank" rel="noreferrer" className={linkClassName}>
        {chunks}
      </a>
    ),
    tanner: (chunks: ReactNode) => (
      <a
        href="https://tannerlinsley.com/about"
        target="_blank"
        rel="noreferrer"
        className={linkClassName}
      >
        {chunks}
      </a>
    ),
    tanstack: (chunks: ReactNode) => (
      <a href="https://tanstack.com" target="_blank" rel="noreferrer" className={linkClassName}>
        {chunks}
      </a>
    ),
    start: products.start,
    ai: products.ai,
    mask: products.mask,
    academy: (chunks: ReactNode) => (
      <Link
        href="/academy"
        className="mx-0.5 inline whitespace-nowrap underline-offset-2 transition-opacity hover:underline hover:opacity-90"
      >
        <span className="font-semibold text-primary">{siteConfig.name}</span>{" "}
        <span className={cn("font-bold", academyPalette?.textClass)}>{chunks}</span>
      </Link>
    ),
    sources: (chunks: ReactNode) => (
      <Link href="/academy/sources" className={linkClassName}>
        {chunks}
      </Link>
    ),
    password: products.password,
    address: products.address,
    guide: products.guide,
    react: () => <AcademyBadge kind="react" />,
    virastack: () => <AcademyBadge kind="virastack" />,
    nextjs: () => <AcademyBadge kind="nextjs" />,
    tanstackstart: () => <AcademyBadge kind="tanstack-start" />,
    tanstackbadge: () => <AcademyBadge kind="tanstack-start" label="TanStack" />,
    rhf: () => <AcademyBadge kind="react-hook-form" />,
  };
}

function StorySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <RevealItem>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">{children}</div>
      </section>
    </RevealItem>
  );
}

export function AboutPage() {
  const t = useTranslations("AboutPage");
  const rich = richHandlers();

  return (
    <div className="mx-auto max-w-2xl px-6 pt-20 pb-28 sm:pt-28">
      <RevealGroup className="space-y-12">
        <RevealItem>
          <header className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-foreground lg:text-5xl">
              {t("title")}
            </h1>
            <p className="text-base leading-relaxed text-balance text-muted-foreground sm:text-lg">
              {t.rich("intro", rich)}
            </p>
          </header>
        </RevealItem>

        <StorySection title={t("whatTitle")}>
          <p>{t.rich("whatBody1", rich)}</p>
          <p>{t.rich("whatBody2", rich)}</p>
        </StorySection>

        <StorySection title={t("learnTitle")}>
          <p>{t.rich("learnBody", rich)}</p>
        </StorySection>

        <StorySection title={t("formTitle")}>
          <p>{t.rich("formBody", rich)}</p>
        </StorySection>

        <StorySection title={t("principlesTitle")}>
          <p>{t("principlesIntro")}</p>
          <ol className="space-y-4">
            {principleIds.map((id, index) => (
              <li key={id} className="flex gap-4">
                <span className="mt-0.5 font-mono text-sm text-muted-foreground/70 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">{t(`principle${id}Title`)}</h3>
                  <p>{t.rich(`principle${id}Body`, rich)}</p>
                </div>
              </li>
            ))}
          </ol>
        </StorySection>

        <StorySection title={t("nameTitle")}>
          <p>{t.rich("nameBody1", rich)}</p>
          <p>{t.rich("nameBody2", rich)}</p>
          <p>{t.rich("nameBody3", rich)}</p>
        </StorySection>

        <StorySection title={t("refsTitle")}>
          <p>{t.rich("refsBody", rich)}</p>
        </StorySection>

        <RevealItem>
          <section className="space-y-6">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              {t("closeTitle")}
            </h2>
            <AboutTimeline />
            <p className="text-base leading-relaxed text-muted-foreground">
              {t.rich("closeBody", rich)}
            </p>
          </section>
        </RevealItem>

        <RevealItem>
          <div className="flex flex-wrap items-center gap-2 border-t border-border pt-10">
            <Button size="lg" nativeButton={false} render={<Link href="/start" />}>
              <span>
                {t.rich("ctaStart", {
                  start: (chunks) => (
                    <GuideProductMark
                      id="start"
                      linked={false}
                      brandClassName="font-semibold text-primary-foreground"
                    >
                      {chunks}
                    </GuideProductMark>
                  ),
                })}
              </span>
              <ChevronRightIcon
                data-icon="inline-end"
                className="transition-transform duration-200 ease-out group-hover/button:translate-x-0.5"
              />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/support" />}
            >
              {t("ctaSupport")}
            </Button>
            <GithubRepoButton href={siteConfig.links.github} label="virastack" />
          </div>
        </RevealItem>
      </RevealGroup>

      <Reveal mode="view" className="mt-16 flex items-center gap-4 border-t border-border pt-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={siteConfig.author.avatar}
          alt=""
          width={48}
          height={48}
          className="size-12 rounded-full border border-border bg-muted ring-1 ring-border ring-offset-2 ring-offset-background"
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold tracking-tight text-foreground">
            {siteConfig.author.name}
          </p>
          <p className="text-sm text-muted-foreground">{t("maintainerRole")}</p>
        </div>
      </Reveal>
    </div>
  );
}
