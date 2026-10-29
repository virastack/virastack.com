import { useLocale } from "next-intl";

import { AddressHelpersDoc as En } from "./locales/en/AddressHelpersDoc";
import { AddressHelpersDoc as Tr } from "./locales/tr/AddressHelpersDoc";

export function AddressHelpersDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
