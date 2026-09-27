import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "store.json");

export async function GET(request: NextRequest) {
  const data = fs.readFileSync(DATA_PATH, "utf-8");
  const store = JSON.parse(data);
  const { id } = request.nextUrl.searchParams;

  if (id) {
    const product = store.products.find((p: { id: number }) => p.id === parseInt(id));
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ product });
  }

  return NextResponse.json({ products: store.products, categories: store.categories });
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
