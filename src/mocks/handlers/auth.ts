import { http, HttpResponse, delay } from "msw";
import { db, API_DELAY } from "../db";

function getUserFromToken(request: Request): { sub: string; role: string } | null {
  const auth = request.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  try {
    return JSON.parse(atob(auth.slice(7)));
  } catch {
    return null;
  }
}

export function requireAuth(request: Request): { sub: string; role: string } | HttpResponse {
  const user = getUserFromToken(request);
  if (!user) return HttpResponse.json({ error: "Non authentifié" }, { status: 401 });
  return user;
}

export function requireAdmin(request: Request): { sub: string; role: string } | HttpResponse {
  const result = requireAuth(request);
  if (result instanceof HttpResponse) return result;
  if (result.role !== "admin") return HttpResponse.json({ error: "Accès refusé" }, { status: 403 });
  return result;
}

function makeToken(email: string, role: string) {
  return btoa(JSON.stringify({ sub: email, role, iat: Date.now(), exp: Date.now() + 86400000 }));
}

export const handlers = [
  http.post("/api/auth/login", async ({ request }) => {
    const { email } = (await request.json()) as { email: string };
    await delay(API_DELAY);
    const user = db.users.find((u) => u.email === email);
    if (!user)
      return HttpResponse.json({ error: "Email ou mot de passe incorrect" }, { status: 401 });
    const role = email === "admin@example.com" ? "admin" : "customer";
    const token = makeToken(email, role);
    return HttpResponse.json({ token, role, user });
  }),

  http.post("/api/auth/register", async ({ request }) => {
    const { name, email } = (await request.json()) as { name: string; email: string };
    await delay(API_DELAY);
    if (db.users.find((u) => u.email === email)) {
      return HttpResponse.json({ error: "Cet email est déjà utilisé" }, { status: 409 });
    }
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      avatar: `https://i.pravatar.cc/150?u=${email}`,
      orders: 0,
      totalSpent: 0,
      status: "active" as const,
      createdAt: new Date().toISOString(),
    };
    db.users.push(newUser);
    const token = makeToken(email, "customer");
    return HttpResponse.json({ token, role: "customer", user: newUser });
  }),

  http.get("/api/auth/me", async ({ request }) => {
    await delay(API_DELAY);
    const auth = getUserFromToken(request);
    if (!auth) return HttpResponse.json({ error: "Non authentifié" }, { status: 401 });
    const user = db.users.find((u) => u.email === auth.sub);
    if (!user) return HttpResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    return HttpResponse.json({ user, role: auth.role });
  }),

  http.post("/api/auth/change-password", async ({ request }) => {
    const auth = requireAuth(request);
    if (auth instanceof HttpResponse) return auth;
    const { currentPassword, newPassword } = (await request.json()) as {
      currentPassword: string;
      newPassword: string;
    };
    await delay(API_DELAY);
    if (!currentPassword || !newPassword) {
      return HttpResponse.json({ error: "Tous les champs sont requis" }, { status: 422 });
    }
    if (newPassword.length < 6) {
      return HttpResponse.json(
        { error: "Le nouveau mot de passe doit contenir au moins 6 caractères" },
        { status: 422 },
      );
    }
    return HttpResponse.json({ success: true });
  }),
];
