import { useLocale } from "next-intl";

import { MaskValidationDoc as En } from "./locales/en/MaskValidationDoc";
import { MaskValidationDoc as Tr } from "./locales/tr/MaskValidationDoc";

export function MaskV1ValidationDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
