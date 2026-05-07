export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "Smartphones" | "Ordinateurs" | "Tablettes" | "Accessoires";
  price: number;
  oldPrice?: number;
  rating: number;
  stock: number;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
};

const img = (q: string) => `https://images.unsplash.com/${q}?auto=format&fit=crop&w=800&q=80`;

export const products: Product[] = [
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: "Smartphones",
    price: 1299,
    oldPrice: 1449,
    rating: 4.8,
    stock: 12,
    image: img("photo-1592750475338-74b7b21085ab"),
    description:
      "Le smartphone le plus avancé d'Apple avec puce A17 Pro, châssis titane et système photo Pro 48 Mpx.",
    specs: [
      { label: "Écran", value: '6.1" Super Retina XDR' },
      { label: "Processeur", value: "Apple A17 Pro" },
      { label: "RAM", value: "8 Go" },
      { label: "Stockage", value: "256 Go" },
    ],
  },
  {
    id: "galaxy-s24-ultra",
    name: "Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Smartphones",
    price: 1199,
    rating: 4.7,
    stock: 8,
    image: img("photo-1610945265064-0e34e5519bbf"),
    description:
      'Smartphone Galaxy AI avec S Pen, écran 6.8" Dynamic AMOLED 2X et zoom optique 5x.',
    specs: [
      { label: "Écran", value: '6.8" QHD+ AMOLED' },
      { label: "Processeur", value: "Snapdragon 8 Gen 3" },
      { label: "RAM", value: "12 Go" },
      { label: "Stockage", value: "512 Go" },
    ],
  },
  {
    id: "macbook-pro-14",
    name: 'MacBook Pro 14" M3',
    brand: "Apple",
    category: "Ordinateurs",
    price: 2199,
    rating: 4.9,
    stock: 5,
    image: img("photo-1517336714731-489689fd1ca8"),
    description:
      "Performances exceptionnelles avec la puce M3 Pro, écran Liquid Retina XDR et autonomie record.",
    specs: [
      { label: "Écran", value: '14.2" Liquid Retina XDR' },
      { label: "Processeur", value: "Apple M3 Pro" },
      { label: "RAM", value: "18 Go" },
      { label: "Stockage", value: "512 Go SSD" },
    ],
  },
  {
    id: "dell-xps-15",
    name: "Dell XPS 15",
    brand: "Dell",
    category: "Ordinateurs",
    price: 1799,
    oldPrice: 1999,
    rating: 4.6,
    stock: 10,
    image: img("photo-1593642632559-0c6d3fc62b89"),
    description: "Ultrabook puissant avec écran OLED 4K, Intel Core i7 et NVIDIA RTX 4060.",
    specs: [
      { label: "Écran", value: '15.6" OLED 4K' },
      { label: "Processeur", value: "Intel Core i7-13700H" },
      { label: "RAM", value: "32 Go" },
      { label: "Stockage", value: "1 To SSD" },
    ],
  },
  {
    id: "ipad-pro-13",
    name: 'iPad Pro 13" M4',
    brand: "Apple",
    category: "Tablettes",
    price: 1499,
    rating: 4.8,
    stock: 15,
    image: img("photo-1561154464-82e9adf32764"),
    description:
      "La tablette ultime avec puce M4, écran Tandem OLED Ultra Retina XDR et support de l'Apple Pencil Pro.",
    specs: [
      { label: "Écran", value: '13" Tandem OLED' },
      { label: "Processeur", value: "Apple M4" },
      { label: "RAM", value: "8 Go" },
      { label: "Stockage", value: "256 Go" },
    ],
  },
  {
    id: "galaxy-tab-s9",
    name: "Galaxy Tab S9",
    brand: "Samsung",
    category: "Tablettes",
    price: 899,
    rating: 4.5,
    stock: 20,
    image: img("photo-1542751110-97427bbecf20"),
    description:
      'Tablette Android premium avec écran AMOLED 11", S Pen inclus et certification IP68.',
    specs: [
      { label: "Écran", value: '11" Dynamic AMOLED' },
      { label: "Processeur", value: "Snapdragon 8 Gen 2" },
      { label: "RAM", value: "8 Go" },
      { label: "Stockage", value: "128 Go" },
    ],
  },
  {
    id: "airpods-pro-2",
    name: "AirPods Pro 2",
    brand: "Apple",
    category: "Accessoires",
    price: 279,
    oldPrice: 299,
    rating: 4.7,
    stock: 50,
    image: img("photo-1606220945770-b5b6c2c55bf1"),
    description:
      "Écouteurs sans fil avec réduction de bruit active adaptative et audio spatial personnalisé.",
    specs: [
      { label: "Type", value: "Intra-auriculaires" },
      { label: "Autonomie", value: "30h avec étui" },
      { label: "Connectivité", value: "Bluetooth 5.3" },
      { label: "ANC", value: "Oui, adaptatif" },
    ],
  },
  {
    id: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5",
    brand: "Sony",
    category: "Accessoires",
    price: 399,
    rating: 4.8,
    stock: 25,
    image: img("photo-1583394838336-acd977736f90"),
    description:
      "Le casque à réduction de bruit de référence avec son haute résolution et 30h d'autonomie.",
    specs: [
      { label: "Type", value: "Circum-auriculaire" },
      { label: "Autonomie", value: "30h" },
      { label: "Connectivité", value: "Bluetooth 5.2 / Jack" },
      { label: "ANC", value: "Oui" },
    ],
  },
  {
    id: "logitech-mx-master-3s",
    name: "Logitech MX Master 3S",
    brand: "Logitech",
    category: "Accessoires",
    price: 109,
    rating: 4.9,
    stock: 40,
    image: img("photo-1527864550417-7fd91fc51a46"),
    description:
      "Souris ergonomique de référence pour les pros, capteur 8000 DPI et clics silencieux.",
    specs: [
      { label: "Capteur", value: "8000 DPI" },
      { label: "Autonomie", value: "70 jours" },
      { label: "Connectivité", value: "Bluetooth / USB-C" },
      { label: "Boutons", value: "7 programmables" },
    ],
  },
  {
    id: "keychron-k2",
    name: "Keychron K2 Pro",
    brand: "Keychron",
    category: "Accessoires",
    price: 119,
    rating: 4.6,
    stock: 30,
    image: img("photo-1587829741301-dc798b83add3"),
    description: "Clavier mécanique sans fil 75% avec switches hot-swap et rétroéclairage RGB.",
    specs: [
      { label: "Type", value: "Mécanique 75%" },
      { label: "Switches", value: "Gateron Pro Brown" },
      { label: "Connectivité", value: "Bluetooth / USB-C" },
      { label: "RGB", value: "Oui" },
    ],
  },
  {
    id: "anker-charger",
    name: "Anker 737 GaNPrime 120W",
    brand: "Anker",
    category: "Accessoires",
    price: 89,
    oldPrice: 119,
    rating: 4.7,
    stock: 60,
    image: img("photo-1583863788434-e58a36330cf0"),
    description:
      "Chargeur ultra-compact 120W GaN avec 3 ports pour recharger laptop, téléphone et accessoires.",
    specs: [
      { label: "Puissance", value: "120W" },
      { label: "Ports", value: "2 USB-C, 1 USB-A" },
      { label: "Technologie", value: "GaN III" },
      { label: "PPS", value: "Oui" },
    ],
  },
  {
    id: "surface-laptop",
    name: "Surface Laptop 5",
    brand: "Microsoft",
    category: "Ordinateurs",
    price: 1599,
    rating: 4.5,
    stock: 7,
    image: img("photo-1611186871348-b1ce696e52c9"),
    description: "Laptop élégant et léger avec écran tactile PixelSense et Intel Core i7 12e gen.",
    specs: [
      { label: "Écran", value: '13.5" PixelSense tactile' },
      { label: "Processeur", value: "Intel Core i7-1255U" },
      { label: "RAM", value: "16 Go" },
      { label: "Stockage", value: "512 Go SSD" },
    ],
  },
];

export const categories = [
  { name: "Smartphones", icon: "📱", slug: "Smartphones" },
  { name: "Ordinateurs", icon: "💻", slug: "Ordinateurs" },
  { name: "Tablettes", icon: "📲", slug: "Tablettes" },
  { name: "Accessoires", icon: "🎧", slug: "Accessoires" },
] as const;

export const brands = [
  "Apple",
  "Samsung",
  "Dell",
  "Sony",
  "Logitech",
  "Keychron",
  "Anker",
  "Microsoft",
];
