import path from "node:path";
import type { NextConfig } from "next";

import createBundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";

// Validates env at build/dev start; throws on a bad value.
import "./src/env";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const isDev = process.env.NODE_ENV !== "production";

// Vercel's preview toolbar (and its Pusher socket); production never loads it.
const VERCEL_LIVE = "https://vercel.live";
// Guide map: style JSON, vector tiles, glyphs and sprites.
const MAP_TILES = "https://*.cartocdn.com";

/**
 * No `default-src` and no nonce: a per-request nonce would make every page dynamic
 * and give up the static prerender, so inline scripts stay allowed. What the policy
 * does close is every *external* script, worker and network origin we do not use.
 */
const contentSecurityPolicy = [
  "base-uri 'none'",
  "object-src 'none'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  `script-src 'self' 'unsafe-inline' ${VERCEL_LIVE}${isDev ? " 'unsafe-eval'" : ""}`,
  "worker-src 'self' blob:",
  `connect-src 'self' ${MAP_TILES} ${VERCEL_LIVE} wss://ws-us3.pusher.com${isDev ? " ws:" : ""}`,
].join("; ");

const nextConfig: NextConfig = {
  reactCompiler: process.env.NODE_ENV === "production",
  turbopack: {
    root: path.join(import.meta.dirname),
  },
  async redirects() {
    return [
      {
        source: "/contribute",
        destination: "/support",
        permanent: true,
      },
      {
        source: "/:locale(en|tr)/contribute",
        destination: "/:locale/support",
        permanent: true,
      },
      {
        source: "/mask/docs/examples",
        destination: "/mask/examples",
        permanent: true,
      },
      {
        source: "/:locale/mask/docs/examples",
        destination: "/:locale/mask/examples",
        permanent: true,
      },
      {
        source: "/mask/docs/examples/:id",
        destination: "/mask/examples/:id",
        permanent: true,
      },
      {
        source: "/:locale/mask/docs/examples/:id",
        destination: "/:locale/mask/examples/:id",
        permanent: true,
      },
      // Mask v2 renamed or removed these example pages.
      ...[
        ["taxNumber", "vkn"],
        ["numeric", "number"],
      ].flatMap(([from, to]) => [
        { source: `/mask/examples/${from}`, destination: `/mask/examples/${to}`, permanent: true },
        {
          source: `/:locale/mask/examples/${from}`,
          destination: `/:locale/mask/examples/${to}`,
          permanent: true,
        },
      ]),
      ...["email", "url", "zipCode", "alpha", "username", "text"].flatMap((id) => [
        { source: `/mask/examples/${id}`, destination: "/mask/examples", permanent: true },
        {
          source: `/:locale/mask/examples/${id}`,
          destination: "/:locale/mask/examples",
          permanent: true,
        },
      ]),
      {
        source: "/password/docs/examples",
        destination: "/password/examples",
        permanent: true,
      },
      {
        source: "/:locale/password/docs/examples",
        destination: "/:locale/password/examples",
        permanent: true,
      },
      {
        source: "/password/docs/examples/:id",
        destination: "/password/examples/:id",
        permanent: true,
      },
      {
        source: "/:locale/password/docs/examples/:id",
        destination: "/:locale/password/examples/:id",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      // Product loops are rewritten only when the video is re-rendered.
      ...[
        "/start/start-intro.mp4",
        "/start/start-intro-poster.webp",
        "/password/password-intro.mp4",
        "/password/password-intro-poster.webp",
      ].map((source) => ({
        source,
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      })),
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(withBundleAnalyzer(nextConfig));
