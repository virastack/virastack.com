import { z } from "zod";

/** The part of GitHub's repository API response the site reads. */
export const githubRepoSchema = z.object({
  stargazers_count: z.number().int().nonnegative(),
});
