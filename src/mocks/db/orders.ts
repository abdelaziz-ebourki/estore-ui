import type { Order, OrderItem } from "@/types";

const or = (
  id: string,
  customerId: string,
  customerName: string,
  date: string,
  total: number,
  status: Order["status"],
  items: OrderItem[],
) => ({
  id,
  customerId,
  customerName,
  date,
  total,
  status,
  items,
  itemCount: items.length,
  shippingAddress: "123 Rue de Paris, 75001 Paris",
  paymentMethod: "Carte bancaire",
  createdAt: new Date(date).toISOString(),
  updatedAt: new Date(date).toISOString(),
});

export const orders: Order[] = [
  or("ORD-9283", "user-1", "Jean Dupont", "2024-05-08", 1299, "delivered", [
    {
      productId: "iphone-15-pro",
      name: "iPhone 15 Pro",
      quantity: 1,
      unitPrice: 1299,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
    },
  ]),
  or("ORD-1294", "user-2", "Marie Curie", "2024-05-09", 279, "processing", [
    {
      productId: "sony-wh1000xm5",
      name: "Sony WH-1000XM5",
      quantity: 1,
      unitPrice: 349,
      image:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80",
    },
    {
      productId: "mx-master-3s",
      name: "Logitech MX Master 3S",
      quantity: 2,
      unitPrice: 99,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
    },
  ]),
  or("ORD-4567", "user-3", "Lucas Bernard", "2024-05-09", 450, "pending", [
    {
      productId: "galaxy-s24-ultra",
      name: "Galaxy S24 Ultra",
      quantity: 1,
      unitPrice: 1199,
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
    },
    {
      productId: "ipad-pro-m2",
      name: "iPad Pro 12.9 M2",
      quantity: 1,
      unitPrice: 1449,
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    },
    {
      productId: "macbook-pro-14",
      name: 'MacBook Pro 14" M3',
      quantity: 1,
      unitPrice: 2199,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    },
  ]),
  or("ORD-8821", "user-4", "Sophie Martin", "2024-05-07", 899, "shipped", [
    {
      productId: "dell-xps-15",
      name: "Dell XPS 15",
      quantity: 1,
      unitPrice: 1899,
      image:
        "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
    },
  ]),
  or("ORD-5501", "user-1", "Jean Dupont", "2024-04-15", 150.5, "delivered", [
    {
      productId: "mx-master-3s",
      name: "Logitech MX Master 3S",
      quantity: 1,
      unitPrice: 99,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
    },
    {
      productId: "sony-wh1000xm5",
      name: "Sony WH-1000XM5",
      quantity: 1,
      unitPrice: 349,
      image:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80",
    },
  ]),
  or("ORD-7732", "user-1", "Jean Dupont", "2024-05-10", 349, "pending", [
    {
      productId: "sony-wh1000xm5",
      name: "Sony WH-1000XM5",
      quantity: 1,
      unitPrice: 349,
      image:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80",
    },
  ]),
  or("ORD-3390", "user-1", "Jean Dupont", "2024-05-11", 99, "processing", [
    {
      productId: "mx-master-3s",
      name: "Logitech MX Master 3S",
      quantity: 1,
      unitPrice: 99,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
    },
  ]),
];
