import { normalizeAcademySourceKey } from "@/features/academy/constants/source-kind.constants";

type EngineerTrustReason = {
  tr: string;
  en: string;
};

const ACADEMY_ENGINEER_TRUST_REASONS: Record<string, EngineerTrustReason> = {
  "addy osmani": {
    tr: "Anthropic’te Claude Code üzerinde çalışıyor, 14 yıl Google Chrome ekibinde çalıştı",
    en: "Works on Claude Code at Anthropic, spent 14 years on the Google Chrome team",
  },
  "aleksandr guzenko": {
    tr: "Teknik lider, HolyJS ve Conf42 konuşmacısı",
    en: "Tech lead, speaker at HolyJS and Conf42",
  },
  "alexander morgunov": {
    tr: "Teknik lider, Feature-Sliced Design üzerine HolyJS konuşmacısı",
    en: "Tech lead, HolyJS speaker on Feature-Sliced Design",
  },
  "anthony shew": {
    tr: "Vercel’de Turborepo üzerinde çalışıyor",
    en: "Works on Turborepo at Vercel",
  },
  "artem zakharchenko": {
    tr: "Mock Service Worker’ın yaratıcısı, Epic Web eğitmeni",
    en: "Creator of Mock Service Worker, Epic Web instructor",
  },
  "daishi kato": {
    tr: "Zustand, Jotai ve Valtio’nun maintainer’ı",
    en: "Maintainer of Zustand, Jotai and Valtio",
  },
  "dan abramov": {
    tr: "Redux’ın eş yaratıcısı, eski React Core ve Bluesky mühendisi",
    en: "Co-creator of Redux, former React Core and Bluesky engineer",
  },
  "dominik dorfmeister": {
    tr: "TanStack Query’nin ana maintainer’ı",
    en: "Lead maintainer of TanStack Query",
  },
  "emil kowalski": {
    tr: "Linear’da design engineer, Sonner ve Vaul’un yaratıcısı",
    en: "Design engineer at Linear, creator of Sonner and Vaul",
  },
  "eugene yan": {
    tr: "Anthropic’te Member of Technical Staff, LLM sistemleri üzerine yazıyor",
    en: "Member of Technical Staff at Anthropic, writes on LLM systems",
  },
  "fernando rojo": {
    tr: "Vercel’de Head of Mobile, Solito’nun yaratıcısı",
    en: "Head of Mobile at Vercel, creator of Solito",
  },
  "hamel husain": {
    tr: "Parlance Labs’ın kurucusu, AI eval danışmanı",
    en: "Founder of Parlance Labs, AI eval consultant",
  },
  "jack herrington": {
    tr: "TanStack AI maintainer’ı, Netlify’da principal mühendis",
    en: "Maintainer of TanStack AI, principal engineer at Netlify",
  },
  "josh levenberg": {
    tr: "Google’ın monorepo makalesinin ortak yazarı, mühendislik VP’si",
    en: "Co-author of Google’s monorepo paper, VP of Engineering",
  },
  "justin weiss": {
    tr: "Baş yazılım mühendisi, Practicing Rails kitabının yazarı",
    en: "Principal software engineer, author of Practicing Rails",
  },
  "kent c. dodds": {
    tr: "Testing Library’nin yaratıcısı, Epic Web’in kurucusu ve eğitmeni",
    en: "Creator of Testing Library, founder and instructor of Epic Web",
  },
  "luca mezzalira": {
    tr: "Building Micro-Frontends kitabının yazarı, AWS’de principal mimar",
    en: "Author of Building Micro-Frontends, principal architect at AWS",
  },
  "martin fowler": {
    tr: "Refactoring kitabının yazarı, Thoughtworks baş bilim insanı",
    en: "Author of Refactoring, Chief Scientist at Thoughtworks",
  },
  "marvin hagemeister": {
    tr: "Shopify’da kıdemli staff mühendis, Preact çekirdek ekibi ve Preact DevTools’un yaratıcısı",
    en: "Senior staff engineer at Shopify, on the Preact core team and creator of Preact DevTools",
  },
  "matan borenkraout": {
    tr: "Microsoft’ta principal mühendis, Testing Library maintainer’ı",
    en: "Principal engineer at Microsoft, maintainer of Testing Library",
  },
  "matt pocock": {
    tr: "Total TypeScript ve AI Hero’nun kurucusu",
    en: "Founder of Total TypeScript and AI Hero",
  },
  "michael guay": {
    tr: "Kıdemli mühendis, NestJS Udemy eğitmeni",
    en: "Senior engineer, NestJS instructor on Udemy",
  },
  "rachel potvin": {
    tr: "Block’ta platform mühendisliği başkanı, eski GitHub mühendislik VP’si, Google’ın monorepo makalesinin ortak yazarı",
    en: "Head of platform engineering at Block, former VP of Engineering at GitHub, co-author of Google’s monorepo paper",
  },
  "ruben casas": {
    tr: "Postman’de staff mühendis, Google Developer Expert",
    en: "Staff engineer at Postman, Google Developer Expert",
  },
  "sandi metz": {
    tr: "Practical Object-Oriented Design kitabının yazarı",
    en: "Author of Practical Object-Oriented Design",
  },
  "simon willison": {
    tr: "Django’nun eş yaratıcısı, Datasette’in yaratıcısı",
    en: "Co-creator of Django, creator of Datasette",
  },
  "tally barak": {
    tr: "Teknik mimar, Playwright elçisi, Microsoft MVP",
    en: "Technical architect, Playwright ambassador, Microsoft MVP",
  },
  "tanner linsley": {
    tr: "TanStack’in ve React Query’nin yaratıcısı",
    en: "Creator of TanStack and React Query",
  },
  tkdodo: {
    tr: "TanStack Query’nin ana maintainer’ı",
    en: "Lead maintainer of TanStack Query",
  },
};

/**
 * Short reason a recognized engineer meets the source criteria.
 * Returns null when the table should fall back to the generic label.
 */
export function readEngineerTrustReason(name: string, locale: string): string | null {
  const reason = ACADEMY_ENGINEER_TRUST_REASONS[normalizeAcademySourceKey(name)];
  if (!reason) {
    return null;
  }
  return locale === "en" ? reason.en : reason.tr;
}
