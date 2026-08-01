import { useLocale } from "next-intl";

import { MaskTypesDoc as En } from "./locales/en/MaskTypesDoc";
import { MaskTypesDoc as Tr } from "./locales/tr/MaskTypesDoc";

export function MaskTypesDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
