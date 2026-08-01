import { useLocale } from "next-intl";

import { MaskCustomMaskDoc as En } from "./locales/en/MaskCustomMaskDoc";
import { MaskCustomMaskDoc as Tr } from "./locales/tr/MaskCustomMaskDoc";

export function MaskCustomMaskDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
