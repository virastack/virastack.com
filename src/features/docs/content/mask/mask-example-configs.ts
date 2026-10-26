import { definePreset } from "@virastack/mask/server";

/**
 * The custom (plate) example, shared by the examples index and its detail page.
 * Imported from the server entry: the root entry is a client module.
 */
export const CUSTOM_EXAMPLE_CONFIG = definePreset("plate", {
  mask: "99 a[aa] 99[99]",
  transform: "uppercase",
});
