import type { Node, Root } from "mdast";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";

import { assignAcademyHeadingIds } from "@/features/academy/lib/lesson-headings";
import { remarkAcademyAlerts } from "@/features/academy/lib/remark-academy-alerts";
import { remarkAcademyBadges } from "@/features/academy/lib/remark-academy-badges";
import { remarkAcademyCitations } from "@/features/academy/lib/remark-academy-citations";
import { remarkAcademyDetails } from "@/features/academy/lib/remark-academy-details";
import { remarkAcademyTables } from "@/features/academy/lib/remark-academy-tables";

function isRoot(node: Node): node is Root {
  return node.type === "root";
}

function createAcademyProcessor() {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkAcademyAlerts)
    .use(remarkAcademyBadges)
    .use(remarkAcademyCitations)
    .use(remarkAcademyDetails)
    .use(remarkAcademyTables);
}

/** Parses lesson Markdown, or a fragment of it such as the body of a details block. */
export async function parseAcademyMarkdown(content: string): Promise<Root> {
  const processor = createAcademyProcessor();
  const tree = await processor.run(processor.parse(content));
  if (!isRoot(tree)) throw new Error("Academy Markdown did not produce a root node");
  return tree;
}

/**
 * Parses a whole lesson body and gives its section headings their ids. Only the lesson itself
 * goes through here: a fragment parsed on its own must not get ids, or they would repeat.
 */
export async function parseAcademyLesson(content: string): Promise<Root> {
  const tree = await parseAcademyMarkdown(content);
  assignAcademyHeadingIds(tree);
  return tree;
}
