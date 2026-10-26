import {
  ACADEMY_BADGE_LABELS,
  type AcademyBadgeKind,
} from "@/features/academy/constants/badge.constants";
import { ACADEMY_FEATURED_AUTHORS } from "@/features/academy/constants/featured-authors.constants";
import { normalizeAcademySourceKey } from "@/features/academy/constants/source-kind.constants";

export type AcademySourceVisual =
  | { type: "badge"; badgeKind: AcademyBadgeKind }
  | { type: "logo"; imageSrc: string }
  | { type: "avatar"; imageSrc: string; initials: string }
  | { type: "initials"; initials: string };

const ORGANIZATION_LOGO_SOURCES: Record<string, string> = {
  "virastack ai": "/logo.webp",
};

const ORGANIZATION_BADGE_ALIASES: Record<string, AcademyBadgeKind> = {
  "ai sdk": "vercel",
  anthropic: "anthropic",
  atlassian: "atlassian",
  "azure devops": "azuredevops",
  azuredevops: "azuredevops",
  biome: "biome",
  "claude code": "claudeCode",
  claude: "claude",
  cursor: "cursor",
  eslint: "eslint",
  figma: "figma",
  github: "github",
  google: "google",
  jira: "jira",
  linear: "linear",
  meta: "meta",
  "next.js": "nextjs",
  nextjs: "nextjs",
  "node.js": "nodejs",
  nodejs: "nodejs",
  npm: "npm",
  openai: "openai",
  playwright: "playwright",
  pnpm: "pnpm",
  prettier: "prettier",
  react: "react",
  "react hook form": "react-hook-form",
  "react router": "react-router",
  "react testing library": "testing-library",
  "react-router": "react-router",
  "shadcn/ui": "shadcn",
  shadcn: "shadcn",
  tailwind: "tailwind",
  "tailwind css": "tailwind",
  "tanstack query": "tanstack-query",
  "tanstack router": "tanstack-start",
  "tanstack start": "tanstack-start",
  "tanstack virtual": "tanstack-query",
  turborepo: "turborepo",
  "typescript handbook": "typescript",
  vercel: "vercel",
  vitest: "vitest",
  zod: "zod",
  zustand: "zustand",
};

const PERSON_AVATAR_ALIASES: Record<string, string> = {
  "addy osmani": "Addy Osmani",
  "dan abramov": "Dan Abramov",
  "dominik dorfmeister": "Dominik Dorfmeister",
  "kent c. dodds": "Kent C. Dodds",
  tkdodo: "Dominik Dorfmeister",
};

const PERSON_AVATAR_SOURCES: Record<string, { imageSrc: string; initials: string }> = {
  "josh w. comeau": {
    imageSrc: "/academy/authors/josh-w-comeau.png",
    initials: "JC",
  },
  "adrian roselli": {
    imageSrc: "/academy/authors/adrian-roselli.png",
    initials: "AR",
  },
  "alexander morgunov": {
    imageSrc: "/academy/authors/alexander-morgunov.png",
    initials: "AM",
  },
  "jack herrington": {
    imageSrc: "/academy/authors/jack-herrington.png",
    initials: "JH",
  },
  "luca mezzalira": {
    imageSrc: "/academy/authors/luca-mezzalira.png",
    initials: "LM",
  },
  "martin fowler": {
    imageSrc: "/academy/authors/martin-fowler.png",
    initials: "MF",
  },
  "matt pocock": {
    imageSrc: "/academy/authors/matt-pocock.png",
    initials: "MP",
  },
  "simon willison": {
    imageSrc: "/academy/authors/simon-willison.png",
    initials: "SW",
  },
};

function normalizeKey(name: string): string {
  return name.trim().toLocaleLowerCase("tr");
}

/**
 * Builds compact initials for a credit name shown without a portrait.
 */
export function getAcademySourceInitials(name: string): string {
  const parts = name.split(/[\s/]+/).filter(Boolean);
  if (parts.length === 0) {
    return "?";
  }
  if (parts.length === 1) {
    const sole = parts[0] ?? "";
    return sole.slice(0, 2).toLocaleUpperCase("en");
  }
  const first = parts[0]?.[0] ?? "";
  const last = parts[parts.length - 1]?.[0] ?? "";
  return `${first}${last}`.toLocaleUpperCase("en");
}

function resolveOrganizationBadge(name: string): AcademyBadgeKind | undefined {
  const key = normalizeAcademySourceKey(name);
  const aliased = ORGANIZATION_BADGE_ALIASES[key];
  if (aliased) {
    return aliased;
  }

  for (const [badgeKind, label] of Object.entries(ACADEMY_BADGE_LABELS)) {
    if (normalizeAcademySourceKey(label) === key) {
      return badgeKind as AcademyBadgeKind;
    }
  }

  return undefined;
}

/**
 * Resolves the logo or avatar for a cited source name.
 */
export function resolveAcademySourceVisual(
  name: string,
  category: "organization" | "person",
): AcademySourceVisual {
  if (category === "person") {
    const portrait = PERSON_AVATAR_SOURCES[normalizeKey(name)];
    if (portrait) {
      return { type: "avatar", imageSrc: portrait.imageSrc, initials: portrait.initials };
    }

    const aliasTarget = PERSON_AVATAR_ALIASES[normalizeKey(name)];
    const author = ACADEMY_FEATURED_AUTHORS.find(
      (entry) => entry.name === aliasTarget || normalizeKey(entry.name) === normalizeKey(name),
    );
    if (author) {
      return {
        type: "avatar",
        imageSrc: author.imageSrc,
        initials: author.initials,
      };
    }
    return { type: "initials", initials: getAcademySourceInitials(name) };
  }

  const logoSrc = ORGANIZATION_LOGO_SOURCES[normalizeAcademySourceKey(name)];
  if (logoSrc) {
    return { type: "logo", imageSrc: logoSrc };
  }

  const badgeKind = resolveOrganizationBadge(name);
  if (badgeKind) {
    return { type: "badge", badgeKind };
  }

  return { type: "initials", initials: getAcademySourceInitials(name) };
}
