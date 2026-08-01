import { siteConfig } from "@/config/site.config";

type BuildDocsGithubIssueUrlArgs = {
  /** Product repo root, e.g. https://github.com/virastack/mask */
  githubRepo: string;
  pageTitle: string;
  /** Site path, e.g. /mask/docs/installation */
  pagePath: string;
  labels: {
    page: string;
    problem: string;
    comment: string;
  };
};

/** Prefills a new GitHub issue for a docs page (correct product repo + page URL). */
export function buildDocsGithubIssueUrl({
  githubRepo,
  pageTitle,
  pagePath,
  labels,
}: BuildDocsGithubIssueUrlArgs): string {
  const pageUrl = `${siteConfig.url}${pagePath}`;
  const title = `docs: ${pageTitle}`;
  const body = [
    `**${labels.page}** ${pageUrl}`,
    "",
    `## ${labels.problem}`,
    "",
    `<!-- ${labels.comment} -->`,
    "",
  ].join("\n");

  const params = new URLSearchParams({ title, body });
  return `${githubRepo.replace(/\/$/, "")}/issues/new?${params.toString()}`;
}

export function docsPagePath(docsIndexHref: string, slug: string): string {
  return slug === "introduction" ? docsIndexHref : `${docsIndexHref}/${slug}`;
}
