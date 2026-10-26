import { useLocale } from "next-intl";

import { PasswordHelpersDoc as En } from "./locales/en/PasswordHelpersDoc";
import { PasswordHelpersDoc as Tr } from "./locales/tr/PasswordHelpersDoc";

export function PasswordV1HelpersDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
