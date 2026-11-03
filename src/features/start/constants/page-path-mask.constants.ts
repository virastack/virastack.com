import type { MaskOptions } from "@virastack/mask";

const MAX_LENGTH = 64;

/** `/team/members`: the page path a person types. A segment starting with `-` is no route. */
export const PAGE_PATH_MASK = {
  mask: `{/}p${"[p]".repeat(MAX_LENGTH - 1)}`,
  tokens: { p: /[a-z0-9/-]/i },
  transform: "lowercase",
  validate: (value: string) =>
    value
      .split("/")
      .slice(1)
      .every((segment) => segment && !segment.startsWith("-")) || "path.invalid",
} satisfies MaskOptions;
