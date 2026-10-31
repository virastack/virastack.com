import { describe, expect, it } from "vitest";

import { mapLimit, status } from "@/test/http";

/**
 * Unknown URLs must answer 404, not a 200 carrying a "not found" body: a soft 404
 * lets search engines index every typo as a real page.
 */
const UNKNOWN = [
  "/config",
  "/nope-xyz",
  "/tr/nope-xyz",
  "/mask/nope",
  "/tr/mask/nope",
  "/mask/docs/nope",
  "/mask/examples/nope",
  "/password/examples/nope",
  "/address/docs/nope",
  "/address/examples",
  "/mask/tutorial",
  "/start/play",
  "/start/examples",
  "/academy/nope-track",
  "/academy/react/nope-lesson",
  "/a/b/c/d",
];

const PAGES = [
  "/",
  "/tr",
  "/start",
  "/ai",
  "/mask",
  "/password",
  "/address",
  "/guide",
  "/tr/mask",
  "/mask/docs",
  "/tr/mask/docs",
  "/mask/examples",
  "/password/docs",
  "/address/docs",
  "/tr/address/docs/react-hook-form",
  "/ai/docs",
  "/start/docs",
  "/start/builder",
  "/guide/play",
  "/academy",
  "/tr/academy",
  "/academy/react",
  "/about",
  "/brand",
  "/releases",
  "/support",
  "/robots.txt",
  "/sitemap.xml",
];

describe("unknown URLs", () => {
  it("answer 404", async () => {
    const codes = await mapLimit(UNKNOWN, 8, status);
    const wrong = UNKNOWN.filter((path, index) => codes[index] !== 404);

    expect(wrong).toEqual([]);
  });
});

describe("known routes", () => {
  it("answer 200", async () => {
    const codes = await mapLimit(PAGES, 8, status);
    const wrong = PAGES.filter((path, index) => codes[index] !== 200);

    expect(wrong).toEqual([]);
  });
});
