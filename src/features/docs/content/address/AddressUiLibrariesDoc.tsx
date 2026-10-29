import { useLocale } from "next-intl";

import { AddressUiLibrariesDoc as En } from "./locales/en/AddressUiLibrariesDoc";
import { AddressUiLibrariesDoc as Tr } from "./locales/tr/AddressUiLibrariesDoc";

export function AddressUiLibrariesDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
