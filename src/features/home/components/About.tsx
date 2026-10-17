import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site.config";

import { RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { guideProductTags } from "@/features/guide/components/GuideRichText";
import { Link } from "@/i18n/routing";

export function About() {
  const t = useTranslations("Home");
  const products = guideProductTags({
    ids: ["start", "ai", "mask", "password"],
    linked: true,
  });

  const rich = {
    br: () => <br />,
    nextjs: (chunks: ReactNode) => (
      <span className="font-semibold text-foreground">{chunks}</span>
    ),
    tanstack: (chunks: ReactNode) => (
      <span className="font-semibold text-foreground">{chunks}</span>
    ),
    start: products.start,
    ai: products.ai,
    mask: products.mask,
    password: products.password,
    academy: (chunks: ReactNode) => (
      <Link
        href="/academy"
        className="mx-0.5 inline whitespace-nowrap underline-offset-2 transition-opacity hover:underline hover:opacity-90"
      >
        <span className="font-semibold text-primary">{siteConfig.name}</span>{" "}
        <span className="font-medium italic text-green-500">{chunks}</span>
      </Link>
    ),
  };

  return (
    <section id="about" className="mx-auto max-w-3xl px-6 py-16 text-center">
      <RevealGroup>
        <RevealItem>
          <h2 className="text-3xl font-semibold tracking-tight text-balance">{t("aboutTitle")}</h2>
          <div className="mx-auto mt-4 max-w-2xl space-y-4 text-base leading-relaxed text-balance text-muted-foreground">
            <p>{t.rich("aboutBody", rich)}</p>
            <p>{t.rich("aboutAcademy", rich)}</p>
          </div>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
