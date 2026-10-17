import type { PhrasingContent, Root, Text } from "mdast";
import { visit } from "unist-util-visit";

import { isAcademyBadgeKind } from "@/features/academy/constants/badge.constants";

const BADGE_PATTERN = /\[!([A-Za-z][A-Za-z-]*)\]/g;

type BadgeNode = {
  type: "academyBadge";
  kind: string;
  data: {
    hName: "span";
    hProperties: { "data-academy-badge": string };
  };
};

/**
 * Turns `[!cursor]` tokens into `academyBadge` nodes rendered as badges.
 */
export function remarkAcademyBadges() {
  return (tree: Root) => {
    visit(tree, "text", (node: Text, index, parent) => {
      if (!parent || typeof index !== "number" || !("children" in parent)) {
        return;
      }

      const value = node.value;
      if (!value.includes("[!")) {
        return;
      }

      const parts: PhrasingContent[] = [];
      let lastIndex = 0;

      for (const match of value.matchAll(BADGE_PATTERN)) {
        const kind = match[1];
        const start = match.index ?? 0;

        if (!kind || !isAcademyBadgeKind(kind)) {
          continue;
        }

        if (start > lastIndex) {
          parts.push({ type: "text", value: value.slice(lastIndex, start) });
        }

        const badge: BadgeNode = {
          type: "academyBadge",
          kind,
          data: {
            hName: "span",
            hProperties: { "data-academy-badge": kind },
          },
        };
        parts.push(badge as unknown as PhrasingContent);
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
  };
}
