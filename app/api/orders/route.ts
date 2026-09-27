import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "store.json");

export async function GET(request: NextRequest) {
  const data = fs.readFileSync(DATA_PATH, "utf-8");
  const store = JSON.parse(data);
  const { id } = request.nextUrl.searchParams;

  if (id) {
    const order = store.orders.find((o: { id: string }) => o.id === id);
    if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ order });
  }

  return NextResponse.json({ orders: store.orders });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const data = fs.readFileSync(DATA_PATH, "utf-8");
  const store = JSON.parse(data);

  if (body.action === "add_order") {
    const order = {
      id: Date.now().toString(),
      ...body.order,
      status: "новый",
      createdAt: new Date().toISOString(),
    };
    store.orders.push(order);
    fs.writeFileSync(DATA_PATH, JSON.stringify(store, null, 2), "utf-8");
    return NextResponse.json({ success: true, order });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
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
