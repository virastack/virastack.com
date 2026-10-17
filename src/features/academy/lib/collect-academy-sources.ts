import type { Emphasis, Link, ListItem, PhrasingContent, Root } from "mdast";
import remarkParse from "remark-parse";
import { unified } from "unified";

import { parseAcademyResourceKind } from "@/features/academy/constants/resource.constants";
import {
  ACADEMY_INSTITUTION_SOURCE_NAMES,
  ACADEMY_OFFICIAL_SOURCE_NAMES,
  normalizeAcademySourceKey,
} from "@/features/academy/constants/source-kind.constants";
import { readEngineerTrustReason } from "@/features/academy/constants/source-trust.constants";
import { buildAcademySourceCanonicalNames } from "@/features/academy/lib/canonicalize-academy-source";
import {
  getAcademyTracks,
  loadAcademyCurriculum,
} from "@/features/academy/lib/load-curriculum";
import { loadAcademyLesson } from "@/features/academy/lib/load-lesson";
import {
  isAcademyResourceList,
  remarkAcademyCitations,
} from "@/features/academy/lib/remark-academy-citations";

export type AcademySourceKind = "official" | "engineer" | "institution";

export type AcademySourceGuide = {
  trackSlug: string;
  trackTitle: string;
  lessonSlug: string;
  title: string;
  citationCount: number;
};

export type AcademySourceEntry = {
  name: string;
  kind: AcademySourceKind;
  citationCount: number;
  guideCount: number;
  hostLabel: string | null;
  href: string | null;
  guides: readonly AcademySourceGuide[];
  trustReason: string | null;
};

export type AcademySourcesCatalog = {
  sources: AcademySourceEntry[];
  lastVerified: string | null;
};

type ResourceRow = {
  title: string;
  href: string;
  kind: string | undefined;
};

const CONTENT_LOCALE = "tr";

const PERSON_NAME_PATTERN =
  /^(?:[A-ZÇĞİÖŞÜ][\w'.-]*|[A-Z]\.)(?:\s+(?:[A-ZÇĞİÖŞÜ][\w'.-]*|[A-Z]\.)){1,4}$/;

const ORG_STOPWORDS = new Set([
  "ai",
  "central",
  "code",
  "commons",
  "context",
  "design",
  "doc",
  "docs",
  "engineering",
  "eth",
  "federation",
  "feature",
  "google",
  "help",
  "html",
  "leaderboard",
  "library",
  "mcp",
  "model",
  "module",
  "new",
  "next",
  "practices",
  "protocol",
  "react",
  "router",
  "sdk",
  "search",
  "sliced",
  "stack",
  "standard",
  "start",
  "system",
  "tanstack",
  "testing",
  "the",
  "virastack",
  "zürih",
  "zurich",
]);

const PERSON_FORCE_NAMES = new Set(["tkdodo"]);

const SOURCE_DISPLAY_NAMES: Record<string, string> = {
  tkdodo: "Dominik Dorfmeister",
};

const SENTENCE_STOPWORDS = new Set([
  "a",
  "again",
  "an",
  "author",
  "for",
  "from",
  "get",
  "like",
  "most",
  "never",
  "on",
  "or",
  "teams",
  "the",
  "use",
  "w",
  "what",
  "will",
  "with",
  "wrong",
]);

function isRoot(node: { type: string }): node is Root {
  return node.type === "root";
}

function phrasingText(nodes: readonly PhrasingContent[]): string {
  return nodes
    .map((node) => {
      if (node.type === "text") {
        return node.value;
      }
      if ("children" in node && Array.isArray(node.children)) {
        return phrasingText(node.children);
      }
      return "";
    })
    .join("");
}

function readEmphasisKindToken(node: Emphasis): string | undefined {
  const token = phrasingText(node.children).trim();
  if (!token) {
    return undefined;
  }
  const unwrapped = /^\(([^)]+)\)$/.exec(token)?.[1]?.trim() ?? token;
  return unwrapped.toLocaleLowerCase("tr");
}

function readItemKindToken(item: ListItem): string | undefined {
  for (const child of item.children) {
    if (child.type !== "paragraph") {
      continue;
    }
    for (const inline of child.children) {
      if (inline.type !== "emphasis") {
        continue;
      }
      const token = readEmphasisKindToken(inline);
      if (token) {
        return token;
      }
    }
  }
  return undefined;
}

function readItemLink(item: ListItem): { title: string; href: string } | undefined {
  for (const child of item.children) {
    if (child.type !== "paragraph") {
      continue;
    }
    for (const inline of child.children) {
      if (inline.type !== "link") {
        continue;
      }
      const link = inline as Link;
      const title = phrasingText(link.children).trim();
      const href = link.url.trim();
      if (title && href) {
        return { title, href };
      }
    }
  }
  return undefined;
}

function readResourceRows(markdown: string): ResourceRow[] {
  const parsed = unified().use(remarkParse).parse(markdown);
  if (!isRoot(parsed)) {
    return [];
  }

  remarkAcademyCitations()(parsed);

  const rows: ResourceRow[] = [];
  for (const node of parsed.children) {
    if (node.type !== "list" || !isAcademyResourceList(node)) {
      continue;
    }
    for (const item of node.children) {
      const link = readItemLink(item);
      if (!link) {
        continue;
      }
      rows.push({
        title: link.title,
        href: link.href,
        kind: readItemKindToken(item),
      });
    }
  }
  return rows;
}

function normalizeCredit(raw: string): string {
  return raw.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
}

function collapseEtAl(credit: string): string {
  return credit.replace(/\s+(ve\s+ark\.?|et\s+al\.?)$/i, "").trim();
}

function splitCredits(credit: string): string[] {
  const collapsed = collapseEtAl(credit);
  return collapsed
    .split(/\s+ve\s+|\s+and\s+/i)
    .map((part) => collapseEtAl(part.trim()))
    .filter(Boolean);
}

function isOrgCredit(name: string): boolean {
  const tokens = name.match(/[A-Za-zÇĞİÖŞÜçğıöşü'.-]+/g) ?? [];
  return tokens.some((token) =>
    ORG_STOPWORDS.has(token.toLocaleLowerCase("tr").replace(/\.$/, "")),
  );
}

function isForcedPerson(name: string): boolean {
  return PERSON_FORCE_NAMES.has(name.toLocaleLowerCase("tr"));
}

function isPersonName(name: string): boolean {
  if (isForcedPerson(name)) {
    return true;
  }
  return PERSON_NAME_PATTERN.test(name) && !isOrgCredit(name);
}

function isShortCreditLabel(label: string): boolean {
  const words = label.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0 || words.length > 6 || label.length > 60) {
    return false;
  }
  return !words.some((word) => {
    const normalized = word
      .toLocaleLowerCase("tr")
      .replace(/[^a-zçğıöşü]/gi, "");
    return SENTENCE_STOPWORDS.has(normalized);
  });
}

function extractCreditParts(title: string): string[] {
  if (title.includes(":")) {
    const credit = normalizeCredit(title.split(":")[0] ?? "");
    if (!credit) {
      return [];
    }
    return splitCredits(credit);
  }

  if (!isShortCreditLabel(title)) {
    return [];
  }

  return splitCredits(normalizeCredit(title));
}

type CitationLink = {
  label: string;
  href: string;
};

/**
 * Home link for a citation. GitHub file, issue, and pull URLs point at
 * `owner/repo` instead of the github.com homepage.
 */
function readCitationLink(href: string): CitationLink | null {
  let url: URL;
  try {
    url = new URL(href);
  } catch (error) {
    if (error instanceof TypeError) {
      return null;
    }
    throw error;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    return null;
  }
  const host = url.hostname.replace(/^www\./, "");
  if (!host) {
    return null;
  }
  if (host === "github.com") {
    const [owner, repo] = url.pathname.split("/").filter(Boolean);
    if (owner && repo) {
      return {
        label: `github.com/${owner}/${repo}`,
        href: `https://github.com/${owner}/${repo}`,
      };
    }
  }
  return { label: host, href: `https://${host}` };
}

function pickCitationLink(
  links: ReadonlyMap<string, CitationLink & { count: number }>,
): CitationLink | null {
  let selected: (CitationLink & { count: number }) | null = null;
  for (const link of links.values()) {
    if (!selected || link.count > selected.count) {
      selected = link;
    }
  }
  if (!selected) {
    return null;
  }
  return { label: selected.label, href: selected.href };
}

function resolveKind(name: string, kindTokens: readonly string[]): AcademySourceKind {
  if (isPersonName(name)) {
    return "engineer";
  }

  const key = normalizeAcademySourceKey(name);
  if (ACADEMY_INSTITUTION_SOURCE_NAMES.has(key)) {
    return "institution";
  }
  if (ACADEMY_OFFICIAL_SOURCE_NAMES.has(key)) {
    return "official";
  }

  let docLike = 0;
  for (const token of kindTokens) {
    const parsed = parseAcademyResourceKind(token);
    if (parsed === "doc" || parsed === "repo") {
      docLike += 1;
    }
  }
  if (kindTokens.length > 0 && docLike * 2 >= kindTokens.length) {
    return "official";
  }
  return "institution";
}

type AggregateBucket = {
  name: string;
  citationCount: number;
  guides: Map<string, AcademySourceGuide>;
  links: Map<string, CitationLink & { count: number }>;
  kindTokens: string[];
};

type CitationHit = {
  part: string;
  href: string;
  kind: string | undefined;
  guideKey: string;
  trackSlug: string;
  trackTitle: string;
  lessonSlug: string;
  lessonTitle: string;
};

/**
 * Aggregates cited sources from every published guide, ranked by distinct
 * guide count then citation count.
 */
export function collectAcademySources(locale: string): AcademySourcesCatalog {
  loadAcademyCurriculum(CONTENT_LOCALE);
  const tracks = getAcademyTracks(CONTENT_LOCALE).filter(
    (track) => track.status === "published",
  );

  const hits: CitationHit[] = [];
  let lastVerified: string | null = null;

  for (const track of tracks) {
    for (const group of track.lessonGroups) {
      for (const lesson of group.lessons) {
        if (lesson.status !== "published") {
          continue;
        }
        const document = loadAcademyLesson(CONTENT_LOCALE, track.slug, lesson.slug);
        if (!document) {
          continue;
        }

        const verified = document.frontmatter.lastVerified;
        if (!lastVerified || verified > lastVerified) {
          lastVerified = verified;
        }

        const guideKey = `${track.slug}/${lesson.slug}`;
        const rows = readResourceRows(document.body);

        for (const row of rows) {
          const parts = extractCreditParts(row.title);
          for (const part of parts) {
            hits.push({
              part,
              href: row.href,
              kind: row.kind,
              guideKey,
              trackSlug: track.slug,
              trackTitle: track.title,
              lessonSlug: lesson.slug,
              lessonTitle: lesson.title,
            });
          }
        }
      }
    }
  }

  const canonicalNames = buildAcademySourceCanonicalNames(
    hits.map((hit) => ({ name: hit.part, href: hit.href })),
  );
  const aggregates = new Map<string, AggregateBucket>();

  for (const hit of hits) {
    const cited = canonicalNames.get(normalizeAcademySourceKey(hit.part)) ?? hit.part.trim();
    const part = SOURCE_DISPLAY_NAMES[normalizeAcademySourceKey(cited)] ?? cited;
    const key = normalizeAcademySourceKey(part);
    const existing = aggregates.get(key) ?? {
      name: part,
      citationCount: 0,
      guides: new Map<string, AcademySourceGuide>(),
      links: new Map<string, CitationLink & { count: number }>(),
      kindTokens: [],
    };
    existing.citationCount += 1;
    if (hit.kind) {
      existing.kindTokens.push(hit.kind);
    }
    const guide = existing.guides.get(hit.guideKey);
    if (guide) {
      guide.citationCount += 1;
    } else {
      existing.guides.set(hit.guideKey, {
        trackSlug: hit.trackSlug,
        trackTitle: hit.trackTitle,
        lessonSlug: hit.lessonSlug,
        title: hit.lessonTitle,
        citationCount: 1,
      });
    }
    const link = readCitationLink(hit.href);
    if (link) {
      const current = existing.links.get(link.href);
      if (current) {
        current.count += 1;
      } else {
        existing.links.set(link.href, { ...link, count: 1 });
      }
    }
    aggregates.set(key, existing);
  }

  const sources = [...aggregates.values()]
    .map((bucket) => {
      const kind = resolveKind(bucket.name, bucket.kindTokens);
      const link = pickCitationLink(bucket.links);
      return {
        name: bucket.name,
        kind,
        citationCount: bucket.citationCount,
        guideCount: bucket.guides.size,
        hostLabel: link?.label ?? null,
        href: link?.href ?? null,
        guides: [...bucket.guides.values()],
        trustReason: kind === "engineer" ? readEngineerTrustReason(bucket.name, locale) : null,
      };
    })
    .sort((a, b) => {
      if (b.guideCount !== a.guideCount) {
        return b.guideCount - a.guideCount;
      }
      if (b.citationCount !== a.citationCount) {
        return b.citationCount - a.citationCount;
      }
      return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
    });

  return { sources, lastVerified };
}
