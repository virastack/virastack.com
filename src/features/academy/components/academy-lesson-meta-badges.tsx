import { getTranslations } from "next-intl/server";

import { AcademyResourceBadge } from "@/features/academy/components/academy-resource-badge";
import type { AcademyResourceKind } from "@/features/academy/constants/resource.constants";
import type { AcademyResourceCount } from "@/features/academy/lib/count-lesson-resources";

type AcademyTranslator = Awaited<ReturnType<typeof getTranslations<"Academy">>>;

function resourceCountLabel(
  t: AcademyTranslator,
  kind: AcademyResourceKind,
  count: number,
): string {
  switch (kind) {
    case "doc":
      return t("resourceCountDocument", { count });
    case "article":
      return t("resourceCountArticle", { count });
    case "research":
      return t("resourceCountResearch", { count });
    case "repo":
      return t("resourceCountRepo", { count });
    case "video":
      return t("resourceCountVideo", { count });
    case "podcast":
      return t("resourceCountPodcast", { count });
  }
}

type AcademyLessonMetaBadgesProps = {
  counts: readonly AcademyResourceCount[];
  isProject: boolean;
};

export async function AcademyLessonMetaBadges({ counts, isProject }: AcademyLessonMetaBadgesProps) {
  if (counts.length === 0 && !isProject) {
    return null;
  }

  const t = await getTranslations("Academy");

  return (
    <span className="flex max-w-full shrink-0 flex-wrap items-center justify-end gap-1.5 md:gap-2">
      {isProject ? (
        <span className="inline-flex shrink-0 items-center rounded-full border border-green-500/30 bg-green-500/15 px-1.5 py-0.5 text-xs font-medium text-green-950 md:px-2 dark:border-green-400/30 dark:bg-green-400/15 dark:text-green-100">
          {t("projectLabel")}
        </span>
      ) : null}
      {counts.map((item) => (
        <AcademyResourceBadge
          key={item.kind}
          kind={item.kind}
          label={resourceCountLabel(t, item.kind, item.count)}
          className="tabular-nums"
        />
      ))}
    </span>
  );
}
