import { useLocale } from "next-intl";

import { MaskTestingDoc as En } from "./locales/en/MaskTestingDoc";
import { MaskTestingDoc as Tr } from "./locales/tr/MaskTestingDoc";

export function MaskTestingDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
