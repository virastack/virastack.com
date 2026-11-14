import { Ratelimit } from "@upstash/ratelimit";
import { z } from "zod";

import { getRedis } from "@/lib/redis";

const SAFE_SEGMENT = /^[a-z0-9][a-z0-9._-]{0,31}$/i;

const telemetryBodySchema = z.object({
  event: z.enum(["create", "add", "remove"]),
  properties: z
    .looseObject({
      template: z.enum(["nextjs", "tanstack"]).optional(),
      i18n: z.boolean().optional(),
      tools: z.array(z.string().max(32)).max(20).optional(),
      tool: z.string().max(32).optional(),
      // The module `virastack add` or `remove` installed or removed, such as `users`.
      feature: z.string().max(32).optional(),
      agents: z
        .array(z.enum(["claude", "cursor", "none"]))
        .max(3)
        .optional(),
      packageManager: z.enum(["pnpm", "npm", "yarn", "bun"]).optional(),
      installOk: z.boolean().optional(),
      skipInstall: z.boolean().optional(),
      cliVersion: z.string().max(32).optional(),
      nodeVersion: z.string().max(32).optional(),
      platform: z.string().max(32).optional(),
    })
    .default({}),
});

export type TelemetryBody = z.infer<typeof telemetryBodySchema>;

function segment(value: string): string | null {
  const trimmed = value.trim().toLowerCase();
  if (!SAFE_SEGMENT.test(trimmed)) return null;
  return trimmed;
}

/** Build Redis counter keys for an anonymous CLI event. */
export function buildTelemetryCounterKeys(body: TelemetryBody): string[] {
  const { event, properties } = body;
  const keys = [`telemetry:${event}:total`];

  if (properties.template) {
    keys.push(`telemetry:${event}:template:${properties.template}`);
  }

  if (typeof properties.i18n === "boolean") {
    keys.push(`telemetry:${event}:i18n:${properties.i18n}`);
  }

  if (properties.packageManager) {
    keys.push(`telemetry:${event}:pm:${properties.packageManager}`);
  }

  if (typeof properties.installOk === "boolean") {
    keys.push(`telemetry:${event}:installOk:${properties.installOk}`);
  }

  if (typeof properties.skipInstall === "boolean") {
    keys.push(`telemetry:${event}:skipInstall:${properties.skipInstall}`);
  }

  if (properties.feature) {
    const safe = segment(properties.feature);
    if (safe) keys.push(`telemetry:${event}:feature:${safe}`);
  }

  const tools = new Set<string>();
  if (properties.tool) tools.add(properties.tool);
  for (const tool of properties.tools ?? []) tools.add(tool);

  for (const tool of tools) {
    const safe = segment(tool);
    if (safe) keys.push(`telemetry:${event}:tool:${safe}`);
  }

  if (properties.agents) {
    const agents = new Set(properties.agents.length === 0 ? ["none"] : properties.agents);
    for (const agent of agents) {
      keys.push(`telemetry:${event}:agent:${agent}`);
    }
  }

  if (properties.platform) {
    const platform = segment(properties.platform);
    if (platform) keys.push(`telemetry:${event}:platform:${platform}`);
  }

  if (properties.cliVersion) {
    const version = segment(properties.cliVersion);
    if (version) keys.push(`telemetry:${event}:cli:${version}`);
  }

  return keys;
}

export function parseTelemetryBody(input: unknown) {
  return telemetryBodySchema.safeParse(input);
}

/** One CLI command sends one event, so this is far above real use and far below abuse. */
const EVENTS_PER_MINUTE = 30;

let ratelimit: Ratelimit | undefined;

/**
 * Limits events per client IP, so nobody can inflate the counters or burn the Upstash quota.
 * Without Redis there is nothing to protect, and the event is refused later anyway.
 */
export async function checkTelemetryRateLimit(
  ip: string,
): Promise<{ allowed: boolean; reset: number }> {
  const redis = getRedis();
  if (!redis) return { allowed: true, reset: 0 };

  ratelimit ??= new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(EVENTS_PER_MINUTE, "1 m"),
    prefix: "ratelimit:telemetry",
  });

  const { success, reset } = await ratelimit.limit(ip);
  return { allowed: success, reset };
}

export async function recordTelemetryEvent(body: TelemetryBody): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;

  const keys = buildTelemetryCounterKeys(body);
  if (keys.length === 0) return true;

  const pipeline = redis.pipeline();
  for (const key of keys) {
    pipeline.incr(key);
  }
  await pipeline.exec();
  return true;
}
