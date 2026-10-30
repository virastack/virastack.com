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
 * - `long`: product page hero (may use `<bold>`, `<italic>`).
 * - `meta`: optional plain-text meta description (~155 characters, where search results cut it);
 *   falls back to `long` when missing, so its first sentence must then stand alone.
 */
export type EcosystemCopy = { short: string; medium: string; long: string; meta?: string };

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
          "A current roadmap for becoming a frontend developer with <react>React</react>. <bold>Free</bold> guides from the fundamentals through advanced topics such as AI, architecture, and testing.",
        long: "An up-to-date roadmap showing which tools to learn, and in what order, to become a frontend developer with <react>React</react>. No unnecessary detail: curated sources from official docs, conference talks, and independent authors.",
        meta: "A current roadmap for becoming a frontend developer with React: free guides built from official docs, conference talks and independent authors.",
      },
      tr: {
        short: "React ile frontend yol haritası: ücretsiz, seçilmiş rehberler.",
        medium:
          "<react>React</react> ile frontend geliştirici olmak için güncel yol haritası. Temellerden AI, mimari ve test gibi ileri konulara <bold>ücretsiz</bold> rehberler.",
        long: "<react>React</react> ile frontend geliştirici olmak için hangi sırayla, hangi araçları öğreneceğini gösteren güncel yol haritası. Gereksiz detay yok: resmi dokümanlar, konferans konuşmaları ve bağımsız yazarlardan seçilmiş kaynaklar.",
        meta: "React ile frontend geliştirici olmak için güncel yol haritası: resmi dokümanlar, konferans konuşmaları ve bağımsız yazarlardan seçilmiş ücretsiz rehberler.",
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
          "Production-ready <nextjs>Next.js</nextjs> and <tanstackstart>TanStack Start</tanstackstart> projects with <code>npx virastack</code>. Feature-based architecture, strict TypeScript, and AI rules included.",
        long: "<bold>Production-ready</bold> <nextjs>Next.js</nextjs> and <tanstack>TanStack Start</tanstack> projects in one command. Feature-based architecture, strict TypeScript and AI rules come with setup; extra tools are picked from a menu.",
        meta: "Production-ready Next.js and TanStack Start projects in one command, with feature-based architecture, strict TypeScript and AI rules.",
      },
      tr: {
        short: "Tek komutla üretime hazır Next.js ve TanStack Start projesi.",
        medium:
          "<code>npx virastack</code> ile üretime hazır <nextjs>Next.js</nextjs> ve <tanstackstart>TanStack Start</tanstackstart> projeleri. Feature tabanlı mimari, strict TypeScript ve AI kuralları dahil gelir.",
        long: "Tek komutla <bold>üretime hazır</bold> <nextjs>Next.js</nextjs> ve <tanstack>TanStack Start</tanstack> projesi. Feature tabanlı mimari, strict TypeScript ve AI kuralları kurulumla gelir; ek araçları menüden seçersin.",
        meta: "Tek komutla üretime hazır Next.js ve TanStack Start projesi. Feature tabanlı mimari, strict TypeScript ve AI kuralları kurulumla gelir.",
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
          "One set of architecture rules for <claudecode>Claude Code</claudecode>, <cursor>Cursor</cursor>, and every agent that reads <code>AGENTS.md</code>, so agents write code that fits your project.",
        long: "<bold>One set of architecture rules</bold> for <claudecode>Claude Code</claudecode>, <cursor>Cursor</cursor>, and every agent that reads <code>AGENTS.md</code>. One command writes framework-aware rules in each tool’s native format, so agents write <bold>consistent code</bold> that fits your architecture.",
        meta: "One command installs architecture rules for Claude Code, Cursor and AGENTS.md, so agents write code that fits your project.",
      },
      tr: {
        short: "Claude Code, Cursor ve AGENTS.md için mimari kurallar.",
        medium:
          "<claudecode>Claude Code</claudecode>, <cursor>Cursor</cursor> ve <code>AGENTS.md</code> okuyan tüm agent’lar için tek bir mimari kural seti. Agent’lar projenin geri kalanına uyan kod yazar.",
        long: "<claudecode>Claude Code</claudecode>, <cursor>Cursor</cursor> ve <code>AGENTS.md</code> okuyan tüm agent’lar için <bold>tek bir mimari kural seti</bold>. Komut, framework’e özel kuralları her aracın kendi formatında yazar; agent’lar mimarine uyan <bold>tutarlı kod</bold> üretir.",
        meta: "Claude Code, Cursor ve AGENTS.md için tek komutla mimari kurallar kurar; agent’lar projenize uyan kod yazar.",
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
          "Zero-dependency input masks for <rhf>React Hook Form</rhf>. Phone, card, date, and currency presets built in; the same schema validates on the server.",
        long: "<bold>Zero-dependency input masks</bold> for <rhf>React Hook Form</rhf>. The form keeps the clean value while the input shows the mask; phone, card, date, and currency presets are built in, Turkish presets (TCKN, VKN, IBAN) included.",
        meta: "Zero-dependency input masks for React Hook Form, with phone, card, IBAN and Turkish presets, and the same schema on the server.",
      },
      tr: {
        short: "React Hook Form için input maskeleri: telefon, IBAN, TCKN.",
        medium:
          "<rhf>React Hook Form</rhf> için sıfır bağımlılıklı input maskeleri. Telefon, kart, IBAN, TCKN ve TRY hazır gelir; aynı şema sunucuda da doğrular.",
        long: "<rhf>React Hook Form</rhf> için <bold>sıfır bağımlılıklı input maskeleri</bold>. Form temiz değeri tutar, input maskeyi gösterir; telefon, kart, IBAN, TCKN, VKN ve TRY hazır gelir.",
        meta: "React Hook Form için sıfır bağımlılıklı input maskeleri: telefon, kart, IBAN, TCKN ve TRY hazır, aynı şema sunucuda da doğrular.",
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
          "An accessible password hook for <react>React</react>: show/hide, NIST-style strength, confirmation, and the same rules on the server. Headless, so it fits any form.",
        long: "An <bold>accessible password hook</bold> for <react>React</react>: show/hide, NIST-style strength, password confirmation and the same rules on the server. Headless, so it fits your existing form components.",
        meta: "Accessible password hook for React: show/hide, NIST-style strength, confirmation and the same rules on the server.",
      },
      tr: {
        short: "Erişilebilir parola hook’u: göster/gizle, güç, sunucu kontrolü.",
        medium:
          "<react>React</react> için erişilebilir parola hook’u: göster/gizle, NIST tarzı güç, parola tekrarı ve sunucuda aynı kurallar. Headless olduğu için her formla çalışır.",
        long: "<react>React</react> için <bold>erişilebilir parola hook’u</bold>: göster/gizle, NIST tarzı güç, parola tekrarı ve sunucuda aynı kurallar. Headless olduğu için mevcut form bileşenlerine bağlanır.",
        meta: "React için erişilebilir parola hook’u: göster/gizle, NIST tarzı güç, parola tekrarı ve sunucuda aynı kurallar.",
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
          "A <italic>headless</italic> <react>React</react> hook for Turkish addresses. Province, district, and neighbourhood are picked in a chain, and the address is verified on the server.",
        long: "A <bold>headless</bold> <react>React</react> hook for Turkish addresses. Province, district, and neighbourhood are picked in a chain, the postal code comes from the neighbourhood, and the address is re-checked on the server.",
        meta: "Headless React hook for Turkish addresses: chained province, district and neighbourhood selects, derived postal codes and server validation.",
      },
      tr: {
        short: "Türkiye adres hook’u: il, ilçe, mahalle ve posta kodu.",
        medium:
          "Türkiye adresleri için <italic>headless</italic> <react>React</react> hook’u. İl, ilçe ve mahalle zincirleme seçilir; posta kodu mahalleden gelir ve adres sunucuda doğrulanır.",
        long: "Türkiye adresleri için <bold>headless</bold> <react>React</react> hook’u. İl, ilçe ve mahalle zincirleme seçilir, posta kodu mahalleden gelir ve adres sunucuda yeniden doğrulanır.",
        meta: "Türkiye adresleri için headless React hook’u: zincirleme il, ilçe, mahalle seçimi, posta kodu ve sunucuda doğrulama.",
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
          "An interactive, step-by-step guide to how a modern web app is built, from plain HTML to an <italic>AI-native</italic> UI in <bold>3 minutes</bold>.",
        long: "An interactive guide to how a modern web app is built, from <bold>plain HTML</bold> to an <italic>AI-native</italic> UI in <bold>3 minutes</bold>. It adds content, styling, components, theme, and AI one layer at a time, then hands you off to the ViraStack ecosystem.",
        meta: "An interactive guide to how a modern web app is built, from plain HTML to an AI-native UI in 3 minutes.",
      },
      tr: {
        short: "Modern web standartlarını adım adım gösteren interaktif rehber.",
        medium:
          "Modern bir web uygulamasının nasıl kurulduğunu, sade HTML’den <italic>AI-native</italic> arayüze <bold>3 dakikada</bold> adım adım gösteren interaktif rehber.",
        long: "Modern bir web uygulamasının nasıl kurulduğunu, <bold>sade HTML</bold>’den <italic>AI-native</italic> arayüze <bold>3 dakikada</bold> gösteren interaktif rehber. İçerik, stil, bileşen, tema ve AI katmanlarını sırayla ekler; sonunda ViraStack ekosistemine yönlendirir.",
        meta: "Modern bir web uygulamasının nasıl kurulduğunu sade HTML’den AI-native arayüze 3 dakikada gösteren interaktif rehber.",
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
