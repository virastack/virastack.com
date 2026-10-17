"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";

import type { AcademySourceGuide } from "@/features/academy/lib/collect-academy-sources";
import { Link } from "@/i18n/routing";

const SOURCE_GUIDE_PREVIEW_COUNT = 5;

type SourceGuideGroup = {
  trackSlug: string;
  trackTitle: string;
  lessons: AcademySourceGuide[];
};

type AcademySourceGuidesProps = {
  guides: readonly AcademySourceGuide[];
};

function groupSourceGuides(guides: readonly AcademySourceGuide[]): SourceGuideGroup[] {
  const groups: SourceGuideGroup[] = [];
  const indexByTrack = new Map<string, number>();

  for (const guide of guides) {
    const existingIndex = indexByTrack.get(guide.trackSlug);
    if (existingIndex === undefined) {
      indexByTrack.set(guide.trackSlug, groups.length);
      groups.push({
        trackSlug: guide.trackSlug,
        trackTitle: guide.trackTitle,
        lessons: [guide],
      });
      continue;
    }

    const group = groups[existingIndex];
    if (group) {
      group.lessons.push(guide);
    }
  }

  return groups;
}

export function AcademySourceGuides({ guides }: AcademySourceGuidesProps) {
  const t = useTranslations("Academy");
  const [showAll, setShowAll] = useState(false);
  const hiddenCount = showAll ? 0 : Math.max(0, guides.length - SOURCE_GUIDE_PREVIEW_COUNT);
  const visibleGuides = showAll ? guides : guides.slice(0, SOURCE_GUIDE_PREVIEW_COUNT);
  const groups = groupSourceGuides(visibleGuides);

  return (
    <div>
      <p className="text-sm font-medium text-foreground">{t("sourcesGuidesHeading")}</p>
      <div className="mt-2 flex flex-col gap-3">
        {groups.map((group) => (
          <div key={group.trackSlug} className="flex flex-col">
            <p className="text-sm font-medium text-foreground">{group.trackTitle}</p>
            <ul className="mt-1 flex flex-col pl-3">
              {group.lessons.map((lesson) => (
                <li key={`${lesson.trackSlug}/${lesson.lessonSlug}`}>
                  <Link
                    href={`/academy/${lesson.trackSlug}/${lesson.lessonSlug}`}
                    className="flex items-baseline justify-between gap-4 rounded-md py-1 text-sm text-foreground underline-offset-4 hover:underline"
                  >
                    <span className="text-pretty">{lesson.title}</span>
                    <span className="shrink-0 text-muted-foreground tabular-nums">
                      {t("sourcesCitationCount", { count: lesson.citationCount })}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {hiddenCount > 0 ? (
        <button
          type="button"
          className="mt-2 text-sm font-medium text-muted-foreground underline-offset-4 outline-none transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.96] motion-reduce:active:scale-100"
          onClick={() => {
            setShowAll(true);
          }}
        >
          {t("sourcesMoreGuides", { count: hiddenCount })}
        </button>
      ) : null}
    </div>
  );
}
