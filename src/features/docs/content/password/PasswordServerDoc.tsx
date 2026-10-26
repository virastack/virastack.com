import { useLocale } from "next-intl";

import { PasswordServerDoc as En } from "./locales/en/PasswordServerDoc";
import { PasswordServerDoc as Tr } from "./locales/tr/PasswordServerDoc";

export function PasswordServerDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
