import { useTranslations } from "next-intl";

import { RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { guideProductTags, guideStackTags } from "@/features/guide/components/GuideRichText";

export function About() {
  const t = useTranslations("Home");
  const stack = guideStackTags({ linked: true });
  const products = guideProductTags({ ids: ["ai"], linked: true });

  return (
    <section id="about" className="mx-auto max-w-3xl px-6 py-16 text-center">
      <RevealGroup>
        <RevealItem>
          <h2 className="text-3xl font-semibold tracking-tight text-balance">{t("aboutTitle")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-balance text-muted-foreground">
            {t.rich("aboutBody", {
              bold: (chunks) => <strong className="font-semibold text-foreground">{chunks}</strong>,
              italic: (chunks) => <em className="italic">{chunks}</em>,
              react: stack.react,
              nextjs: stack.nextjs,
              tanstack: stack.tanstack,
              ai: products.ai,
            })}
          </p>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
