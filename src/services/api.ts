import {
  initialProducts,
  initialCategories,
  initialUsers,
  initialOrders,
  type Product,
  type Category,
  type User,
  type Order,
} from "@/data/products";

const DELAY = 1000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  auth: {
    login: async (email: string, _password: string): Promise<"admin" | "customer"> => {
      await sleep(DELAY);
      return email === "admin@example.com" ? "admin" : "customer";
    },
  },
  products: {
    list: async (): Promise<Product[]> => {
      await sleep(DELAY);
      return [...initialProducts];
    },
    popular: async (limit = 8): Promise<Product[]> => {
      await sleep(DELAY);
      // Simulate backend logic: sort by rating then stock
      return [...initialProducts]
        .sort((a, b) => b.rating - a.rating || b.stock - a.stock)
        .slice(0, limit);
    },
    sales: async (limit = 3): Promise<Product[]> => {
      await sleep(DELAY);
      return [...initialProducts]
        .filter((p) => p.oldPrice && p.oldPrice > p.price)
        .sort(
          (a, b) => (b.oldPrice! - b.price) / b.oldPrice! - (a.oldPrice! - a.price) / a.oldPrice!,
        )
        .slice(0, limit);
    },
    get: async (id: string): Promise<Product | undefined> => {
      await sleep(DELAY);
      return initialProducts.find((p) => p.id === id);
    },
    create: async (p: Omit<Product, "id">): Promise<Product> => {
      await sleep(DELAY);
      const newProduct = { ...p, id: Math.random().toString(36).substring(7) };
      initialProducts.push(newProduct);
      return newProduct;
    },
    update: async (id: string, p: Partial<Product>): Promise<Product> => {
      await sleep(DELAY);
      const idx = initialProducts.findIndex((x) => x.id === id);
      initialProducts[idx] = { ...initialProducts[idx], ...p };
      return initialProducts[idx];
    },
    delete: async (id: string): Promise<void> => {
      await sleep(DELAY);
      const idx = initialProducts.findIndex((x) => x.id === id);
      if (idx > -1) initialProducts.splice(idx, 1);
    },
  },
  categories: {
    list: async (): Promise<Category[]> => {
      await sleep(DELAY);
      return [...initialCategories];
    },
    create: async (c: Omit<Category, "id">): Promise<Category> => {
      await sleep(DELAY);
      const newCat = { ...c, id: `cat-${Math.random().toString(36).substring(7)}` };
      initialCategories.push(newCat);
      return newCat;
    },
    delete: async (id: string): Promise<void> => {
      await sleep(DELAY);
      const idx = initialCategories.findIndex((x) => x.id === id);
      if (idx > -1) initialCategories.splice(idx, 1);
    },
  },
  users: {
    list: async (): Promise<User[]> => {
      await sleep(DELAY);
      return [...initialUsers];
    },
  },
  orders: {
    list: async (): Promise<Order[]> => {
      await sleep(DELAY);
      return [...initialOrders];
    },
    updateStatus: async (id: string, status: Order["status"]): Promise<Order> => {
      await sleep(DELAY);
      const idx = initialOrders.findIndex((o) => o.id === id);
      initialOrders[idx].status = status;
      return initialOrders[idx];
    },
  },
};
