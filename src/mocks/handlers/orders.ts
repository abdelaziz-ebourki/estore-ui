import { http, HttpResponse, delay } from "msw";
import { db, API_DELAY } from "../db";
import { requireAuth } from "./auth";
import { validateBody } from "../helpers/validation";

export const handlers = [
  http.get("/api/orders", async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 50;
    const status = url.searchParams.get("status") || "";
    await delay(API_DELAY);
    let filtered = [...db.orders];
    if (status) filtered = filtered.filter((o) => o.status === status);
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const data = filtered.slice((page - 1) * limit, page * limit);
    return HttpResponse.json({ data, total, page, limit, totalPages });
  }),

  http.get("/api/orders/:id", async ({ params }) => {
    await delay(API_DELAY);
    const order = db.orders.find((o) => o.id === params.id);
    return order ? HttpResponse.json(order) : new HttpResponse(null, { status: 404 });
  }),

  http.post("/api/orders", async ({ request }) => {
    const auth = requireAuth(request);
    if (auth instanceof HttpResponse) return auth;
    const body = (await request.json()) as {
      items: { productId: string; quantity: number }[];
      shippingAddress?: string;
      paymentMethod?: string;
    };
    const validation = validateBody(body, [{ name: "items", required: true }]);
    if (validation) return validation;
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return HttpResponse.json(
        { error: "La commande doit contenir au moins un article" },
        { status: 422 },
      );
    }
    await delay(API_DELAY);
    const orderItems = body.items.map((item) => {
      const product = db.products.find((p) => p.id === item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      return {
        productId: product.id,
        name: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
        image: product.mainImage,
      };
    });
    const total = orderItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 9000) + 1000}`,
      customerId: auth.sub,
      customerName: db.users.find((u) => u.email === auth.sub)?.name || auth.sub,
      items: orderItems,
      itemCount: orderItems.reduce((sum, i) => sum + i.quantity, 0),
      total,
      status: "pending" as const,
      date: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      shippingAddress: body.shippingAddress || "123 Rue de Paris, 75001 Paris",
      paymentMethod: body.paymentMethod || "Carte bancaire",
    };
    db.orders.push(newOrder);
    return HttpResponse.json(newOrder);
  }),

  http.patch("/api/orders/:id", async ({ params, request }) => {
    const { status } = (await request.json()) as { status: string };
    await delay(API_DELAY);
    const idx = db.orders.findIndex((o) => o.id === params.id);
    if (idx > -1) {
      db.orders[idx] = {
        ...db.orders[idx],
        status: status as (typeof db.orders)[number]["status"],
        updatedAt: new Date().toISOString(),
      };
      return HttpResponse.json(db.orders[idx]);
    }
    return new HttpResponse(null, { status: 404 });
  }),
];
