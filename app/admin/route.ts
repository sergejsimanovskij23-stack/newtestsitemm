import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "store.json");

function isAuthenticated() {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return false;

  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  const data = JSON.parse(raw);
  const sessions = data.adminSessions || [];
  return sessions.some((s: { token: string }) => s.token === token);
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ authenticated: isAuthenticated() });
}
