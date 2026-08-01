import { useLocale } from "next-intl";

import { PasswordIntroductionDoc as En } from "./locales/en/PasswordIntroductionDoc";
import { PasswordIntroductionDoc as Tr } from "./locales/tr/PasswordIntroductionDoc";

export function PasswordIntroductionDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
