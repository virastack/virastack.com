import { useLocale } from "next-intl";

import { MaskExamplesDoc as En } from "./locales/en/MaskExamplesDoc";
import { MaskExamplesDoc as Tr } from "./locales/tr/MaskExamplesDoc";

export function MaskExamplesDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
