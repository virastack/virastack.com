const PACKAGE_PATH = /^(https:\/\/github\.com\/[^/]+\/[^/]+)\/tree\/[^/]+\/packages\/([^/]+)\/?$/;

/**
 * Splits a product's GitHub link into its repository and, for a package in a
 * monorepo (`.../form/tree/main/packages/mask`), the package name.
 */
export function parseGithubLink(url: string): { repo: string; slug: string; pkg?: string } {
  const match = PACKAGE_PATH.exec(url);
  const repo = (match?.[1] ?? url).replace(/\/$/, "");
  return { repo, slug: repo.replace(/^https:\/\/github\.com\//, ""), pkg: match?.[2] };
}
