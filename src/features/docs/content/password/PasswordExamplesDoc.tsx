import { useLocale } from "next-intl";

import { PasswordExamplesDoc as En } from "./locales/en/PasswordExamplesDoc";
import { PasswordExamplesDoc as Tr } from "./locales/tr/PasswordExamplesDoc";

export function PasswordExamplesDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
