import { NextResponse } from "next/server";
import { SENTINEL_SOURCES } from "@/lib/fallback-data";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    sourcesCount: SENTINEL_SOURCES.length,
    activeSources: SENTINEL_SOURCES.filter(s => s.enabled).length
  });
}
