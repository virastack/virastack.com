import { useLocale } from "next-intl";

import { PasswordStrengthDoc as En } from "./locales/en/PasswordStrengthDoc";
import { PasswordStrengthDoc as Tr } from "./locales/tr/PasswordStrengthDoc";

export function PasswordStrengthDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
