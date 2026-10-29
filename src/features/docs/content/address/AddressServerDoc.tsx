import { useLocale } from "next-intl";

import { AddressServerDoc as En } from "./locales/en/AddressServerDoc";
import { AddressServerDoc as Tr } from "./locales/tr/AddressServerDoc";

export function AddressServerDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
