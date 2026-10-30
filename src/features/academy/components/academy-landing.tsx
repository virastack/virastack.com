import { getLocale } from "next-intl/server";

import { formatMonthYear } from "@/helpers/format-date";

import { RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { AcademyHero } from "@/features/academy/components/academy-hero";
import { AcademyTrackCard } from "@/features/academy/components/academy-track-card";
import { getAcademyGroupAnchor } from "@/features/academy/constants/group-anchors.constants";
import { getAcademyLandingStats } from "@/features/academy/lib/academy-landing-stats";
import { ACADEMY_GITHUB_REPO } from "@/features/academy/lib/content-path";
import { getAcademyTrackGroups } from "@/features/academy/lib/load-curriculum";

export async function AcademyLanding() {
  const locale = await getLocale();
  const groups = getAcademyTrackGroups(locale);
  const stats = getAcademyLandingStats(locale);
  const firstGroupId = groups[0]?.id;
  const startHref = firstGroupId ? `#${getAcademyGroupAnchor(firstGroupId)}` : "#";
  const verifiedLabel = stats.lastVerified ? formatMonthYear(stats.lastVerified, locale) : null;

  return (
    <>
      <AcademyHero
        githubHref={ACADEMY_GITHUB_REPO}
        startHref={startHref}
        guideCount={stats.guideCount}
        resourceCount={stats.resourceCount}
        authorCount={stats.authorCount}
        verifiedLabel={verifiedLabel}
      />
      {groups.map((group) => (
        <section
          key={group.id}
          id={getAcademyGroupAnchor(group.id)}
          className="mx-auto max-w-2xl scroll-mt-24 px-6 py-16"
        >
          <RevealGroup className="mb-8 text-center">
            <RevealItem>
              <h2 className="text-2xl font-semibold tracking-tight text-balance">{group.title}</h2>
            </RevealItem>
          </RevealGroup>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {group.tracks.map((track) => (
              <AcademyTrackCard
                key={track.slug}
                track={track}
                className={group.tracks.length === 1 ? "sm:col-span-2" : undefined}
              />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
