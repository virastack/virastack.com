"use client";

import { useTransition } from "react";

import { LanguagesIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/ui/button";
import { usePathname, useRouter } from "@/i18n/routing";

const locales = [
  { value: "en", label: "English" },
  { value: "tr", label: "Türkçe" },
] as const;

type Locale = (typeof locales)[number]["value"];

export function LanguageSwitcher() {
  const t = useTranslations("Common");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const nextLocale = locale === "en" ? "tr" : "en";
  const next = locales.find((item) => item.value === nextLocale)!;

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={isPending}
      aria-label={t("switchToLocale", { locale: next.label })}
      onClick={() => {
        startTransition(() => {
          router.replace(pathname, { locale: nextLocale });
        });
      }}
    >
      <LanguagesIcon />
    </Button>
  );
}
