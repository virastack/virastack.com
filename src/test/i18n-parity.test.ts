import { describe, expect, it } from "vitest";

import en from "@/messages/en.json";
import tr from "@/messages/tr.json";

/** Flattens a message tree into dotted keys, so a missing leaf is visible. */
function keysOf(value: unknown, prefix = ""): string[] {
  if (typeof value !== "object" || value === null) return [prefix];

  return Object.entries(value).flatMap(([key, child]) =>
    keysOf(child, prefix ? `${prefix}.${key}` : key),
  );
}

describe("messages", () => {
  /** A key present in one locale and not the other renders as the raw key in the UI. */
  it("en and tr carry the same keys", () => {
    const enKeys = new Set(keysOf(en));
    const trKeys = new Set(keysOf(tr));

    expect([...enKeys].filter((key) => !trKeys.has(key))).toEqual([]);
    expect([...trKeys].filter((key) => !enKeys.has(key))).toEqual([]);
  });

  it("has no empty values", () => {
    const empty = Object.entries({ en, tr }).flatMap(([locale, messages]) =>
      keysOf(messages)
        .filter((key) => {
          const value = key
            .split(".")
            .reduce<unknown>((node, part) => (node as Record<string, unknown>)?.[part], messages);
          return typeof value === "string" && value.trim() === "";
        })
        .map((key) => `${locale}:${key}`),
    );

    expect(empty).toEqual([]);
  });
});
