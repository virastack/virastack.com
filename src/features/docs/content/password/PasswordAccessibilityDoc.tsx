import { useLocale } from "next-intl";

import { PasswordAccessibilityDoc as En } from "./locales/en/PasswordAccessibilityDoc";
import { PasswordAccessibilityDoc as Tr } from "./locales/tr/PasswordAccessibilityDoc";

export function PasswordAccessibilityDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
