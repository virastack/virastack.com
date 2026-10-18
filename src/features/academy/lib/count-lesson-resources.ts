import type { Emphasis, ListItem, PhrasingContent, Root } from "mdast";
import remarkParse from "remark-parse";
import { unified } from "unified";

import {
  parseAcademyResourceKind,
  type AcademyResourceKind,
} from "@/features/academy/constants/resource.constants";
import {
  isAcademyResourceList,
  remarkAcademyCitations,
} from "@/features/academy/lib/remark-academy-citations";

const RESOURCE_COUNT_ORDER = [
  "doc",
  "article",
  "research",
  "repo",
  "video",
  "podcast",
] as const satisfies readonly AcademyResourceKind[];

export type AcademyResourceCount = {
  kind: AcademyResourceKind;
  count: number;
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

function readEmphasisKind(node: Emphasis): AcademyResourceKind | undefined {
  return parseAcademyResourceKind(phrasingText(node.children));
}

function readItemKind(item: ListItem): AcademyResourceKind | undefined {
  for (const child of item.children) {
    if (child.type !== "paragraph") {
      continue;
    }
    for (const inline of child.children) {
      if (inline.type !== "emphasis") {
        continue;
      }
      const kind = readEmphasisKind(inline);
      if (kind) {
        return kind;
      }
    }
  }
  return undefined;
}

/**
 * Counts typed sources in a lesson's resources list.
 */
export function countLessonResources(markdown: string): AcademyResourceCount[] {
  const parsed = unified().use(remarkParse).parse(markdown);
  if (!isRoot(parsed)) {
    return [];
  }

  remarkAcademyCitations()(parsed);

  const totals = new Map<AcademyResourceKind, number>();
  for (const node of parsed.children) {
    if (node.type !== "list" || !isAcademyResourceList(node)) {
      continue;
    }
    for (const item of node.children) {
      const kind = readItemKind(item);
      if (!kind) {
        continue;
      }
      totals.set(kind, (totals.get(kind) ?? 0) + 1);
    }
  }

  return RESOURCE_COUNT_ORDER.flatMap((kind) => {
    const count = totals.get(kind) ?? 0;
    return count > 0 ? [{ kind, count }] : [];
  });
}
