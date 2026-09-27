import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "store.json");

export async function GET() {
  const data = fs.readFileSync(DATA_PATH, "utf-8");
  const store = JSON.parse(data);
  return NextResponse.json({ products: store.products });
}

export async function DELETE(request: NextRequest) {
  const { id } = request.nextUrl.searchParams;
  const data = fs.readFileSync(DATA_PATH, "utf-8");
  const store = JSON.parse(data);
  store.products = store.products.filter((p: { id: number }) => p.id !== parseInt(id!));
  fs.writeFileSync(DATA_PATH, JSON.stringify(store, null, 2), "utf-8");
  return NextResponse.json({ success: true });
}
