import { useLocale } from "next-intl";

import { PasswordUpgradeDoc as En } from "./locales/en/PasswordUpgradeDoc";
import { PasswordUpgradeDoc as Tr } from "./locales/tr/PasswordUpgradeDoc";

export function PasswordUpgradeDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
