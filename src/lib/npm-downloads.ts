import { npmDownloadsSchema } from "@/schemas/npm-downloads.schema";

const ONE_DAY_SECONDS = 60 * 60 * 24;

/** The window the site reports; the message copy says "3 months" too. */
const WINDOW_MONTHS = 3;

function formatDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Yesterday back to three months earlier, in UTC: npm has no figures for the current day yet. */
function downloadsRange(now: Date): string {
  const end = new Date(now);
  end.setUTCDate(end.getUTCDate() - 1);
  const start = new Date(end);
  start.setUTCMonth(start.getUTCMonth() - WINDOW_MONTHS);
  return `${formatDay(start)}:${formatDay(end)}`;
}

async function fetchDownloads(pkg: string, range: string): Promise<number> {
  const response = await fetch(`https://api.npmjs.org/downloads/point/${range}/${pkg}`, {
    next: { revalidate: ONE_DAY_SECONDS },
  });
  if (!response.ok) throw new Error(`npm downloads API returned ${response.status} for ${pkg}`);

  return npmDownloadsSchema.parse(await response.json()).downloads;
}

/**
 * Total npm downloads of the given packages over the last 3 months, cached for a day.
 * Returns null when any request fails: a partial sum would understate the figure.
 * The count includes CI, mirror and scanner downloads, not only people.
 */
export async function getRecentDownloads(packages: readonly string[]): Promise<number | null> {
  const range = downloadsRange(new Date());

  try {
    const counts = await Promise.all(packages.map((pkg) => fetchDownloads(pkg, range)));
    return counts.reduce((total, count) => total + count, 0);
  } catch {
    return null;
  }
}
