import { Link, useParams, useNavigate } from "react-router-dom";
import { Star, Check, ShoppingCart, Truck, Shield } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const { add } = useCart();

  if (!product) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Produit introuvable</h1>
        <Link
          to="/products"
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Voir le catalogue
        </Link>
      </div>
    );
  }

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const similar = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
      <nav className="text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">
          Accueil
        </Link>{" "}
        /{" "}
        <Link to="/products" className="hover:text-foreground">
          Produits
        </Link>{" "}
        / <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface aspect-square">
            {discount > 0 && (
              <Badge
                variant="destructive"
                className="absolute left-6 top-6 z-10 rounded-full px-3 py-1 text-sm font-bold shadow-lg"
              >
                -{discount}%
              </Badge>
            )}
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-xl border border-border bg-surface cursor-pointer hover:border-primary transition"
              >
                <img src={product.image} alt="" className="h-full w-full object-cover opacity-80" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            {product.brand}
          </div>
          <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{product.rating}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <span className={product.stock > 0 ? "text-success" : "text-destructive"}>
              {product.stock > 0 ? `En stock (${product.stock})` : "Rupture"}
            </span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <div className="font-display text-4xl font-bold">{product.price} €</div>
            {product.oldPrice && (
              <div className="text-lg text-muted-foreground line-through pb-1">
                {product.oldPrice} €
              </div>
            )}
            {discount > 0 && (
              <Badge variant="destructive" className="mb-2 rounded-full px-2 py-0.5 font-bold">
                -{discount}%
              </Badge>
            )}
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => {
                add(product);
                toast.success(`${product.name} ajouté au panier`);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] hover:bg-primary-glow transition"
            >
              <ShoppingCart className="h-4 w-4" /> Ajouter au panier
            </button>
            <button
              onClick={() => {
                add(product);
                navigate("/cart");
              }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold hover:bg-accent transition"
            >
              Acheter maintenant
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-border p-3 text-sm">
              <Truck className="h-4 w-4 text-primary" /> Livraison 24h
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border p-3 text-sm">
              <Shield className="h-4 w-4 text-primary" /> Garantie 2 ans
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display font-semibold mb-4">Caractéristiques</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {product.specs.map((s: { label: string; value: string }) => (
                <div key={s.label} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <dt className="text-muted-foreground text-xs">{s.label}</dt>
                    <dd className="font-medium">{s.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Produits similaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
