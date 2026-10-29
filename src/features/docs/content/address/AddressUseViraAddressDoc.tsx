import { useLocale } from "next-intl";

import { AddressUseViraAddressDoc as En } from "./locales/en/AddressUseViraAddressDoc";
import { AddressUseViraAddressDoc as Tr } from "./locales/tr/AddressUseViraAddressDoc";

export function AddressUseViraAddressDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
