import { githubRepoSchema } from "@/schemas/github-repo.schema";

const ONE_DAY_SECONDS = 60 * 60 * 24;

async function fetchRepoStars(slug: string): Promise<number> {
  const response = await fetch(`https://api.github.com/repos/${slug}`, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate: ONE_DAY_SECONDS },
  });
  if (!response.ok) throw new Error(`GitHub API returned ${response.status} for ${slug}`);

  return githubRepoSchema.parse(await response.json()).stargazers_count;
}

/**
 * Stars of the given repositories (`owner/name`), summed and cached for a day.
 * Returns null when any request fails, so a page hides the figure instead of understating it.
 * A person who starred two repositories counts twice.
 */
export async function getGithubStars(slugs: readonly string[]): Promise<number | null> {
  try {
    const counts = await Promise.all(slugs.map(fetchRepoStars));
    return counts.reduce((total, count) => total + count, 0);
  } catch {
    return null;
  }
}
