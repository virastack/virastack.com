import { useLocale } from "next-intl";

import { MaskUseViraMaskDoc as En } from "./locales/en/MaskUseViraMaskDoc";
import { MaskUseViraMaskDoc as Tr } from "./locales/tr/MaskUseViraMaskDoc";

export function MaskUseViraMaskDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
