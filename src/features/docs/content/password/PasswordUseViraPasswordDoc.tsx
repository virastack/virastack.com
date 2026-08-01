import { useLocale } from "next-intl";

import { PasswordUseViraPasswordDoc as En } from "./locales/en/PasswordUseViraPasswordDoc";
import { PasswordUseViraPasswordDoc as Tr } from "./locales/tr/PasswordUseViraPasswordDoc";

export function PasswordUseViraPasswordDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
