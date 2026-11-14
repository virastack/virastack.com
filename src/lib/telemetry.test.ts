import { describe, expect, it } from "vitest";

import { buildTelemetryCounterKeys, parseTelemetryBody } from "@/lib/telemetry";

/** The CLI (`start/src/utils/telemetry.js`) adds these to every event. */
const cli = { cliVersion: "2.2.0", nodeVersion: "v24.15.0", platform: "darwin" };

function keysFor(body: unknown): string[] {
  const parsed = parseTelemetryBody(body);
  if (!parsed.success) throw new Error("payload was refused");
  return buildTelemetryCounterKeys(parsed.data);
}

describe("telemetry", () => {
  it("counts a module removal by its name", () => {
    const keys = keysFor({
      event: "remove",
      properties: { feature: "users", packageManager: "pnpm", ...cli },
    });

    expect(keys).toContain("telemetry:remove:total");
    expect(keys).toContain("telemetry:remove:feature:users");
    expect(keys).toContain("telemetry:remove:pm:pnpm");
  });

  it("counts which module an add installed", () => {
    const keys = keysFor({
      event: "add",
      properties: { feature: "checkout-card", packageManager: "npm", ...cli },
    });

    expect(keys).toContain("telemetry:add:feature:checkout-card");
  });

  it("skips a feature name that is not a safe key segment", () => {
    const keys = keysFor({ event: "add", properties: { feature: "../users" } });

    expect(keys.some((key) => key.includes(":feature:"))).toBe(false);
  });

  it("refuses an unknown event", () => {
    expect(parseTelemetryBody({ event: "upgrade" }).success).toBe(false);
  });
});
