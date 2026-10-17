import type { Root, Blockquote, Paragraph, PhrasingContent, Text } from "mdast";
import { visit } from "unist-util-visit";

const ALERT_PATTERN = /^\[!(TIP|WARNING|CAUTION|NOTE|DO|DONT)\]\s*$/i;

function getFirstText(node: Paragraph): Text | null {
  const first = node.children[0];
  if (first && first.type === "text") {
    return first;
  }
  return null;
}

/**
 * Marks GitHub-style alert blockquotes (`> [!TIP]`) with `data.academyAlert`.
 */
export function remarkAcademyAlerts() {
  return (tree: Root) => {
    visit(tree, "blockquote", (node: Blockquote) => {
      const first = node.children[0];
      if (!first || first.type !== "paragraph") {
        return;
      }

      const textNode = getFirstText(first);
      if (!textNode) {
        return;
      }

      const match = textNode.value.trim().match(ALERT_PATTERN);
      if (!match) {
        return;
      }

      const kind = match[1]?.toUpperCase();
      if (!kind) {
        return;
      }
      node.data = {
        ...node.data,
        hName: "div",
        hProperties: {
          "data-academy-alert": kind,
        },
      };

      const remaining: PhrasingContent[] = first.children.slice(1);
      if (remaining.length > 0) {
        first.children = remaining;
      } else {
        node.children = node.children.slice(1);
      }
    });
  };
}
