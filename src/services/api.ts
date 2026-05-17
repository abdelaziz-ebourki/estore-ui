import {
  type Product,
  type Category,
  type User,
  type Order,
  type DashboardStats,
  type SalesPoint,
  type PaginatedResponse,
  type TopProduct,
  type Review,
  type DashboardActivity,
  type Cart,
  type ShippingOption,
} from "@/types";

const getToken = () => localStorage.getItem("token");

class ApiError extends Error {
  status: number;
  details?: Record<string, string[]>;
  constructor(message: string, status: number, details?: Record<string, string[]>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

const request = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
  };
  if (options.body instanceof FormData) {
    delete headers["Content-Type"];
  }

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    let body: { error?: string; details?: Record<string, string[]> } | undefined;
    try {
      body = await response.json();
    } catch {
      /* empty */
    }
    throw new ApiError(body?.error || response.statusText, response.status, body?.details);
  }

  if (response.status === 204) return {} as T;

  return response.json();
};

export const api = {
  auth: {
    login: async (email: string, _password: string) => {
      void _password;
      const data = await request<{ token: string; role: string; user: User }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      localStorage.setItem("token", data.token);
      return data;
    },
    register: (name: string, email: string) =>
      request<{ token: string; role: string; user: User }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email }),
      }),
    me: () => request<{ user: User; role: string }>("/api/auth/me"),
    changePassword: (currentPassword: string, newPassword: string) =>
      request<{ success: boolean }>("/api/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ currentPassword, newPassword }),
      }),
    logout: () => {
      localStorage.removeItem("token");
    },
  },
  products: {
    list: (params?: {
      page?: number;
      limit?: number;
      sort?: string;
      order?: string;
      category?: string;
      brand?: string;
      q?: string;
      inStock?: string;
    }) => {
      const qs = new URLSearchParams();
      if (params)
        Object.entries(params).forEach(([k, v]) => {
          if (v !== undefined && v !== "") qs.set(k, String(v));
        });
      return request<PaginatedResponse<Product>>(`/api/products?${qs.toString()}`);
    },
    popular: (limit = 8) => request<Product[]>(`/api/products/popular?limit=${limit}`),
    sales: (limit = 3) => request<Product[]>(`/api/products/sales?limit=${limit}`),
    search: (q: string, limit = 10) =>
      request<Product[]>(`/api/products/search?q=${encodeURIComponent(q)}&limit=${limit}`),
    brands: () => request<string[]>("/api/products/brands"),
    get: (id: string) => request<Product>(`/api/products/${id}`),
    create: (p: Omit<Product, "id">) =>
      request<Product>("/api/products", {
        method: "POST",
        body: JSON.stringify(p),
      }),
    update: (id: string, p: Partial<Product>) =>
      request<Product>(`/api/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify(p),
      }),
    delete: (id: string) => request<void>(`/api/products/${id}`, { method: "DELETE" }),
    reviews: {
      list: (productId: string) => request<Review[]>(`/api/products/${productId}/reviews`),
      add: (productId: string, rating: number, comment: string) =>
        request<Review>(`/api/products/${productId}/reviews`, {
          method: "POST",
          body: JSON.stringify({ rating, comment }),
        }),
    },
  },
  categories: {
    list: () => request<Category[]>("/api/categories"),
    get: (id: string) => request<Category>(`/api/categories/${id}`),
    create: (c: Omit<Category, "id">) =>
      request<Category>("/api/categories", {
        method: "POST",
        body: JSON.stringify(c),
      }),
    update: (id: string, c: Partial<Category>) =>
      request<Category>(`/api/categories/${id}`, {
        method: "PATCH",
        body: JSON.stringify(c),
      }),
    delete: (id: string) => request<void>(`/api/categories/${id}`, { method: "DELETE" }),
  },
  newsletter: {
    subscribe: (email: string) =>
      request<{ success: boolean }>("/api/newsletter/subscribe", {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
  },
  users: {
    list: (params?: { page?: number; limit?: number }) => {
      const qs = new URLSearchParams();
      if (params)
        Object.entries(params).forEach(([k, v]) => {
          if (v !== undefined) qs.set(k, String(v));
        });
      return request<PaginatedResponse<User>>(`/api/users?${qs.toString()}`);
    },
    updateStatus: (id: string, status: User["status"]) =>
      request<User>(`/api/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
    updateProfile: (body: { name?: string; avatar?: string }) =>
      request<User>("/api/users/me", {
        method: "PATCH",
        body: JSON.stringify(body),
      }),
  },
  orders: {
    list: (params?: { page?: number; limit?: number; status?: string }) => {
      const qs = new URLSearchParams();
      if (params)
        Object.entries(params).forEach(([k, v]) => {
          if (v !== undefined && v !== "") qs.set(k, String(v));
        });
      return request<PaginatedResponse<Order>>(`/api/orders?${qs.toString()}`);
    },
    get: (id: string) => request<Order>(`/api/orders/${id}`),
    create: (body: {
      items: { productId: string; quantity: number }[];
      shippingAddress?: string;
      paymentMethod?: string;
    }) => request<Order>("/api/orders", { method: "POST", body: JSON.stringify(body) }),
    updateStatus: (id: string, status: Order["status"]) =>
      request<Order>(`/api/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
  },
  upload: {
    image: () => request<{ url: string; filename: string }>("/api/upload", { method: "POST" }),
  },
  cart: {
    get: () => request<Cart>("/api/cart"),
    addItem: (productId: string, quantity = 1) =>
      request<Cart>("/api/cart/items", {
        method: "POST",
        body: JSON.stringify({ productId, quantity }),
      }),
    updateItem: (productId: string, quantity: number) =>
      request<Cart>(`/api/cart/items/${productId}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity }),
      }),
    removeItem: (productId: string) =>
      request<Cart>(`/api/cart/items/${productId}`, { method: "DELETE" }),
    clear: () => request<void>("/api/cart", { method: "DELETE" }),
  },
  wishlist: {
    list: () => request<{ productId: string; addedAt: string }[]>("/api/wishlist"),
    add: (productId: string) =>
      request<{ productId: string; addedAt: string }[]>(`/api/wishlist/${productId}`, {
        method: "POST",
      }),
    remove: (productId: string) =>
      request<{ productId: string; addedAt: string }[]>(`/api/wishlist/${productId}`, {
        method: "DELETE",
      }),
  },
  shipping: {
    calculate: (address: { country?: string }) =>
      request<ShippingOption[]>("/api/shipping/calculate", {
        method: "POST",
        body: JSON.stringify({ address }),
      }),
  },
  dashboard: {
    stats: () => request<DashboardStats>("/api/dashboard/stats"),
    sales: () => request<SalesPoint[]>("/api/dashboard/sales"),
    categoryBreakdown: () =>
      request<{ name: string; value: number }[]>("/api/dashboard/categories"),
    recentActivity: () => request<DashboardActivity[]>("/api/dashboard/activity"),
    topProducts: () => request<TopProduct[]>("/api/dashboard/top-products"),
  },
};
