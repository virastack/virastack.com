import { useLocale } from "next-intl";

import { AddressIntroductionDoc as En } from "./locales/en/AddressIntroductionDoc";
import { AddressIntroductionDoc as Tr } from "./locales/tr/AddressIntroductionDoc";

export function AddressIntroductionDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
