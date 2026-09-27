import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import crypto from "crypto";

const DATA_PATH = path.join(process.cwd(), "data", "store.json");
const ADMIN_PASSWORD = "admin2024";

function readStore() {
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
}

function writeStore(store: unknown) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(store, null, 2), "utf-8");
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Неверный пароль" }, { status: 401 });
    }

    const store = readStore();
    const token = crypto.randomUUID();
    store.adminSessions = store.adminSessions || [];
    store.adminSessions.push({ token, createdAt: new Date().toISOString() });
    writeStore(store);

    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      path: "/admin",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Ошибка авторизации" }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set("admin_token", "", { maxAge: 0, path: "/admin" });
  return res;
}
