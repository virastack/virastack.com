import { z } from "zod";

/** A ```testing-playground``` block: JSON with these fields, or plain markup. */
export const playgroundPayloadSchema = z.object({
  title: z.string().optional(),
  src: z.string().optional(),
  markup: z.string().optional(),
  query: z.string().optional(),
});

export type PlaygroundPayload = z.infer<typeof playgroundPayloadSchema>;
