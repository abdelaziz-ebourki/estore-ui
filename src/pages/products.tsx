import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Star, SlidersHorizontal } from "lucide-react";
import { products, brands, categories } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

const PER_PAGE = 8;

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cat = searchParams.get("category") || "";
  const q = searchParams.get("q") || "";

  const setCat = (v: string) => {
    setSearchParams((prev) => {
      if (v) prev.set("category", v);
      else prev.delete("category");
      return prev;
    });
    setPage(1);
  };

  const [selectedBrands, setBrands] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>([0, 2500]);
  const [minRating, setMinRating] = useState(0);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const term = (q || "").toLowerCase().trim();
    return products.filter(
      (p) =>
        (!cat || p.category === cat) &&
        (selectedBrands.length === 0 || selectedBrands.includes(p.brand)) &&
        p.price >= price[0] &&
        p.price <= price[1] &&
        p.rating >= minRating &&
        (!term || p.name.toLowerCase().includes(term) || p.brand.toLowerCase().includes(term)),
    );
  }, [cat, selectedBrands, price, minRating, q]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const view = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold">Catalogue</h1>
        <p className="text-muted-foreground mt-1">{filtered.length} produits disponibles</p>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Filters */}
        <aside className={`${open ? "block" : "hidden"} lg:block`}>
          <div className="sticky top-20 space-y-6 rounded-2xl border border-border bg-card p-5">
            <FilterSection title="Catégorie">
              <button
                onClick={() => setCat("")}
                className={`block w-full text-left text-sm py-1.5 ${
                  !cat
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Toutes
              </button>
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setCat(c.slug)}
                  className={`block w-full text-left text-sm py-1.5 ${
                    cat === c.slug
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </FilterSection>

            <FilterSection title="Prix">
              <Slider
                min={0}
                max={2500}
                step={50}
                value={price}
                onValueChange={(v) => setPrice(v as [number, number])}
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>{price[0]}€</span>
                <span>{price[1]}€</span>
              </div>
            </FilterSection>

            <FilterSection title="Marque">
              <div className="space-y-2">
                {brands.map((b) => (
                  <label key={b} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox
                      checked={selectedBrands.includes(b)}
                      onCheckedChange={(v) =>
                        setBrands((cur) => (v ? [...cur, b] : cur.filter((x) => x !== b)))
                      }
                    />
                    {b}
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Note minimum">
              <div className="space-y-1">
                {[0, 3, 4, 4.5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    className={`flex items-center gap-1 text-sm py-1 ${
                      minRating === r
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {r === 0 ? (
                      "Toutes"
                    ) : (
                      <>
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        {r}+
                      </>
                    )}
                  </button>
                ))}
              </div>
            </FilterSection>
          </div>
        </aside>

        <div>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden mb-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filtres
          </button>

          {view.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              Aucun produit ne correspond à vos critères.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {view.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {pages > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`h-10 w-10 rounded-full text-sm font-semibold transition ${
                    page === n
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border hover:bg-accent"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}
