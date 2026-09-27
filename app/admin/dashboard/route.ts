import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false });
  }

  const data = require("@/lib/utils").readData();
  const sessions = data.adminSessions || [];
  const isValid = sessions.some((s: { token: string }) => s.token === token);

  return NextResponse.json({ authenticated: isValid });
}
