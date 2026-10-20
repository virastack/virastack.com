import { useTranslations } from "next-intl";

import { RevealGroup, RevealItem } from "@/components/shared/Reveal";

const bodyKeys = ["aboutBody1", "aboutBody2", "aboutBody3"] as const;

export function About() {
  const t = useTranslations("Home");

  return (
    <section id="about" className="mx-auto max-w-2xl px-6 py-16">
      <RevealGroup>
        <RevealItem>
          <h2 className="text-center text-3xl font-semibold tracking-tight text-balance">
            {t("aboutTitle")}
          </h2>
          <p className="mt-6 text-xl leading-relaxed font-medium text-pretty">{t("aboutLead")}</p>
        </RevealItem>

        <div className="mt-6 flex flex-col gap-4">
          {bodyKeys.map((key) => (
            <RevealItem key={key}>
              <p className="text-base leading-relaxed text-pretty text-muted-foreground">
                {t(key)}
              </p>
            </RevealItem>
          ))}
        </div>
      </RevealGroup>
    </section>
  );
}
