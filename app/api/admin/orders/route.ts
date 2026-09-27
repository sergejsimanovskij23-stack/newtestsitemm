import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "store.json");

export async function GET() {
  const data = fs.readFileSync(DATA_PATH, "utf-8");
  const store = JSON.parse(data);
  return NextResponse.json({ orders: store.orders });
}

export async function PATCH(request: NextRequest) {
  const { id } = request.nextUrl.searchParams;
  const { status } = await request.json();
  const data = fs.readFileSync(DATA_PATH, "utf-8");
  const store = JSON.parse(data);
  const order = store.orders.find((o: { id: string }) => o.id === id);
  if (order) {
    order.status = status;
    fs.writeFileSync(DATA_PATH, JSON.stringify(store, null, 2), "utf-8");
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(request: NextRequest) {
  const { id } = request.nextUrl.searchParams;
  const data = fs.readFileSync(DATA_PATH, "utf-8");
  const store = JSON.parse(data);
  store.orders = store.orders.filter((o: { id: string }) => o.id !== id);
  fs.writeFileSync(DATA_PATH, JSON.stringify(store, null, 2), "utf-8");
  return NextResponse.json({ success: true });
}
