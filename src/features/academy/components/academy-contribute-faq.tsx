"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { ACADEMY_GITHUB_ISSUES_NEW } from "@/features/academy/lib/content-path";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/ui";
import { Link } from "@/i18n/routing";

const linkClassName =
  "font-medium text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground/60";

const FAQ_ITEMS = ["sources", "paid", "error", "topic", "update"] as const;

type FaqId = (typeof FAQ_ITEMS)[number];

const faqQuestionKeys = {
  sources: "contributeFaqSourcesQ",
  paid: "contributeFaqPaidQ",
  error: "contributeFaqErrorQ",
  topic: "contributeFaqTopicQ",
  update: "contributeFaqUpdateQ",
} as const satisfies Record<FaqId, string>;

const faqAnswerKeys = {
  sources: "contributeFaqSourcesA",
  paid: "contributeFaqPaidA",
  error: "contributeFaqErrorA",
  topic: "contributeFaqTopicA",
  update: "contributeFaqUpdateA",
} as const satisfies Record<FaqId, string>;

export function AcademyContributeFaq() {
  const t = useTranslations("Academy");

  const rich = {
    italic: (chunks: ReactNode) => <em className="italic">{chunks}</em>,
    sources: (chunks: ReactNode) => (
      <Link href="/academy/sources" className={linkClassName}>
        {chunks}
      </Link>
    ),
    githubIssue: (chunks: ReactNode) => (
      <a href={ACADEMY_GITHUB_ISSUES_NEW} target="_blank" rel="noreferrer" className={linkClassName}>
        {chunks}
      </a>
    ),
  };

  return (
    <Accordion className="w-full">
      {FAQ_ITEMS.map((id) => (
        <AccordionItem key={id} value={id}>
          <AccordionTrigger>{t(faqQuestionKeys[id])}</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
              {t.rich(faqAnswerKeys[id], rich)}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
