import { getFormatter, getTranslations } from "next-intl/server";

import { getGithubStars } from "@/lib/github-stars";

import { GITHUB_STAR_REPOS } from "@/features/home/constants/github-repos.constants";

/** Total stars beside the home page star button; renders nothing when GitHub cannot be reached. */
export async function CommunityStars() {
  const stars = await getGithubStars(GITHUB_STAR_REPOS);
  if (stars === null) return null;

  const [t, format] = await Promise.all([getTranslations("Home"), getFormatter()]);

  return (
    <span className="border-l border-border pl-2 text-muted-foreground tabular-nums">
      {format.number(stars)}
      <span className="sr-only"> {t("communityStars")}</span>
    </span>
  );
}
