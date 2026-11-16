import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { ACADEMY_BADGE_LABELS } from "@/constants/academy-badge.constants";
import { siteConfig } from "@/config/site.config";

import type { DocsHeading } from "@/features/docs/types/docs.types";

const DOCS_CONTENT_ROOT = join(process.cwd(), "src/features/docs/content");

/** Where one MDX docs page lives: `content/<product>[/<version>]/<locale>/<slug>.mdx`. */
export type DocsMdxLocation = {
  product: string;
  /** Archived version id (e.g. "v1"); omit for the latest version. */
  version?: string;
  locale: string;
  slug: string;
};

const HEADING_LINE = /^<h([23])\b[^>]*\bid="([^"]+)"[^>]*>(.*)<\/h\1>\s*$/;
const FENCE = /^(`{3,}|~{3,})/;
const PRODUCT_MARK = /<GuideProductMark\b([^>]*)>(.*?)<\/GuideProductMark>/g;

function readSource({ product, version, locale, slug }: DocsMdxLocation): string | undefined {
  const file = join(
    DOCS_CONTENT_ROOT,
    product,
    version ?? "",
    locale === "tr" ? "tr" : "en",
    `${slug}.mdx`,
  );
  return existsSync(file) ? readFileSync(file, "utf8") : undefined;
}

/** A product mark reads "ViraStack Address" on the page unless its brand is hidden. */
function spellProductMarks(source: string): string {
  return source.replace(PRODUCT_MARK, (_match, attributes: string, name: string) =>
    attributes.includes("showBrand={false}") ? name : `${siteConfig.name} ${name}`,
  );
}

/** Inline markdown as plain text: link targets, code ticks, emphasis and escapes dropped. */
function plainInline(source: string): string {
  return source
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/(^|\W)[*_]([^*_]+)[*_](?=\W|$)/g, "$1$2")
    .replace(/\\(.)/g, "$1")
    .replace(/&#32;/g, " ");
}

function badgeLabel(tag: string): string {
  if (!tag.startsWith("<AcademyBadge")) return "";
  const label = /\blabel="([^"]*)"/.exec(tag)?.[1];
  const kind = /\bkind="([^"]*)"/.exec(tag)?.[1] ?? "";
  return label ?? ACADEMY_BADGE_LABELS[kind] ?? kind;
}

/**
 * Removes JSX tags and `{...}` expressions, keeping the text between tags. A badge keeps the
 * label it shows (`label`, or the default label of its `kind`). Braces and quotes inside a tag are skipped
 * as a whole, so `preview={<Demo />}` does not end the tag early.
 */
function stripJsx(source: string): string {
  let out = "";
  let i = 0;
  while (i < source.length) {
    const char = source[i];
    const next = source[i + 1] ?? "";
    if (char === "\\") {
      // An escaped "\{" or "\<" is text; plainInline drops the backslash later.
      out += char + next;
      i += 2;
      continue;
    }
    if (char === "{" || (char === "<" && /[A-Za-z/]/.test(next))) {
      const start = i;
      // "tag" closes at ">", "brace" at "}"; an arrow's ">" inside braces closes nothing.
      const stack: ("tag" | "brace")[] = [];
      let quote: string | null = null;
      for (; i < source.length; i++) {
        const c = source[i];
        const top = stack[stack.length - 1];
        if (quote) {
          if (c === quote) quote = null;
        } else if (c === '"' || c === "'" || c === "`") quote = c;
        else if (c === "{") stack.push("brace");
        else if (c === "<" && /[A-Za-z/]/.test(source[i + 1] ?? "")) stack.push("tag");
        else if ((c === "}" && top === "brace") || (c === ">" && top === "tag")) {
          stack.pop();
          if (stack.length === 0) break;
        }
      }
      const tag = source.slice(start, i + 1);
      i++;
      out += ` ${char === "<" ? badgeLabel(tag) : ""} `;
      continue;
    }
    out += char;
    i++;
  }
  return out;
}

/** Pure: the `h2`/`h3` headings of an MDX page, as the reader sees them. */
export function parseDocsMdxHeadings(source: string): DocsHeading[] {
  const headings: DocsHeading[] = [];
  let inFence = false;
  for (const line of source.split("\n")) {
    if (FENCE.test(line)) inFence = !inFence;
    if (inFence) continue;
    const match = HEADING_LINE.exec(line);
    if (!match?.[2] || match[3] === undefined) continue;
    const title = plainInline(stripJsx(spellProductMarks(match[3])))
      .replace(/\s+/g, " ")
      .trim();
    headings.push({ id: match[2], title, level: match[1] === "3" ? 3 : 2 });
  }
  return headings;
}

/**
 * Pure: the prose of an MDX page as one line of plain text, for the site search. Code blocks,
 * imports, exported code samples and the page header (already the search title and
 * description) are left out.
 */
export function docsMdxPlainText(source: string): string {
  const prose: string[] = [];
  let inFence = false;
  let inExport = false;
  for (const line of source.split("\n")) {
    if (inExport) {
      // Exported constants are template strings; the statement ends with the closing "`;".
      if (/`;\s*$/.test(line)) inExport = false;
      continue;
    }
    if (FENCE.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence || line.startsWith("import ")) continue;
    if (line.startsWith("export ")) {
      inExport = !/`;\s*$/.test(line);
      continue;
    }
    prose.push(line);
  }
  const text = spellProductMarks(prose.join("\n")).replace(/<DocsPageHeader\b[\s\S]*?\/>/, "");
  return plainInline(stripJsx(text).replace(/^\s*(?:[-+]|\d+\.)\s+/gm, ""))
    .replace(/\s+/g, " ")
    .replace(/ ([.,;:!?)])/g, "$1")
    .trim();
}

/**
 * Server only, at build time: the headings of an MDX docs page, for its table of contents and
 * the site search. The MDX file is their only source. Empty when the page has no MDX file.
 */
export function readDocsMdxHeadings(location: DocsMdxLocation): DocsHeading[] {
  const source = readSource(location);
  return source ? parseDocsMdxHeadings(source) : [];
}

/** Server only, at build time: the prose of an MDX docs page. Empty when it has no MDX file. */
export function readDocsMdxText(location: DocsMdxLocation): string {
  const source = readSource(location);
  return source ? docsMdxPlainText(source) : "";
}
