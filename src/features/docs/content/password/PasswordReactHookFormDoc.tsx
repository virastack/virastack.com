import { useLocale } from "next-intl";

import { PasswordReactHookFormDoc as En } from "./locales/en/PasswordReactHookFormDoc";
import { PasswordReactHookFormDoc as Tr } from "./locales/tr/PasswordReactHookFormDoc";

export function PasswordReactHookFormDoc() {
  const locale = useLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
