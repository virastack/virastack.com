import { getLocale } from "next-intl/server";

import { PasswordExamplesDoc as En } from "./locales/en/PasswordExamplesDoc";
import { PasswordExamplesDoc as Tr } from "./locales/tr/PasswordExamplesDoc";

export async function PasswordExamplesDoc() {
  const locale = await getLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
