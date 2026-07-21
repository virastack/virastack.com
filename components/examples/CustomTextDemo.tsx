"use client";

import { useViraPassword } from "@virastack/password";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";

export function CustomTextDemo() {
  const t = useTranslations("PasswordToggle.examples.customText");

  const { inputProps, btnProps } = useViraPassword({
    icons: {
      show: <span>{t("show")}</span>,
      hide: <span>{t("hide")}</span>,
    },
  });

  return (
    <div className="relative w-full max-w-xs mt-4">
      <Input
        {...inputProps}
        defaultValue="ViraStack"
        className="pr-16"
        placeholder={t("placeholder")}
      />
      <button
        {...btnProps}
        className="absolute right-0 top-0 h-full px-3 text-xs font-semibold text-muted-foreground hover:text-foreground"
      >
        {btnProps.children}
      </button>
    </div>
  );
}
