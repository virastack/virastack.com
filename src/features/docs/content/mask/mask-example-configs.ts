import { definePreset } from "@virastack/mask/server";

/**
 * The custom (order number) example, shared by the examples index and its detail page.
 * Imported from the server entry: the root entry is a client module.
 */
export const CUSTOM_EXAMPLE_CONFIG = definePreset("orderNo", {
  mask: "aa-9999",
  transform: "uppercase",
});
