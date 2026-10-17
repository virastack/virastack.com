import type { Html, Root, RootContent } from "mdast";

const DETAILS_BLOCK =
  /^<details\b[^>]*>\s*<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>\s*$/i;
const DETAILS_OPEN = /^<details\b[^>]*>\s*<summary>([\s\S]*?)<\/summary>\s*$/i;
const DETAILS_CLOSE = /^<\/details>\s*$/i;

export type AcademyDetailsItem = {
  summary: string;
  body: string | RootContent[];
};

declare module "mdast" {
  interface Data {
    academyDetails?: AcademyDetailsItem[] | undefined;
  }
}

function isHtmlNode(node: RootContent | undefined): node is Html {
  return node?.type === "html";
}

function decodeHtml(value: string): string {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

/**
 * Rewrites HTML paragraphs or leftover lists inside a details body as
 * markdown so inline code, badges, and citations go through the lesson
 * pipeline.
 */
function htmlBodyToMarkdown(html: string): string {
  return decodeHtml(html)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<p\b[^>]*>/gi, "")
    .replace(/<\/li>/gi, "\n\n")
    .replace(/<li\b[^>]*>/gi, "")
    .replace(/<\/?(?:ul|ol)\b[^>]*>/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function readDetailsBlock(html: string): AcademyDetailsItem | null {
  const match = html.trim().match(DETAILS_BLOCK);
  const summary = match?.[1]?.trim();
  if (!match || summary === undefined) {
    return null;
  }
  return {
    summary: decodeHtml(summary),
    body: htmlBodyToMarkdown(match[2] ?? ""),
  };
}

function readDetailsOpen(html: string): string | null {
  const match = html.trim().match(DETAILS_OPEN);
  const summary = match?.[1]?.trim();
  return summary === undefined ? null : decodeHtml(summary);
}

function isDetailsBody(value: unknown): value is string | RootContent[] {
  if (typeof value === "string") {
    return true;
  }
  return Array.isArray(value);
}

function isDetailsItem(value: unknown): value is AcademyDetailsItem {
  if (!value || typeof value !== "object") {
    return false;
  }
  if (!("summary" in value) || !("body" in value)) {
    return false;
  }
  return typeof value.summary === "string" && isDetailsBody(value.body);
}

/**
 * Reads accordion items attached to an HTML node by this plugin.
 */
export function readAcademyDetails(node: RootContent): AcademyDetailsItem[] | null {
  if (node.type !== "html") {
    return null;
  }
  const items = node.data?.academyDetails;
  if (!items || items.length === 0 || !items.every(isDetailsItem)) {
    return null;
  }
  return items;
}

function createDetailsNode(items: AcademyDetailsItem[]): Html {
  return {
    type: "html",
    value: "",
    data: { academyDetails: items },
  };
}

function appendDetails(items: AcademyDetailsItem[], next: RootContent[]): void {
  const previous = next.at(-1);
  const existing = previous ? readAcademyDetails(previous) : null;
  if (existing) {
    existing.push(...items);
    return;
  }
  next.push(createDetailsNode(items));
}

function buildDetailsBody(nodes: RootContent[]): string | RootContent[] {
  if (nodes.length === 0) {
    return "";
  }
  if (nodes.every(isHtmlNode)) {
    return htmlBodyToMarkdown(nodes.map((node) => node.value).join("\n"));
  }
  return nodes;
}

/**
 * Turns `<details><summary>` HTML into accordion nodes.
 * Adjacent details become one accordion with multiple items.
 * Collects every sibling until `</details>`, including markdown lists.
 */
export function remarkAcademyDetails() {
  return (tree: Root) => {
    const next: RootContent[] = [];
    const children = tree.children;

    for (let index = 0; index < children.length; index += 1) {
      const node = children[index];
      if (!isHtmlNode(node)) {
        if (node) next.push(node);
        continue;
      }

      const whole = readDetailsBlock(node.value);
      if (whole) {
        appendDetails([whole], next);
        continue;
      }

      const summary = readDetailsOpen(node.value);
      if (summary === null) {
        next.push(node);
        continue;
      }

      const bodyNodes: RootContent[] = [];
      let cursor = index + 1;
      let closed = false;

      while (cursor < children.length) {
        const current = children[cursor];
        if (!current) {
          break;
        }
        if (isHtmlNode(current) && DETAILS_CLOSE.test(current.value.trim())) {
          closed = true;
          cursor += 1;
          break;
        }
        bodyNodes.push(current);
        cursor += 1;
      }

      if (!closed) {
        next.push(node);
        continue;
      }

      appendDetails([{ summary, body: buildDetailsBody(bodyNodes) }], next);
      index = cursor - 1;
    }

    tree.children = next;
  };
}
