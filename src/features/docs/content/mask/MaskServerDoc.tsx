import { useLocale } from "next-intl";

import { MaskServerDoc as En } from "./locales/en/MaskServerDoc";
import { MaskServerDoc as Tr } from "./locales/tr/MaskServerDoc";

export function MaskServerDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
