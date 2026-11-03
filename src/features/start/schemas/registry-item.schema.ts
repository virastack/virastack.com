import { z } from "zod";

/** The part of a registry item the code viewer reads: where each file lands and its source. */
export const registryItemFilesSchema = z.object({
  files: z.array(z.object({ target: z.string(), content: z.string() })),
});

export type RegistryFile = z.infer<typeof registryItemFilesSchema>["files"][number];
