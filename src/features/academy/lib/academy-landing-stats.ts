import type { Emphasis, Link, ListItem, PhrasingContent, Root } from "mdast";
import remarkParse from "remark-parse";
import { unified } from "unified";

import { parseAcademyResourceKind } from "@/features/academy/constants/resource.constants";
import {
  getAcademyTracks,
  loadAcademyCurriculum,
} from "@/features/academy/lib/load-curriculum";
import { loadAcademyLesson } from "@/features/academy/lib/load-lesson";
import {
  isAcademyResourceList,
  remarkAcademyCitations,
} from "@/features/academy/lib/remark-academy-citations";

export type AcademyLandingStats = {
  guideCount: number;
  resourceCount: number;
  authorCount: number;
  lastVerified: string | null;
};

const CONTENT_LOCALE = "tr";

const PERSON_NAME_PATTERN =
  /^(?:[A-ZÇĞİÖŞÜ][\w'.-]*|[A-Z]\.)(?:\s+(?:[A-ZÇĞİÖŞÜ][\w'.-]*|[A-Z]\.)){1,4}$/;

const ORG_STOPWORDS = new Set([
  "ai",
  "central",
  "code",
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
  "library",
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

const DOC_LIKE_KINDS = new Set(["doc", "repo"]);

const PERSON_LIKE_KINDS = new Set([
  "article",
  "video",
  "research",
  "talk",
  "podcast",
  "paper",
]);

type ResourceRow = {
  title: string;
  kind: string | undefined;
};

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

function readItemTitle(item: ListItem): string | undefined {
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
      if (title) {
        return title;
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
      const title = readItemTitle(item);
      if (!title) {
        continue;
      }
      rows.push({
        title,
        kind: readItemKindToken(item),
      });
    }
  }
  return rows;
}

function normalizeCredit(raw: string): string {
  return raw.replace(/\s*\([^)]*\)\s*/g, " ").trim();
}

function splitCredits(credit: string): string[] {
  return credit
    .split(/\s+ve\s+|\s+and\s+/i)
    .map((part) =>
      part
        .replace(/\s+(ve\s+ark\.?|et\s+al\.?)$/i, "")
        .trim(),
    )
    .filter(Boolean);
}

function isOrgCredit(name: string): boolean {
  const tokens = name.match(/[A-Za-zÇĞİÖŞÜçğıöşü'.-]+/g) ?? [];
  return tokens.some((token) => ORG_STOPWORDS.has(token.toLocaleLowerCase("tr").replace(/\.$/, "")));
}

function isPersonName(name: string): boolean {
  return PERSON_NAME_PATTERN.test(name) && !isOrgCredit(name);
}

function resolveKindBucket(kindToken: string | undefined): "doc" | "person" | "other" {
  if (!kindToken) {
    return "other";
  }
  const canonical = parseAcademyResourceKind(kindToken);
  if (canonical && DOC_LIKE_KINDS.has(canonical)) {
    return "doc";
  }
  if (canonical && PERSON_LIKE_KINDS.has(canonical)) {
    return "person";
  }
  if (PERSON_LIKE_KINDS.has(kindToken)) {
    return "person";
  }
  if (DOC_LIKE_KINDS.has(kindToken)) {
    return "doc";
  }
  return "other";
}

function collectAuthorNames(rows: readonly ResourceRow[]): string[] {
  const docCredits = new Set<string>();
  const personCandidates = new Set<string>();

  for (const row of rows) {
    if (!row.title.includes(":")) {
      continue;
    }
    const credit = normalizeCredit(row.title.split(":")[0] ?? "");
    if (!credit) {
      continue;
    }
    const parts = splitCredits(credit);
    const bucket = resolveKindBucket(row.kind);
    if (bucket === "doc") {
      for (const part of parts) {
        docCredits.add(part.toLocaleLowerCase("tr"));
      }
      continue;
    }
    if (bucket !== "person") {
      continue;
    }
    for (const part of parts) {
      personCandidates.add(part);
    }
  }

  const names: string[] = [];
  for (const name of personCandidates) {
    if (!isPersonName(name)) {
      continue;
    }
    if (docCredits.has(name.toLocaleLowerCase("tr"))) {
      continue;
    }
    names.push(name);
  }
  return names.sort((a, b) => a.localeCompare(b, "en"));
}

function collectPublishedResourceRows(): {
  rows: ResourceRow[];
  guideCount: number;
  lastVerified: string | null;
} {
  loadAcademyCurriculum(CONTENT_LOCALE);
  const tracks = getAcademyTracks(CONTENT_LOCALE).filter(
    (track) => track.status === "published",
  );

  const rows: ResourceRow[] = [];
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
        rows.push(...readResourceRows(document.body));
      }
    }
  }

  return { rows, guideCount: tracks.length, lastVerified };
}

/**
 * Aggregates landing trust-line stats from published guides and their sources.
 */
export function getAcademyLandingStats(_locale: string): AcademyLandingStats {
  const { rows, guideCount, lastVerified } = collectPublishedResourceRows();
  return {
    guideCount,
    resourceCount: rows.length,
    authorCount: collectAuthorNames(rows).length,
    lastVerified,
  };
}
