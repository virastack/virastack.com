import { useLocale } from "next-intl";

import { PasswordUiLibrariesDoc as En } from "./locales/en/PasswordUiLibrariesDoc";
import { PasswordUiLibrariesDoc as Tr } from "./locales/tr/PasswordUiLibrariesDoc";

export function PasswordV1UiLibrariesDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
