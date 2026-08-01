import { Redis } from "@upstash/redis";

/**
 * Upstash Redis via Vercel Marketplace (`KV_REST_API_*` env vars).
 * Returns null when credentials are missing so the rest of the app still boots.
 */
export function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) return null;

  return new Redis({ url, token });
}
