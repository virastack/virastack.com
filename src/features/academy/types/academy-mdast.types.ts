import type { Data, Node } from "mdast";

/** `[!cursor]` in lesson text, rendered as a technology badge. */
export interface AcademyBadgeNode extends Node {
  type: "academyBadge";
  kind: string;
  data?: Data | undefined;
}

/** `[^1]` in lesson text, rendered as a superscript link to its source row. */
export interface AcademyCitationNode extends Node {
  type: "academyCitation";
  identifier: string;
  data?: Data | undefined;
}

declare module "mdast" {
  interface PhrasingContentMap {
    academyBadge: AcademyBadgeNode;
    academyCitation: AcademyCitationNode;
  }
}
