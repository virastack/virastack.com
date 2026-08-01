import { getLocale } from "next-intl/server";

import { PasswordExampleDetailDoc as En } from "./locales/en/PasswordExampleDetailDoc";
import { PasswordExampleDetailDoc as Tr } from "./locales/tr/PasswordExampleDetailDoc";

type PasswordExampleDetailDocProps = {
  id: string;
};

export async function PasswordExampleDetailDoc({ id }: PasswordExampleDetailDocProps) {
  const locale = await getLocale();
  return locale === "tr" ? <Tr id={id} /> : <En id={id} />;
}
