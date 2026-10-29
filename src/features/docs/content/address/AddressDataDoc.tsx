import { useLocale } from "next-intl";

import { AddressDataDoc as En } from "./locales/en/AddressDataDoc";
import { AddressDataDoc as Tr } from "./locales/tr/AddressDataDoc";

export function AddressDataDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
