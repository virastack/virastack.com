/**
 * English anchor ids for the landing page's track groups. The curriculum files keep their
 * original (Turkish) group ids, so the page maps them here; unknown ids fall back to themselves.
 */
export const ACADEMY_GROUP_ANCHORS: Record<string, string> = {
  temeller: "before-you-start",
  "react-ekosistemi": "building-with-react",
  "state-ve-veri-yonetimi": "state-and-data",
  "test-ve-kalite": "testing-quality-and-shipping",
  "ileri-seviye": "advanced",
  "takim-ve-sektor": "team-and-industry",
};

export function getAcademyGroupAnchor(groupId: string): string {
  return ACADEMY_GROUP_ANCHORS[groupId] ?? groupId;
}
