import type { Html, Parent, Root, Table } from "mdast";
import { visit } from "unist-util-visit";

const WIDE_TABLE_COMMENT = /^<!--\s*academy-table:\s*wide\s*-->$/;

function isParent(node: unknown): node is Parent {
  return (
    typeof node === "object" && node !== null && "children" in node && Array.isArray(node.children)
  );
}

/**
 * True when a lesson table was marked with `<!-- academy-table: wide -->`.
 */
export function isWideAcademyTable(table: Table): boolean {
  return table.data?.hProperties?.["data-academy-table"] === "wide";
}

/**
 * Marks the table that follows `<!-- academy-table: wide -->` and drops the comment.
 */
export function remarkAcademyTables() {
  return (tree: Root) => {
    visit(tree, "html", (node: Html, index, parent) => {
      if (!isParent(parent) || typeof index !== "number") {
        return;
      }
      if (!WIDE_TABLE_COMMENT.test(node.value.trim())) {
        return;
      }

      const next = parent.children[index + 1];
      if (next?.type === "table") {
        next.data = {
          ...next.data,
          hProperties: {
            ...next.data?.hProperties,
            "data-academy-table": "wide",
          },
        };
      }

      parent.children.splice(index, 1);
      return index;
    });
  };
}
