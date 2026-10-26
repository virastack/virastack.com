import { useLocale } from "next-intl";

import { PasswordConfirmDoc as En } from "./locales/en/PasswordConfirmDoc";
import { PasswordConfirmDoc as Tr } from "./locales/tr/PasswordConfirmDoc";

export function PasswordConfirmDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
