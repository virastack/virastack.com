import { useLocale } from "next-intl";

import { AddressTypesDoc as En } from "./locales/en/AddressTypesDoc";
import { AddressTypesDoc as Tr } from "./locales/tr/AddressTypesDoc";

export function AddressTypesDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
