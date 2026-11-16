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

  it("gives lesson sections ids and links them from the table of contents", async () => {
    const response = await fetch(`${baseUrl()}/academy/vitest/project-cart-flow`);
    const html = await response.text();

    expect(html).toContain('<h2 id="scenario"');
    expect(html).toContain('aria-label="On this page"');
    // Once beside the heading, once in the table of contents.
    expect(html.split('href="#scenario"').length - 1).toBe(2);
    // The sources box is not a section: nothing links to it.
    expect(html).not.toContain('href="#sources"');
  });
});
