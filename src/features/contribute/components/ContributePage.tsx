import type { ReactNode } from "react";

import { StarIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site.config";

import { GithubRepoButton } from "@/components/shared/GithubRepoButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { Button } from "@/ui/button";

const linkClassName =
  "font-medium text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground/60";

function StorySection({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <RevealItem>
      <section className="space-y-4">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            {children}
          </div>
        </div>
        {action ? <div className="pt-1">{action}</div> : null}
      </section>
    </RevealItem>
  );
}

export function ContributePage() {
  const t = useTranslations("ContributePage");

  const rich = {
    bold: (chunks: ReactNode) => (
      <strong className="font-semibold text-foreground">{chunks}</strong>
    ),
    italic: (chunks: ReactNode) => <em className="italic">{chunks}</em>,
    github: (chunks: ReactNode) => (
      <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className={linkClassName}>
        {chunks}
      </a>
    ),
  };

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

        <StorySection
          title={t("starTitle")}
          action={
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<a href={siteConfig.links.github} target="_blank" rel="noreferrer" />}
            >
              <StarIcon data-icon="inline-start" className="size-4" />
              <span>{t("starCta")}</span>
            </Button>
          }
        >
          <p>{t.rich("starBody", rich)}</p>
        </StorySection>

        <StorySection title={t("askTitle")}>
          <p>{t.rich("askBody", rich)}</p>
        </StorySection>

        <StorySection title={t("feedbackTitle")}>
          <p>{t.rich("feedbackBody", rich)}</p>
        </StorySection>

        <StorySection title={t("codeTitle")}>
          <p>{t.rich("codeBody", rich)}</p>
        </StorySection>

        <RevealItem>
          <div className="space-y-4 border-t border-border pt-10">
            <p className="text-base leading-relaxed text-muted-foreground">
              {t.rich("closeBody", rich)}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <GithubRepoButton href={siteConfig.links.github} label="virastack" />
            </div>
          </div>
        </RevealItem>
      </RevealGroup>

      <Reveal mode="view" className="mt-16 border-t border-border pt-10">
        <p className="text-sm text-muted-foreground">{t.rich("thanks", rich)}</p>
      </Reveal>
    </div>
  );
}
