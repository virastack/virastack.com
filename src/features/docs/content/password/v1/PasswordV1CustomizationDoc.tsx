import { useLocale } from "next-intl";

import { PasswordCustomizationDoc as En } from "./locales/en/PasswordCustomizationDoc";
import { PasswordCustomizationDoc as Tr } from "./locales/tr/PasswordCustomizationDoc";

export function PasswordV1CustomizationDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
