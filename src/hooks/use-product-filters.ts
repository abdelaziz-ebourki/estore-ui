import { useMemo, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { type Product } from "@/types";
import { api } from "@/services/api";

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cat = searchParams.get("category") || "";
  const q = searchParams.get("q") || "";
  const minDiscount = Number(searchParams.get("minDiscount")) || 0;
  const [selectedBrands, setBrands] = useState<string[]>(
    searchParams.get("brands")?.split(",").filter(Boolean) || [],
  );
  const [price, setPrice] = useState<[number, number]>([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || 2500,
  ]);
  const [minRating, setMinRating] = useState(Number(searchParams.get("minRating")) || 0);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.products.list();
      setAllProducts(data);
    } catch {
      setError("Impossible de charger les produits");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    setSearchParams((prev) => {
      if (selectedBrands.length > 0) prev.set("brands", selectedBrands.join(","));
      else prev.delete("brands");
      prev.set("minPrice", String(price[0]));
      prev.set("maxPrice", String(price[1]));
      if (minRating > 0) prev.set("minRating", String(minRating));
      else prev.delete("minRating");
      return prev;
    });
  }, [selectedBrands, price, minRating, setSearchParams]);

  const filtered = useMemo(() => {
    const term = (q || "").toLowerCase().trim();
    return allProducts.filter((p) => {
      const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
      return (
        (!cat || p.category === cat) &&
        (selectedBrands.length === 0 || selectedBrands.includes(p.brand)) &&
        discount >= minDiscount &&
        p.price >= price[0] &&
        p.price <= price[1] &&
        p.rating >= minRating &&
        (!term || p.name.toLowerCase().includes(term) || p.brand.toLowerCase().includes(term))
      );
    });
  }, [allProducts, cat, selectedBrands, price, minRating, q, minDiscount]);

  const setCat = (v: string) => {
    setSearchParams((prev) => {
      if (v) prev.set("category", v);
      else prev.delete("category");
      return prev;
    });
  };

  const setMinDiscount = (v: number) => {
    setSearchParams((prev) => {
      if (v > 0) prev.set("minDiscount", String(v));
      else prev.delete("minDiscount");
      return prev;
    });
  };

  return {
    filtered,
    isLoading,
    error,
    loadProducts,
    filters: {
      cat,
      setCat,
      q,
      selectedBrands,
      setBrands,
      price,
      setPrice,
      minRating,
      setMinRating,
      minDiscount,
      setMinDiscount,
    },
  };
}
