import { useLocale } from "next-intl";

import { AddressPostalCodeDoc as En } from "./locales/en/AddressPostalCodeDoc";
import { AddressPostalCodeDoc as Tr } from "./locales/tr/AddressPostalCodeDoc";

export function AddressPostalCodeDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
