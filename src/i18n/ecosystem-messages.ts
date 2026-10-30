import { ecosystem, type EcosystemLocale } from "@/config/ecosystem.config";

type Messages = Record<string, Record<string, unknown>>;

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

/**
 * Description messages generated from `ecosystem.config.ts`, so components keep reading
 * them through next-intl: `Navigation.<id>Desc` (short, Academy included), `Home.ecosystem<Id>Desc`
 * (medium), `Products.<id>Desc` (long), `Products.<id>Meta` (meta description) and `Academy.description` (Academy's long text, tags stripped), `Academy.descriptionRich` and `Academy.metaDescription`.
 */
export function withEcosystemMessages(messages: Messages, locale: EcosystemLocale): Messages {
  const navigation: Record<string, string> = {};
  const home: Record<string, string> = {};
  const products: Record<string, string> = {};
  let academyLong = "";
  let academyMeta = "";

  for (const entry of ecosystem) {
    const { short, medium, long, meta } = entry.copy[locale];
    home[`ecosystem${capitalize(entry.id)}Desc`] = medium;
    navigation[`${entry.id}Desc`] = short;
    if (entry.id === "academy") {
      academyLong = long;
      academyMeta = meta ?? long;
      continue;
    }
    products[`${entry.id}Desc`] = long;
    products[`${entry.id}Meta`] = meta ?? long;
  }

  return {
    ...messages,
    Navigation: { ...messages.Navigation, ...navigation },
    Home: { ...messages.Home, ...home },
    Products: { ...messages.Products, ...products },
    Academy: {
      ...messages.Academy,
      // `description` stays plain text for places that print it as is; the hero reads the rich one.
      description: academyLong.replace(/<\/?[a-zA-Z]+>/g, ""),
      descriptionRich: academyLong,
      metaDescription: academyMeta,
    },
  };
}
