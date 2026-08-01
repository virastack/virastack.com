import { useLocale } from "next-intl";

import { MaskUiLibrariesDoc as En } from "./locales/en/MaskUiLibrariesDoc";
import { MaskUiLibrariesDoc as Tr } from "./locales/tr/MaskUiLibrariesDoc";

export function MaskUiLibrariesDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
