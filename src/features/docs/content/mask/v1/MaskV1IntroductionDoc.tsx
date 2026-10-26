import { useLocale } from "next-intl";

import { MaskIntroductionDoc as En } from "./locales/en/MaskIntroductionDoc";
import { MaskIntroductionDoc as Tr } from "./locales/tr/MaskIntroductionDoc";

export function MaskV1IntroductionDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
