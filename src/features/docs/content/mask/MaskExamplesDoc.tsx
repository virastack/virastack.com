import { getLocale } from "next-intl/server";

import { MaskExamplesDoc as En } from "./locales/en/MaskExamplesDoc";
import { MaskExamplesDoc as Tr } from "./locales/tr/MaskExamplesDoc";

export async function MaskExamplesDoc() {
  const locale = await getLocale();
  return locale === "tr" ? <Tr /> : <En />;
}
