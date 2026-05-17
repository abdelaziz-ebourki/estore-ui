import { http, HttpResponse, delay } from "msw";
import { db, API_DELAY } from "../db";
import { requireAdmin, requireAuth } from "./auth";

export const handlers = [
  http.get("/api/users", async ({ request }) => {
    const admin = requireAdmin(request);
    if (admin instanceof HttpResponse) return admin;
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const limit = Number(url.searchParams.get("limit")) || 50;
    await delay(API_DELAY);
    const total = db.users.length;
    const totalPages = Math.ceil(total / limit);
    const data = db.users.slice((page - 1) * limit, page * limit);
    return HttpResponse.json({ data, total, page, limit, totalPages });
  }),

  http.patch("/api/users/:id", async ({ params, request }) => {
    const admin = requireAdmin(request);
    if (admin instanceof HttpResponse) return admin;
    const body = (await request.json()) as { status: string };
    await delay(API_DELAY);
    const idx = db.users.findIndex((u) => u.id === params.id);
    if (idx > -1) {
      db.users[idx] = { ...db.users[idx], ...body } as (typeof db.users)[number];
      return HttpResponse.json(db.users[idx]);
    }
    return new HttpResponse(null, { status: 404 });
  }),

  http.patch("/api/users/me", async ({ request }) => {
    const auth = requireAuth(request);
    if (auth instanceof HttpResponse) return auth;
    const body = (await request.json()) as { name?: string; avatar?: string };
    await delay(API_DELAY);
    const idx = db.users.findIndex((u) => u.email === auth.sub);
    if (idx > -1) {
      db.users[idx] = { ...db.users[idx], ...body } as (typeof db.users)[number];
      return HttpResponse.json(db.users[idx]);
    }
    return new HttpResponse(null, { status: 404 });
  }),
];
