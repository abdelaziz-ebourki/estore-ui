import { products as rawProducts } from "./products";
import { categories as rawCategories } from "./categories";
import { users as rawUsers } from "./users";
import { orders as rawOrders } from "./orders";
import { reviews as rawReviews } from "./reviews";
import type { Cart, WishlistItem } from "@/types";

export const API_DELAY = 500;

export const db = {
  products: [...rawProducts],
  categories: [...rawCategories],
  users: [...rawUsers],
  orders: [...rawOrders],
  reviews: [...rawReviews],
  carts: {} as Record<string, Cart>,
  wishlists: {} as Record<string, WishlistItem[]>,
};
