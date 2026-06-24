"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { CustomSelect } from "@/components/ui/custom-select";
import { MonetaryInput } from "@/components/ui/monetary-input";
import type { ProductCategory } from "@/types/products";

type ProductFiltersProps = {
  categories: ProductCategory[];
  currentQuery: string | undefined;
  currentSort: string | undefined;
  currentCategory: string | undefined;
  currentMinPrice: string | undefined;
  currentMaxPrice: string | undefined;
};

export function ProductFilters({ categories, currentQuery, currentSort, currentCategory, currentMinPrice, currentMaxPrice }: ProductFiltersProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  function buildParams(overrides: Record<string, string>) {
    const params = new URLSearchParams();
    const fd = new FormData(formRef.current!);
    const rawQuery = overrides.query ?? fd.get("query") as string ?? "";
    const rawSort = overrides.sort ?? overrides.category ? (currentSort ?? "featured") : fd.get("sort") as string ?? "";
    const rawCategory = overrides.category ?? overrides.sort ? (currentCategory ?? "all") : fd.get("category") as string ?? "";
    const rawMin = overrides.minPrice ?? fd.get("minPrice") as string ?? "";
    const rawMax = overrides.maxPrice ?? fd.get("maxPrice") as string ?? "";
    if (rawQuery.trim()) params.set("query", rawQuery.trim());
    if (rawSort && rawSort !== "featured") params.set("sort", rawSort);
    if (rawCategory && rawCategory !== "all") params.set("category", rawCategory);
    if (rawMin.trim()) params.set("minPrice", rawMin.trim());
    if (rawMax.trim()) params.set("maxPrice", rawMax.trim());
    return params;
  }

  function navigateWith(overrides: Record<string, string>) {
    const params = buildParams(overrides);
    router.push(`/productos${params.toString() ? `?${params.toString()}` : ""}`);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigateWith({});
  }

  function handleSortChange(val: string) {
    navigateWith({ sort: val });
  }

  function handleCategoryChange(val: string) {
    navigateWith({ category: val });
  }

  return (
    <form ref={formRef} id="product-filter-form" onSubmit={handleSubmit} className="mb-6 grid gap-3 rounded-[8px] border border-white/10 bg-white/[0.06] p-4 md:grid-cols-[1fr_auto_auto_auto_auto]">
      <input
        className="rounded-[8px] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
        name="query"
        placeholder="Buscar producto"
        defaultValue={currentQuery ?? ""}
      />
      <MonetaryInput name="minPrice" placeholder="$ 0" currency="ARS" defaultValue={currentMinPrice ?? ""} />
      <MonetaryInput name="maxPrice" placeholder="$ 0" currency="ARS" defaultValue={currentMaxPrice ?? ""} />
      <input type="hidden" name="sort" value={currentSort ?? "featured"} />
      <input type="hidden" name="category" value={currentCategory ?? "all"} />
      <CustomSelect
        options={[
          { value: "featured", label: "Destacados" },
          { value: "price-asc", label: "Menor precio" },
          { value: "price-desc", label: "Mayor precio" }
        ]}
        value={currentSort ?? "featured"}
        onChange={handleSortChange}
        placeholder="Ordenar por"
      />
      <CustomSelect
        options={[
          { value: "all", label: "Todas las categorias" },
          ...categories.map((c) => ({ value: c.slug, label: c.name }))
        ]}
        value={currentCategory ?? "all"}
        onChange={handleCategoryChange}
        placeholder="Categoria"
      />
    </form>
  );
}
