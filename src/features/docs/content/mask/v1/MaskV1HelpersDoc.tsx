import { useLocale } from "next-intl";

import { MaskHelpersDoc as En } from "./locales/en/MaskHelpersDoc";
import { MaskHelpersDoc as Tr } from "./locales/tr/MaskHelpersDoc";

export function MaskV1HelpersDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
