import { siteConfig } from "@/config/site.config";

import { parseGithubLink } from "@/lib/github";

type BuildDocsGithubIssueUrlArgs = {
  /** Product GitHub link: a repo root, or a package page in a monorepo. */
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

  // A package in the form monorepo files its issues there, labelled pkg:<name>.
  const { repo, pkg } = parseGithubLink(githubRepo);
  const params = new URLSearchParams({ title, body, ...(pkg ? { labels: `pkg:${pkg}` } : {}) });
  return `${repo}/issues/new?${params.toString()}`;
}

export function docsPagePath(docsIndexHref: string, slug: string): string {
  return slug === "introduction" ? docsIndexHref : `${docsIndexHref}/${slug}`;
}
