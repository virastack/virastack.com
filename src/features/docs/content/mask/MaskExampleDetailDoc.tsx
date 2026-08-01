import { getLocale } from "next-intl/server";

import { MaskExampleDetailDoc as En } from "./locales/en/MaskExampleDetailDoc";
import { MaskExampleDetailDoc as Tr } from "./locales/tr/MaskExampleDetailDoc";

type MaskExampleDetailDocProps = {
  id: string;
};

export async function MaskExampleDetailDoc({ id }: MaskExampleDetailDocProps) {
  const locale = await getLocale();
  return locale === "tr" ? <Tr id={id} /> : <En id={id} />;
}
