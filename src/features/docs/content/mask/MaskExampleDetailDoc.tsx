import { useLocale } from "next-intl";

import { MaskExampleDetailDoc as En } from "./locales/en/MaskExampleDetailDoc";
import { MaskExampleDetailDoc as Tr } from "./locales/tr/MaskExampleDetailDoc";

type MaskExampleDetailDocProps = {
  id: string;
};

export function MaskExampleDetailDoc({ id }: MaskExampleDetailDocProps) {
  const locale = useLocale();
  return locale === "tr" ? <Tr id={id} /> : <En id={id} />;
}
