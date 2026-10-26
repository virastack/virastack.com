import { useLocale } from "next-intl";

import { PasswordComparisonDoc as En } from "./locales/en/PasswordComparisonDoc";
import { PasswordComparisonDoc as Tr } from "./locales/tr/PasswordComparisonDoc";

export function PasswordComparisonDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
