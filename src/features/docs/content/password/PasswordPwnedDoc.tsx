import { useLocale } from "next-intl";

import { PasswordPwnedDoc as En } from "./locales/en/PasswordPwnedDoc";
import { PasswordPwnedDoc as Tr } from "./locales/tr/PasswordPwnedDoc";

export function PasswordPwnedDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
