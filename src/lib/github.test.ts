import { describe, expect, it } from "vitest";

import { parseGithubLink } from "@/lib/github";

import { buildDocsGithubIssueUrl } from "@/features/docs/lib/docs-github-issue";

const labels = { page: "Page", problem: "Problem", comment: "Comment" };

describe("parseGithubLink", () => {
  it("keeps a repo link as it is", () => {
    expect(parseGithubLink("https://github.com/virastack/start")).toEqual({
      repo: "https://github.com/virastack/start",
      slug: "virastack/start",
      pkg: undefined,
    });
  });

  it("reads the repo and package from a monorepo package page", () => {
    expect(parseGithubLink("https://github.com/virastack/form/tree/main/packages/address")).toEqual(
      {
        repo: "https://github.com/virastack/form",
        slug: "virastack/form",
        pkg: "address",
      },
    );
  });
});

describe("buildDocsGithubIssueUrl", () => {
  it("files a package's issues in its monorepo, labelled with the package", () => {
    const url = new URL(
      buildDocsGithubIssueUrl({
        githubRepo: "https://github.com/virastack/form/tree/main/packages/mask",
        pageTitle: "Intro",
        pagePath: "/mask/docs",
        labels,
      }),
    );
    expect(url.origin + url.pathname).toBe("https://github.com/virastack/form/issues/new");
    expect(url.searchParams.get("labels")).toBe("pkg:mask");
  });

  it("adds no label for a standalone repo", () => {
    const url = new URL(
      buildDocsGithubIssueUrl({
        githubRepo: "https://github.com/virastack/start/",
        pageTitle: "Intro",
        pagePath: "/start/docs",
        labels,
      }),
    );
    expect(url.origin + url.pathname).toBe("https://github.com/virastack/start/issues/new");
    expect(url.searchParams.has("labels")).toBe(false);
  });
});
