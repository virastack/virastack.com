import { useLocale } from "next-intl";

import { PasswordExampleDetailDoc as En } from "./locales/en/PasswordExampleDetailDoc";
import { PasswordExampleDetailDoc as Tr } from "./locales/tr/PasswordExampleDetailDoc";

type PasswordExampleDetailDocProps = {
  id: string;
};

export function PasswordExampleDetailDoc({ id }: PasswordExampleDetailDocProps) {
  const locale = useLocale();
  return locale === "tr" ? <Tr id={id} /> : <En id={id} />;
}
