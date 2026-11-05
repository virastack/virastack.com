import { z } from "zod";

/** The part of npm's downloads API response the site reads. */
export const npmDownloadsSchema = z.object({
  downloads: z.number().int().nonnegative(),
});
