import type { Heading, List, ListItem, PhrasingContent, Root, Text } from "mdast";
import { visit } from "unist-util-visit";

const CITATION_PATTERN = /\[\^(\d+)\]/g;

const RESOURCE_HEADINGS = new Set([
  "kaynaklar",
  "ek kaynaklar",
  "resources",
  "additional resources",
  "further reading",
  "sources",
  "references",
]);

type CitationNode = {
  type: "academyCitation";
  identifier: string;
  data: {
    hName: "sup";
    hProperties: { "data-academy-citation": string };
  };
};

/**
 * Stable fragment id for a lesson citation, shared by the marker and its source row.
 */
export function getAcademyCitationId(identifier: string): string {
  return `fn-${identifier}`;
}

/**
 * Reads a citation id from a phrasing node produced by this plugin.
 */
export function readAcademyCitationId(node: object): string | null {
  if (!("type" in node) || node.type !== "academyCitation") {
    return null;
  }
  if (!("identifier" in node) || typeof node.identifier !== "string") {
    return null;
  }
  return node.identifier;
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

/**
 * Plain text of a heading’s phrasing children.
 */
export function getAcademyHeadingText(node: Heading): string {
  return phrasingText(node.children).trim();
}

/**
 * Whether a heading titles the lesson resources / further-reading section.
 */
export function isAcademyResourceHeading(node: Heading): boolean {
  const title = getAcademyHeadingText(node).toLocaleLowerCase("tr");
  return RESOURCE_HEADINGS.has(title);
}

function readProperties(item: ListItem): Record<string, unknown> {
  const props = item.data?.hProperties;
  if (!props || typeof props !== "object" || Array.isArray(props)) {
    return {};
  }
  return { ...props };
}

function readListProperties(list: List): Record<string, unknown> {
  const props = list.data?.hProperties;
  if (!props || typeof props !== "object" || Array.isArray(props)) {
    return {};
  }
  return { ...props };
}

function assignSourceIds(list: List): void {
  const start = list.start ?? 1;
  list.data = {
    ...list.data,
    hProperties: {
      ...readListProperties(list),
      "data-academy-resources": "true",
    },
  };
  list.children.forEach((item, index) => {
    const id = getAcademyCitationId(String(start + index));
    item.data = {
      ...item.data,
      hProperties: {
        ...readProperties(item),
        id,
      },
    };
  });
}

/**
 * Whether a list was marked as the lesson “Kaynaklar” / resources section.
 */
export function isAcademyResourceList(node: List): boolean {
  const props = node.data?.hProperties;
  if (!props || typeof props !== "object" || Array.isArray(props)) {
    return false;
  }
  return (
    "data-academy-resources" in props &&
    props["data-academy-resources"] === "true"
  );
}

function markResourceLists(tree: Root): void {
  visit(tree, "heading", (node: Heading, index, parent) => {
    if (!parent || typeof index !== "number" || !("children" in parent)) {
      return;
    }
    if (!isAcademyResourceHeading(node)) {
      return;
    }

    for (let cursor = index + 1; cursor < parent.children.length; cursor += 1) {
      const sibling = parent.children[cursor];
      if (!sibling) continue;
      if (sibling.type === "heading") {
        break;
      }
      if (sibling.type === "list" && sibling.ordered) {
        assignSourceIds(sibling);
        break;
      }
    }
  });
}

/**
 * Turns `[^1]` markers into citation nodes and ids the ordered list under “Kaynaklar”.
 */
export function remarkAcademyCitations() {
  return (tree: Root) => {
    visit(tree, "text", (node: Text, index, parent) => {
      if (!parent || typeof index !== "number" || !("children" in parent)) {
        return;
      }

      const value = node.value;
      if (!value.includes("[^")) {
        return;
      }

      const parts: PhrasingContent[] = [];
      let lastIndex = 0;

      for (const match of value.matchAll(CITATION_PATTERN)) {
        const identifier = match[1];
        const start = match.index;
        if (!identifier || start === undefined) {
          continue;
        }

        if (start > lastIndex) {
          parts.push({ type: "text", value: value.slice(lastIndex, start) });
        }

        const citation: CitationNode = {
          type: "academyCitation",
          identifier,
          data: {
            hName: "sup",
            hProperties: { "data-academy-citation": identifier },
          },
        };
        parts.push(citation as unknown as PhrasingContent);
        lastIndex = start + match[0].length;
      }

      if (parts.length === 0) {
        return;
      }

      if (lastIndex < value.length) {
        parts.push({ type: "text", value: value.slice(lastIndex) });
      }

      parent.children.splice(index, 1, ...parts);
      return index + parts.length;
    });

    markResourceLists(tree);
  };
}
