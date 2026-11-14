import { describe, expect, it } from "vitest";

import { baseUrl } from "@/test/http";

describe("academy markdown", () => {
  // Lessons come from another repository: their raw HTML must reach the page as text.
  it("shows raw HTML in a lesson as text", async () => {
    const response = await fetch(`${baseUrl()}/academy/vitest/project-cart-flow`);
    const html = await response.text();

    expect(response.status).toBe(200);
    expect(html).toContain("&lt;product name&gt;");
  });
});
