import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, Headphones, Sparkles } from "lucide-react";
import { products, categories } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import hero from "@/assets/hero.jpg";

export function HomePage() {
  const popular = products.slice(0, 8);
  const promos = products.filter((p) => p.oldPrice).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 md:px-6 pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
                <Sparkles className="h-3 w-3 text-primary" /> Nouveautés 2025
              </span>
              <h1 className="mt-5 font-display text-4xl md:text-6xl font-bold leading-[1.05]">
                Le meilleur de la{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  high-tech
                </span>
                , livré chez vous.
              </h1>
              <p className="mt-5 text-lg text-muted-foreground max-w-lg">
                Smartphones, ordinateurs, tablettes et accessoires premium. Sélection rigoureuse,
                prix imbattables.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] hover:bg-primary-glow transition"
                >
                  Voir les produits <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-accent transition"
                >
                  Explorer les offres
                </Link>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
                {[
                  ["+200", "marques"],
                  ["24h", "livraison"],
                  ["4.8★", "satisfaction"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-display text-2xl font-bold">{n}</div>
                    <div className="text-xs text-muted-foreground">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div
                className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-primary/20 to-primary-glow/10 blur-3xl"
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-elegant)]">
                <img
                  src={hero}
                  alt="Produits high-tech TechStore"
                  width={1536}
                  height={1024}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-6 grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
          {[
            [Truck, "Livraison gratuite", "Dès 50€ d'achat"],
            [Shield, "Garantie 2 ans", "Sur tous les produits"],
            [Headphones, "Support 7j/7", "Une équipe à votre écoute"],
          ].map(([Icon, t, s]: any) => (
            <div key={t} className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">{t}</div>
                <div className="text-xs text-muted-foreground">{s}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Catégories</h2>
            <p className="text-muted-foreground mt-1">Trouvez exactement ce que vous cherchez.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/products?category=${c.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-[var(--shadow-card)] transition"
            >
              <div className="text-4xl">{c.icon}</div>
              <div className="mt-6 font-display text-lg font-semibold">{c.name}</div>
              <div className="mt-1 text-xs text-muted-foreground inline-flex items-center gap-1 group-hover:text-primary transition">
                Découvrir <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular products */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Produits populaires</h2>
            <p className="text-muted-foreground mt-1">Les coups de cœur de nos clients.</p>
          </div>
          <Link
            to="/products"
            className="hidden sm:inline-flex text-sm font-medium text-primary hover:underline"
          >
            Voir tout →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {popular.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Promos */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-16">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-glow p-8 md:p-12 text-primary-foreground relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                Offres du moment
              </span>
              <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold">
                Jusqu'à -25%
                <br />
                sur une sélection.
              </h2>
              <p className="mt-3 text-primary-foreground/90 max-w-md">
                Profitez de nos meilleures réductions sur les marques les plus prisées.
              </p>
              <Link
                to="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-card/90 transition"
              >
                Voir les promos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {promos.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="rounded-2xl bg-card p-3 text-foreground hover:scale-105 transition"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="aspect-square w-full rounded-xl object-cover"
                  />
                  <div className="mt-2 text-xs font-semibold line-clamp-1">{p.name}</div>
                  <div className="text-xs text-primary font-bold">{p.price}€</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
