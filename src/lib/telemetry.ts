import { z } from "zod";

import { getRedis } from "@/lib/redis";

const SAFE_SEGMENT = /^[a-z0-9][a-z0-9._-]{0,31}$/i;

const telemetryBodySchema = z.object({
  event: z.enum(["create", "add"]),
  properties: z
    .object({
      template: z.enum(["nextjs", "tanstack"]).optional(),
      i18n: z.boolean().optional(),
      tools: z.array(z.string().max(32)).max(20).optional(),
      tool: z.string().max(32).optional(),
      packageManager: z.enum(["pnpm", "npm", "yarn", "bun"]).optional(),
      installOk: z.boolean().optional(),
      skipInstall: z.boolean().optional(),
      cliVersion: z.string().max(32).optional(),
      nodeVersion: z.string().max(32).optional(),
      platform: z.string().max(32).optional(),
    })
    .passthrough()
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

  const tools = new Set<string>();
  if (properties.tool) tools.add(properties.tool);
  for (const tool of properties.tools ?? []) tools.add(tool);

  for (const tool of tools) {
    const safe = segment(tool);
    if (safe) keys.push(`telemetry:${event}:tool:${safe}`);
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
