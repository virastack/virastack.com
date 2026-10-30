import { describe, expect, it } from "vitest";

import { baseUrl, mapLimit, status } from "@/test/http";

async function sitemapUrls(): Promise<string[]> {
  const response = await fetch(`${baseUrl()}/sitemap.xml`);
  expect(response.status).toBe(200);

  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].flatMap((match) => match[1] ?? []);
}

describe("sitemap", () => {
  /**
   * Which host is canonical is a deployment choice, so the suite checks that the
   * sitemap agrees with itself rather than hard-coding one: a split between the
   * apex and www is exactly what mixed origins would look like.
   */
  it("lists every URL once, on a single absolute origin", async () => {
    const urls = await sitemapUrls();

    expect(urls.length).toBeGreaterThan(0);
    expect(new Set(urls).size).toBe(urls.length);
    expect([...new Set(urls.map((url) => new URL(url).origin))]).toHaveLength(1);
  });

  /** A `<lastmod>` is a fixed date or a lesson's own date, never the moving build time. */
  it("gives every URL a valid, non-future lastmod", async () => {
    const xml = await fetch(`${baseUrl()}/sitemap.xml`).then((r) => r.text());
    const dates = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1] ?? "");
    const urls = [...xml.matchAll(/<loc>/g)];

    expect(dates).toHaveLength(urls.length);
    expect(dates.filter((date) => !/^\d{4}-\d{2}-\d{2}/.test(date))).toEqual([]);
    expect(dates.filter((date) => new Date(date).getTime() > Date.now())).toEqual([]);
  });

  /** A sitemap entry that redirects or 404s wastes crawl budget and signals a stale map. */
  it("only lists URLs that answer 200", async () => {
    const urls = await sitemapUrls();
    const paths = urls.map((url) => new URL(url).pathname);

    const codes = await mapLimit(paths, 16, status);
    const wrong = paths
      .map((path, index) => ({ path, code: codes[index] }))
      .filter((entry) => entry.code !== 200);

    expect(wrong).toEqual([]);
  });

  it("declares a canonical URL on the pages it lists", async () => {
    const urls = (await sitemapUrls()).slice(0, 12);

    const missing = await mapLimit(urls, 8, async (url) => {
      const html = await fetch(`${baseUrl()}${new URL(url).pathname}`).then((r) => r.text());
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
      return canonical === url ? null : `${url} -> ${canonical ?? "(yok)"}`;
    });

    expect(missing.filter(Boolean)).toEqual([]);
  });
});
