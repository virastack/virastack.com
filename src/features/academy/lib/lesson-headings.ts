import type { Heading, PhrasingContent, Root } from "mdast";

import { ACADEMY_BADGE_LABELS } from "@/constants/academy-badge.constants";

import { slugify } from "@/helpers/slugify";

import {
  findFollowingResourceList,
  getAcademyCitationId,
  isAcademyResourceHeading,
} from "@/features/academy/lib/remark-academy-citations";

/** A section of a lesson, as its table of contents lists it. */
export type AcademyLessonHeading = {
  id: string;
  title: string;
  level: 2 | 3;
};

/** Used when a title has no letter or digit to build an id from. */
const FALLBACK_ID = "section";

const CITATION_ID_PREFIX = getAcademyCitationId("");

/** Ids the page already uses: the skip link target and the source rows (`fn-1`, `fn-2`…). */
function isReservedId(id: string): boolean {
  if (id === "main-content") return true;
  return id.startsWith(CITATION_ID_PREFIX) && /^\d+$/.test(id.slice(CITATION_ID_PREFIX.length));
}

/** A heading as the reader sees it: code keeps its text, a badge reads as its label. */
function visibleText(nodes: readonly PhrasingContent[]): string {
  return nodes
    .map((node) => {
      if (node.type === "text" || node.type === "inlineCode") return node.value;
      if (node.type === "academyBadge") return ACADEMY_BADGE_LABELS[node.kind] ?? node.kind;
      if ("children" in node) return visibleText(node.children);
      return "";
    })
    .join("");
}

/**
 * Gives every `h2` and `h3` at the top level of a lesson an id built from its title. A heading
 * shown as a resources box is skipped, and so is anything nested in a list, a quote or a
 * details block. A repeated title gets `-2`, `-3`…; a title without letters is `section`.
 */
export function assignAcademyHeadingIds(tree: Root): void {
  const used = new Set<string>();

  tree.children.forEach((node, index) => {
    if (node.type !== "heading" || (node.depth !== 2 && node.depth !== 3)) return;
    if (isAcademyResourceHeading(node) && findFollowingResourceList(tree.children, index)) return;

    const base = slugify(visibleText(node.children)) || FALLBACK_ID;
    let id = base;
    for (let count = 2; used.has(id) || isReservedId(id); count += 1) {
      id = `${base}-${count}`;
    }
    used.add(id);

    node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } };
  });
}

/** The id `assignAcademyHeadingIds` gave a heading, if it gave one. */
export function readAcademyHeadingId(heading: Heading): string | undefined {
  const id = heading.data?.hProperties?.id;
  return typeof id === "string" ? id : undefined;
}

/** The sections of a lesson parsed with `parseAcademyLesson`, in reading order. */
export function readAcademyLessonHeadings(tree: Root): AcademyLessonHeading[] {
  const headings: AcademyLessonHeading[] = [];
  for (const node of tree.children) {
    if (node.type !== "heading" || (node.depth !== 2 && node.depth !== 3)) continue;
    const id = readAcademyHeadingId(node);
    if (!id) continue;
    headings.push({ id, title: getAcademyHeadingTitle(node), level: node.depth });
  }
  return headings;
}

/** The visible text of a heading, for the label of its anchor link. */
export function getAcademyHeadingTitle(heading: Heading): string {
  return visibleText(heading.children).replace(/\s+/g, " ").trim();
}
