import { useLocale } from "next-intl";

import { MaskBanksDoc as En } from "./locales/en/MaskBanksDoc";
import { MaskBanksDoc as Tr } from "./locales/tr/MaskBanksDoc";

export function MaskBanksDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
