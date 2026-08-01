import { parseTelemetryBody, recordTelemetryEvent } from "@/lib/telemetry";

export const runtime = "nodejs";

/**
 * Anonymous CLI usage ingest for `npx virastack`.
 * Accepts create/add events; increments Upstash Redis counters. Never stores PII.
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = parseTelemetryBody(json);
  if (!parsed.success) {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    const recorded = await recordTelemetryEvent(parsed.data);
    if (!recorded) {
      return Response.json({ error: "Telemetry unavailable" }, { status: 503 });
    }
  } catch {
    return Response.json({ error: "Telemetry failed" }, { status: 500 });
  }

  return new Response(null, { status: 204 });
}

export function GET() {
  return new Response(null, { status: 405, headers: { Allow: "POST" } });
}
