"use client";

import { useRouter } from "next/navigation";
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

  function submitForm(form: HTMLFormElement) {
    const params = new URLSearchParams();
    const query = (form.elements.namedItem("query") as HTMLInputElement).value.trim();
    const sort = (form.elements.namedItem("sort") as HTMLSelectElement).value;
    const category = (form.elements.namedItem("category") as HTMLSelectElement).value;
    const minPrice = (form.elements.namedItem("minPrice") as HTMLInputElement).value.trim();
    const maxPrice = (form.elements.namedItem("maxPrice") as HTMLInputElement).value.trim();
    if (query) params.set("query", query);
    if (sort && sort !== "featured") params.set("sort", sort);
    if (category && category !== "all") params.set("category", category);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    router.push(`/productos${params.toString() ? `?${params.toString()}` : ""}`);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submitForm(e.currentTarget);
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    submitForm(e.currentTarget.form!);
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 grid gap-3 rounded-[8px] border border-white/10 bg-white/[0.06] p-4 md:grid-cols-[1fr_auto_auto_auto_auto]">
      <input
        className="rounded-[8px] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
        name="query"
        placeholder="Buscar producto"
        defaultValue={currentQuery ?? ""}
      />
      <input
        className="rounded-[8px] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
        name="minPrice"
        placeholder="Precio min"
        type="number"
        min="0"
        defaultValue={currentMinPrice ?? ""}
      />
      <input
        className="rounded-[8px] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
        name="maxPrice"
        placeholder="Precio max"
        type="number"
        min="0"
        defaultValue={currentMaxPrice ?? ""}
      />
      <select
        className="cursor-pointer rounded-[8px] border border-white/10 bg-[#1a1a2e] px-4 py-3 text-sm text-white outline-none"
        name="sort"
        defaultValue={currentSort ?? "featured"}
        onChange={handleSelectChange}
      >
        <option value="featured">Destacados</option>
        <option value="price-asc">Menor precio</option>
        <option value="price-desc">Mayor precio</option>
      </select>
      <select
        className="cursor-pointer rounded-[8px] border border-white/10 bg-[#1a1a2e] px-4 py-3 text-sm text-white outline-none"
        name="category"
        defaultValue={currentCategory ?? "all"}
        onChange={handleSelectChange}
      >
        <option value="all">Todas las categorias</option>
        {categories.map((category) => (
          <option key={category.id} value={category.slug}>{category.name}</option>
        ))}
      </select>
    </form>
  );
}
