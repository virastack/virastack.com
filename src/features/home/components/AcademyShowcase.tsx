import { useLocale, useTranslations } from "next-intl";

import { RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { ACADEMY_FEATURED_AUTHORS } from "@/features/academy/constants/featured-authors.constants";
import { getAcademyLandingStats } from "@/features/academy/lib/academy-landing-stats";
import { getAcademyTracks } from "@/features/academy/lib/load-curriculum";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/ui/avatar";
import { Link } from "@/i18n/routing";

export function AcademyShowcase() {
  const t = useTranslations("Home");
  const tAcademy = useTranslations("Academy");
  const locale = useLocale();

  const tracks = getAcademyTracks(locale).filter((track) => track.status === "published");
  if (tracks.length === 0) return null;

  // Tracks listed as one entry with separate links, e.g. "Vitest and Playwright".
  const entries = tracks.reduce<(typeof tracks)[]>((acc, track) => {
    const previous = acc.at(-1);
    if (track.slug === "playwright" && previous?.at(-1)?.slug === "vitest") {
      previous.push(track);
    } else {
      acc.push([track]);
    }
    return acc;
  }, []);

  const stats = getAcademyLandingStats(locale);

  return (
    <section id="academy" className="mx-auto max-w-3xl px-6 py-16 text-center">
      <RevealGroup className="flex flex-col items-center gap-6">
        <RevealItem>
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            {t("academyTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-balance text-muted-foreground">
            {t("academyDesc")}
          </p>
        </RevealItem>

        <RevealItem className="flex flex-col items-center gap-3">
          <AvatarGroup>
            {ACADEMY_FEATURED_AUTHORS.map((author) => (
              <a
                key={author.name}
                href={author.href}
                target="_blank"
                rel="noopener"
                aria-label={author.name}
                title={author.name}
                className="relative z-0 rounded-full outline-none hover:z-10 focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Avatar size="lg">
                  <AvatarImage src={author.imageSrc} alt={author.name} />
                  <AvatarFallback>{author.initials}</AvatarFallback>
                </Avatar>
              </a>
            ))}
          </AvatarGroup>
          <p className="text-sm text-muted-foreground">
            {tAcademy("trustLineNoVerified", {
              guideCount: stats.guideCount,
              resourceCount: stats.resourceCount,
              authorCount: stats.authorCount,
            })}
          </p>
        </RevealItem>

        <RevealItem>
          <ul className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            {entries.map((entry, index) => (
              <li key={entry.map((track) => track.slug).join("+")}>
                {entry.map((track, trackIndex) => (
                  <span key={track.slug}>
                    {trackIndex > 0 ? ` ${t("academyAnd")} ` : null}
                    <Link
                      href={`/academy/${track.slug}`}
                      className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      {track.title}
                    </Link>
                  </span>
                ))}
                {index < entries.length - 1 ? (
                  <span aria-hidden className="ml-2">
                    ·
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </RevealItem>

        <RevealItem>
          <Link
            href="/academy"
            className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            {t("academyAll")} →
          </Link>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
