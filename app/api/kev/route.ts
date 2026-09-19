import { NextResponse } from "next/server";
import { FALLBACK_VULNERABILITIES, GLOBAL_SENTINEL_METRICS } from "@/lib/fallback-data";

export async function GET() {
  return NextResponse.json({
    metrics: GLOBAL_SENTINEL_METRICS,
    vulnerabilities: FALLBACK_VULNERABILITIES,
    asOf: new Date().toISOString()
  });
}
