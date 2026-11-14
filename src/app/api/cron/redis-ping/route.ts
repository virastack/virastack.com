import { getRedis } from "@/lib/redis";

export const runtime = "nodejs";

/**
 * Weekly Vercel Cron (see `vercel.json`). Upstash archives a free database after
 * 30 days without requests, so a PING keeps it active without touching any counter.
 * Vercel sends `CRON_SECRET` as a Bearer token; anything else is rejected.
 */
export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const redis = getRedis();
  if (!redis) {
    return Response.json({ error: "Redis unavailable" }, { status: 503 });
  }

  try {
    await redis.ping();
  } catch (error) {
    // Shows up in the cron job's Vercel logs.
    console.error("Redis ping failed", error);
    return Response.json({ error: "Redis ping failed" }, { status: 502 });
  }

  return new Response(null, { status: 204 });
}
