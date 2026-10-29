import { ecosystem, type EcosystemLocale } from "@/config/ecosystem.config";

type Messages = Record<string, Record<string, unknown>>;

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

/**
 * Description messages generated from `ecosystem.config.ts`, so components keep reading
 * them through next-intl: `Navigation.<id>Desc` (short, Academy included), `Home.ecosystem<Id>Desc`
 * (medium), `Products.<id>Desc` (long) and `Academy.description` (Academy's long text).
 */
export function withEcosystemMessages(messages: Messages, locale: EcosystemLocale): Messages {
  const navigation: Record<string, string> = {};
  const home: Record<string, string> = {};
  const products: Record<string, string> = {};
  let academyLong = "";

  for (const entry of ecosystem) {
    const { short, medium, long } = entry.copy[locale];
    home[`ecosystem${capitalize(entry.id)}Desc`] = medium;
    navigation[`${entry.id}Desc`] = short;
    if (entry.id === "academy") {
      academyLong = long;
      continue;
    }
    products[`${entry.id}Desc`] = long;
  }

  return {
    ...messages,
    Navigation: { ...messages.Navigation, ...navigation },
    Home: { ...messages.Home, ...home },
    Products: { ...messages.Products, ...products },
    Academy: { ...messages.Academy, description: academyLong },
  };
}
