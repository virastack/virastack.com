import {
  CompassIcon,
  GraduationCapIcon,
  MapPinIcon,
  RocketIcon,
  SparklesIcon,
  SquareAsteriskIcon,
  TextCursorInputIcon,
  type LucideIcon,
} from "lucide-react";

export type EcosystemId = "academy" | "start" | "ai" | "mask" | "password" | "address" | "guide";

export type EcosystemLocale = "en" | "tr";

/**
 * Three lengths of the same product description:
 * - `short`: header menu and search (plain text, one line).
 * - `medium`: home page ecosystem cards (may use `<bold>`, `<italic>`, `<code>`).
 * - `long`: product page hero and meta description (may use `<bold>`, `<italic>`);
 *   its first sentence must stand alone, since search results cut it at ~155 characters.
 */
export type EcosystemCopy = { short: string; medium: string; long: string };

export type EcosystemEntry = {
  id: EcosystemId;
  /** Short name shown bold next to ViraStack. */
  name: string;
  href: `/${EcosystemId}`;
  github: string;
  /** Lucide icon, also linked on the brand page by `iconSlug`. */
  icon: LucideIcon;
  iconSlug: string;
  /**
   * `hex` is the fixed swatch (dots, glows, OG images, READMEs); `lightHex` / `darkHex`
   * are the readable text and icon colors per theme.
   */
  color: {
    shade: string;
    lightShade: string;
    darkShade: string;
    hex: string;
    lightHex: string;
    darkHex: string;
  };
  copy: Record<EcosystemLocale, EcosystemCopy>;
};

/**
 * Single source of truth for every ecosystem product: name, route, repository, color,
 * icon and descriptions. Palettes, icons, the product list and the description messages
 * are all derived from this file, so change a product here only.
 *
 * Canonical order: learn (Academy), build (Start, AI, Mask, Password, Address), then the
 * big picture (Guide). The same order drives the header, the brand page, the product dots
 * and the intro video.
 */
export const ecosystem: readonly EcosystemEntry[] = [
  {
    id: "academy",
    name: "Academy",
    href: "/academy",
    github: "https://github.com/virastack/academy",
    icon: GraduationCapIcon,
    iconSlug: "graduation-cap",
    color: {
      shade: "sky-500",
      lightShade: "sky-600",
      darkShade: "sky-500",
      hex: "#00a6f4",
      lightHex: "#0084d1",
      darkHex: "#00a6f4",
    },
    copy: {
      en: {
        short: "A React frontend roadmap with free, curated guides.",
        medium:
          "A current roadmap for becoming a frontend developer with <bold>React</bold>. <bold>Free</bold> guides from the fundamentals through advanced topics such as AI, architecture, and testing.",
        long: "An up-to-date roadmap showing which tools to learn, and in what order, to become a frontend developer with React. No unnecessary detail: curated sources from official docs, conference talks, and independent authors.",
      },
      tr: {
        short: "React ile frontend yol haritası: ücretsiz, seçilmiş rehberler.",
        medium:
          "<bold>React</bold> ile frontend geliştirici olmak için güncel yol haritası. Temellerden yapay zekâ, mimari ve test gibi ileri konulara <bold>ücretsiz</bold> rehberler.",
        long: "React ile frontend geliştirici olmak için hangi sırayla, hangi araçları öğreneceğini gösteren güncel yol haritası. Gereksiz detay yok: resmi dokümanlar, konferans konuşmaları ve bağımsız yazarlardan seçilmiş kaynaklar.",
      },
    },
  },
  {
    id: "start",
    name: "Start",
    href: "/start",
    github: "https://github.com/virastack/start",
    icon: RocketIcon,
    iconSlug: "rocket",
    color: {
      shade: "green-500",
      lightShade: "green-600",
      darkShade: "green-500",
      hex: "#00c950",
      lightHex: "#00a63e",
      darkHex: "#00c950",
    },
    copy: {
      en: {
        short: "Production-ready Next.js and TanStack Start apps in one command.",
        medium:
          "Production-ready <bold>Next.js</bold> and <bold>TanStack Start</bold> projects with <code>npx virastack</code>. Feature-based architecture, strict TypeScript, and AI rules included.",
        long: "<bold>Production-ready</bold> Next.js and TanStack Start projects in <italic>one command</italic>. Feature-based architecture, strict TypeScript, Zod, TanStack Query, and AI rules come with setup; optional modules are picked from an interactive menu.",
      },
      tr: {
        short: "Tek komutla üretime hazır Next.js ve TanStack Start projesi.",
        medium:
          "<code>npx virastack</code> ile üretime hazır <bold>Next.js</bold> ve <bold>TanStack Start</bold> projeleri. Feature tabanlı mimari, strict TypeScript ve AI kuralları dahil gelir.",
        long: "Tek komutla <bold>üretime hazır</bold> Next.js ve TanStack Start projesi. Feature tabanlı mimari, strict TypeScript, Zod, TanStack Query ve AI kuralları kurulumla gelir; opsiyonel modüller interaktif menüden seçilir.",
      },
    },
  },
  {
    id: "ai",
    name: "AI",
    href: "/ai",
    github: "https://github.com/virastack/ai",
    icon: SparklesIcon,
    iconSlug: "sparkles",
    color: {
      shade: "fuchsia-500",
      lightShade: "fuchsia-600",
      darkShade: "fuchsia-500",
      hex: "#e131fa",
      lightHex: "#c800de",
      darkHex: "#e131fa",
    },
    copy: {
      en: {
        short: "Architecture rules for Claude Code, Cursor and AGENTS.md.",
        medium:
          "One set of architecture rules for <bold>Claude Code</bold>, <bold>Cursor</bold>, and every agent that reads <code>AGENTS.md</code>, so agents write code that fits your project.",
        long: "<bold>One set of architecture rules</bold> for Claude Code, Cursor, and every agent that reads AGENTS.md. One command writes framework-aware rules in each tool’s native format, so agents write <bold>consistent code</bold> that fits your architecture.",
      },
      tr: {
        short: "Claude Code, Cursor ve AGENTS.md için mimari kurallar.",
        medium:
          "<bold>Claude Code</bold>, <bold>Cursor</bold> ve <code>AGENTS.md</code> okuyan tüm agent’lar için tek bir mimari kural seti. Agent’lar projenin geri kalanına uyan kod yazar.",
        long: "Claude Code, Cursor ve AGENTS.md okuyan tüm agent’lar için <bold>tek bir mimari kural seti</bold>. Tek komutla framework’e özel kuralları her aracın kendi formatında yazar; agent’lar mimarinize uyan <bold>tutarlı kod</bold> üretir.",
      },
    },
  },
  {
    id: "mask",
    name: "Mask",
    href: "/mask",
    github: "https://github.com/virastack/form/tree/main/packages/mask",
    icon: TextCursorInputIcon,
    iconSlug: "text-cursor-input",
    color: {
      shade: "indigo-500",
      lightShade: "indigo-500",
      darkShade: "indigo-500",
      hex: "#605efe",
      lightHex: "#605efe",
      darkHex: "#605efe",
    },
    copy: {
      en: {
        short: "Input masks for React Hook Form: phone, card, date, currency.",
        medium:
          "Zero-dependency input masks for <bold>React Hook Form</bold>. Phone, card, date, and currency presets built in; the same schema validates on the server.",
        long: "<bold>Zero-dependency input masks</bold> for React Hook Form. The form keeps the raw value while the input shows the mask; phone, card, date, and currency presets are built in, Turkish presets (TCKN, VKN, IBAN) included, and the same schema parses and validates on the server.",
      },
      tr: {
        short: "React Hook Form için input maskeleri: telefon, IBAN, TCKN.",
        medium:
          "<bold>React Hook Form</bold> için sıfır bağımlılıklı input maskeleri. Telefon, kart, IBAN, TCKN ve TRY hazır gelir; aynı şema sunucuda da doğrular.",
        long: "React Hook Form için <bold>sıfır bağımlılıklı input maskeleri</bold>. Form ham değeri tutar, input maskeyi gösterir; telefon, kart, IBAN, TCKN, VKN ve TRY hazır gelir, aynı şema sunucuda da ayrıştırılıp doğrulanır.",
      },
    },
  },
  {
    id: "password",
    name: "Password",
    href: "/password",
    github: "https://github.com/virastack/form/tree/main/packages/password",
    icon: SquareAsteriskIcon,
    iconSlug: "square-asterisk",
    color: {
      shade: "pink-500",
      lightShade: "pink-600",
      darkShade: "pink-500",
      hex: "#f6339a",
      lightHex: "#e60076",
      darkHex: "#f6339a",
    },
    copy: {
      en: {
        short: "Accessible password hook: show/hide, strength, server checks.",
        medium:
          "An accessible password hook for <bold>React</bold>: show/hide, <italic>NIST</italic>-style strength, confirmation, and the same rules on the server.",
        long: "An <bold>accessible password hook</bold> for React: show/hide, NIST-style strength, password confirmation and the same rules on the server, with an optional leaked password check. Headless, so it drops into your existing form components.",
      },
      tr: {
        short: "Erişilebilir parola hook’u: göster/gizle, güç, sunucu kontrolü.",
        medium:
          "<bold>React</bold> için erişilebilir parola hook’u: göster/gizle, <italic>NIST</italic> tarzı güç, parola tekrarı ve sunucuda aynı kurallar.",
        long: "React için <bold>erişilebilir parola hook’u</bold>: göster/gizle, NIST tarzı güç, parola tekrarı ve sunucuda aynı kurallar. İsteğe bağlı sızmış parola kontrolü içerir; headless olduğu için mevcut form bileşenlerinize kolayca bağlanır.",
      },
    },
  },
  {
    id: "address",
    name: "Address",
    href: "/address",
    github: "https://github.com/virastack/form/tree/main/packages/address",
    icon: MapPinIcon,
    iconSlug: "map-pin",
    color: {
      shade: "red-500",
      lightShade: "red-600",
      darkShade: "red-500",
      hex: "#fb2c36",
      lightHex: "#e7000b",
      darkHex: "#fb2c36",
    },
    copy: {
      en: {
        short: "Turkish address hook: province, district, neighbourhood and postal code.",
        medium:
          "A <italic>headless</italic> <bold>React</bold> hook for Turkish addresses. Province, district, and neighbourhood are picked in a chain; the postal code comes from the neighbourhood and the address is verified on the server.",
        long: "A <bold>headless React hook</bold> for Turkish addresses. Province, district, and neighbourhood are picked in a chain, the postal code comes from the neighbourhood, and the address is re-checked on the server. It shares one React Hook Form with Mask and Password. PTT data for 81 provinces, 973 districts, and 72,466 neighbourhoods is included and checked monthly.",
      },
      tr: {
        short: "Türkiye adres hook’u: il, ilçe, mahalle ve posta kodu.",
        medium:
          "Türkiye adresleri için <italic>headless</italic> <bold>React</bold> hook’u. İl, ilçe ve mahalle zincirleme seçilir; posta kodu mahalleden gelir ve adres sunucuda doğrulanır.",
        long: "Türkiye adresleri için <bold>headless React hook’u</bold>. İl, ilçe ve mahalle zincirleme seçilir, posta kodu mahalleden gelir ve adres sunucuda yeniden doğrulanır; Mask ve Password ile aynı React Hook Form’da çalışır. 81 il, 973 ilçe ve 72.466 mahallelik PTT verisi pakete dahildir ve her ay kontrol edilir.",
      },
    },
  },
  {
    id: "guide",
    name: "Guide",
    href: "/guide",
    github: "https://github.com/virastack/guide",
    icon: CompassIcon,
    iconSlug: "compass",
    color: {
      shade: "amber-400",
      lightShade: "amber-600",
      darkShade: "amber-400",
      hex: "#ffb900",
      lightHex: "#e17100",
      darkHex: "#ffb900",
    },
    copy: {
      en: {
        short: "An interactive guide through modern web standards, step by step.",
        medium:
          "An interactive, step-by-step guide to how a modern web app is built, from raw HTML to an <italic>AI-native</italic> UI in <bold>3 minutes</bold>.",
        long: "An interactive guide to how a modern web app is built, from <bold>raw HTML</bold> to an <italic>AI-native</italic> UI in <bold>3 minutes</bold>. It adds content, styling, components, theme, and AI one layer at a time, then hands you off to the ViraStack ecosystem.",
      },
      tr: {
        short: "Modern web standartlarını adım adım gösteren interaktif rehber.",
        medium:
          "Modern bir web uygulamasının nasıl kurulduğunu, ham HTML’den <italic>AI-native</italic> arayüze <bold>3 dakikada</bold> adım adım gösteren interaktif rehber.",
        long: "Modern bir web uygulamasının nasıl kurulduğunu, <bold>ham HTML</bold>’den <italic>AI-native</italic> arayüze <bold>3 dakikada</bold> gösteren interaktif rehber. İçerik, stil, bileşen, tema ve yapay zekâ katmanlarını sırayla ekler; sonunda ViraStack ekosistemine yönlendirir.",
      },
    },
  },
];

export function getEcosystemEntry(id: EcosystemId): EcosystemEntry {
  const entry = ecosystem.find((item) => item.id === id);
  if (!entry) {
    throw new Error(`Unknown ecosystem entry: ${id}`);
  }
  return entry;
}
