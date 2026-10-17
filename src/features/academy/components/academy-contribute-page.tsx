import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { AcademyBackLink } from "@/features/academy/components/academy-back-link";
import { AcademyContributeFaq } from "@/features/academy/components/academy-contribute-faq";
import { ACADEMY_GITHUB_ISSUES_NEW, ACADEMY_GITHUB_REPO } from "@/features/academy/lib/content-path";

const linkClassName =
  "font-medium text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground/60";

export async function AcademyContributePageView() {
  const t = await getTranslations("Academy");

  const rich = {
    bold: (chunks: ReactNode) => (
      <strong className="font-semibold text-foreground">{chunks}</strong>
    ),
    githubPr: (chunks: ReactNode) => (
      <a href={ACADEMY_GITHUB_REPO} target="_blank" rel="noreferrer" className={linkClassName}>
        {chunks}
      </a>
    ),
    githubIssue: (chunks: ReactNode) => (
      <a href={ACADEMY_GITHUB_ISSUES_NEW} target="_blank" rel="noreferrer" className={linkClassName}>
        {chunks}
      </a>
    ),
    githubStar: (chunks: ReactNode) => (
      <a href={ACADEMY_GITHUB_REPO} target="_blank" rel="noreferrer" className={linkClassName}>
        {chunks}
      </a>
    ),
  };

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-10 px-6 pt-28 pb-24">
      <div className="flex flex-col gap-4 md:gap-6">
        <AcademyBackLink />
        <header className="space-y-3 border-b border-border pb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            {t("contributeTitle")}
          </h1>
          <p className="max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">
            {t("contributeIntro")}
          </p>
        </header>
      </div>

      <section aria-labelledby="contribute-why-heading" className="flex flex-col gap-4">
        <h2
          id="contribute-why-heading"
          className="text-lg font-semibold tracking-tight text-balance text-foreground"
        >
          {t("contributeWhyTitle")}
        </h2>
        <div className="space-y-4 text-base leading-relaxed text-pretty text-muted-foreground">
          <p>{t("contributeWhyP1")}</p>
          <p>{t("contributeWhyP2")}</p>
        </div>
      </section>

      <section aria-labelledby="contribute-how-heading" className="flex flex-col gap-4">
        <h2
          id="contribute-how-heading"
          className="text-lg font-semibold tracking-tight text-balance text-foreground"
        >
          {t("contributeHowTitle")}
        </h2>
        <div className="flex flex-col gap-3 text-base leading-relaxed text-pretty text-muted-foreground">
          <p>{t.rich("contributeHowBody", rich)}</p>
          <p>{t.rich("contributeHowStar", rich)}</p>
        </div>
      </section>

      <section aria-labelledby="contribute-faq-heading" className="flex flex-col gap-4">
        <h2
          id="contribute-faq-heading"
          className="text-lg font-semibold tracking-tight text-balance text-foreground"
        >
          {t("contributeFaqTitle")}
        </h2>
        <AcademyContributeFaq />
      </section>
    </div>
  );
}
