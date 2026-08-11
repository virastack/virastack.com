import { getTranslations } from "next-intl/server";

import { StartCliCommandBuilder } from "@/features/docs/components/StartCliCommandBuilder";

export async function StartBuilderPage() {
  const t = await getTranslations("StartBuilder");

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10 sm:py-12">
      <header className="mb-8 space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-balance">{t("title")}</h1>
        <p className="text-base leading-relaxed text-pretty text-muted-foreground">{t("intro")}</p>
      </header>
      <StartCliCommandBuilder />
    </div>
  );
}
