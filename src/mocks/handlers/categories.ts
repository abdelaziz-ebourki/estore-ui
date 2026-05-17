import { http, HttpResponse, delay } from "msw";
import { db, API_DELAY } from "../db";
import { requireAdmin } from "./auth";

export const handlers = [
  http.get("/api/categories", async () => {
    await delay(API_DELAY);
    return HttpResponse.json(db.categories);
  }),

  http.get("/api/categories/:id", async ({ params }) => {
    await delay(API_DELAY);
    const cat = db.categories.find((c) => c.id === params.id);
    return cat ? HttpResponse.json(cat) : new HttpResponse(null, { status: 404 });
  }),

  http.post("/api/categories", async ({ request }) => {
    const admin = requireAdmin(request);
    if (admin instanceof HttpResponse) return admin;
    const c = (await request.json()) as Record<string, unknown>;
    await delay(API_DELAY);
    const newCat = {
      ...c,
      id: `cat-${Math.random().toString(36).substring(7)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as (typeof db.categories)[number];
    db.categories.push(newCat);
    return HttpResponse.json(newCat);
  }),

  http.patch("/api/categories/:id", async ({ params, request }) => {
    const admin = requireAdmin(request);
    if (admin instanceof HttpResponse) return admin;
    const c = (await request.json()) as Record<string, unknown>;
    await delay(API_DELAY);
    const idx = db.categories.findIndex((x) => x.id === params.id);
    if (idx > -1) {
      db.categories[idx] = {
        ...db.categories[idx],
        ...c,
        updatedAt: new Date().toISOString(),
      } as (typeof db.categories)[number];
      return HttpResponse.json(db.categories[idx]);
    }
    return new HttpResponse(null, { status: 404 });
  }),

  http.delete("/api/categories/:id", async ({ params, request }) => {
    const admin = requireAdmin(request);
    if (admin instanceof HttpResponse) return admin;
    await delay(API_DELAY);
    const idx = db.categories.findIndex((x) => x.id === params.id);
    if (idx > -1) {
      db.categories.splice(idx, 1);
      return new HttpResponse(null, { status: 204 });
    }
    return new HttpResponse(null, { status: 404 });
  }),
];
