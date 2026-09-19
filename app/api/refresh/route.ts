import { NextResponse } from "next/server";

export async function GET(request: Request) { return handle(request); }
export async function POST(request: Request) { return handle(request); }

function handle(request: Request) {
  const auth = request.headers.get("Authorization");
  const secret = process.env.CRON_SECRET || "CRON_SECRET_LOCAL_DEV";
  if (!auth || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ ok: true, timestamp: new Date().toISOString(), status: "refreshed" });
}
