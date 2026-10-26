import { useLocale } from "next-intl";

import { MaskUpgradeDoc as En } from "./locales/en/MaskUpgradeDoc";
import { MaskUpgradeDoc as Tr } from "./locales/tr/MaskUpgradeDoc";

export function MaskUpgradeDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
