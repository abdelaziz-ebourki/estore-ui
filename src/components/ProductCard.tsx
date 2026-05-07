import { Link } from "react-router-dom";
import { Star, ShoppingCart, Eye } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:border-primary/40 hover:shadow-[var(--shadow-card)]">
      <div className="relative aspect-square overflow-hidden bg-surface">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 p-4 transition duration-300 group-hover:translate-y-0">
          <Link
            to={`/products/${product.id}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-foreground shadow-sm hover:bg-white transition"
          >
            <Eye className="h-4 w-4" />
          </Link>
          <button
            onClick={() => {
              add(product);
              toast.success(`${product.name} ajouté`);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary-glow transition"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span>{product.brand}</span>
          <div className="flex items-center gap-0.5 text-amber-400">
            <Star className="h-3 w-3 fill-amber-400" />
            <span>{product.rating}</span>
          </div>
        </div>

        <Link
          to={`/products/${product.id}`}
          className="mt-1 font-display font-semibold text-foreground hover:text-primary transition line-clamp-1"
        >
          {product.name}
        </Link>

        <div className="mt-auto pt-3 flex items-baseline gap-2">
          <span className="font-display text-lg font-bold">{product.price} €</span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">{product.oldPrice} €</span>
          )}
        </div>
      </div>
    </div>
  );
}
