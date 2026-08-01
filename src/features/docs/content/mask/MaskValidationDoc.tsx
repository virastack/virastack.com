import { useLocale } from "next-intl";

import { MaskValidationDoc as En } from "./locales/en/MaskValidationDoc";
import { MaskValidationDoc as Tr } from "./locales/tr/MaskValidationDoc";

export function MaskValidationDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
