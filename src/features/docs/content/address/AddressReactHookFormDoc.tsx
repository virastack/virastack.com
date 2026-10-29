import { useLocale } from "next-intl";

import { AddressReactHookFormDoc as En } from "./locales/en/AddressReactHookFormDoc";
import { AddressReactHookFormDoc as Tr } from "./locales/tr/AddressReactHookFormDoc";

export function AddressReactHookFormDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
