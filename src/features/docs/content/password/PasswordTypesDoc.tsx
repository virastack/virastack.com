import { useLocale } from "next-intl";

import { PasswordTypesDoc as En } from "./locales/en/PasswordTypesDoc";
import { PasswordTypesDoc as Tr } from "./locales/tr/PasswordTypesDoc";

export function PasswordTypesDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
