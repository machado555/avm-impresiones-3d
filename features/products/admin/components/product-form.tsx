"use client";

import { useActionState, useEffect, useState, useRef, useCallback } from "react";
import { Trash2, Upload, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MonetaryInput } from "@/components/ui/monetary-input";
import { CustomSelect } from "@/components/ui/custom-select";
import { addToast } from "@/lib/stores/toast-store";
import { createProductAction, updateProductAction } from "@/features/products/admin/actions/save-product";
import { uploadProductImage, deleteProductImage, setMainProductImage } from "@/features/products/admin/actions/product-images";
import type { Product, ProductCategory } from "@/types/products";

type ProductFormProps = {
  product?: Product | null;
  categories: ProductCategory[];
};

const statusOptions = [
  { value: "draft", label: "Borrador" },
  { value: "active", label: "Activo" },
  { value: "inactive", label: "Inactivo" }
];

export function ProductForm({ product, categories }: ProductFormProps) {
  const [category, setCategory] = useState<string>(product?.categoryId ?? "");
  const [status, setStatus] = useState<string>(product?.status ?? "draft");
  const [images, setImages] = useState(product?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const isEdit = Boolean(product);

  const wrappedAction = useCallback(
    async (prev: { ok: boolean; message: string; id?: string }) => {
      const form = document.getElementById("product-form") as HTMLFormElement;
      const fd = new FormData(form);
      fd.set("categoryId", category);
      fd.set("status", status);
      if (isEdit) {
        return updateProductAction(product!.id, prev, fd);
      }
      return createProductAction(prev, fd);
    },
    [isEdit, product, category, status]
  );

  const [state, formAction, isPending] = useActionState(wrappedAction, { ok: false, message: "" });

  useEffect(() => {
    if (state.message) addToast(state.ok ? "success" : "error", state.message);
  }, [state]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !product?.id) return;

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const result = await uploadProductImage(product.id, fd);
    if (result.ok && result.url) {
      setImages((prev) => [...prev, { url: result.url!, sortOrder: prev.length } as any]);
    }
    addToast(result.ok ? "success" : "error", result.message);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleDeleteImage(imageId: string, url: string) {
    const result = await deleteProductImage(imageId, url);
    if (result.ok) setImages((prev) => prev.filter((img) => img.id !== imageId));
    addToast(result.ok ? "success" : "error", result.message);
  }

  async function handleSetMain(imageId: string) {
    if (!product?.id) return;
    const result = await setMainProductImage(product.id, imageId);
    if (result.ok) {
      setImages((prev) =>
        prev.map((img) => ({ ...img, sortOrder: img.id === imageId ? 0 : 1 }))
      );
    }
  }

  const inputClass = "rounded-[8px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60";
  const labelClass = "flex flex-col gap-1";
  const labelTextClass = "text-xs text-slate-400 px-1";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <form id="product-form" action={formAction} className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className={labelClass}>
            <span className={labelTextClass}>Nombre</span>
            <input className={inputClass} name="name" placeholder="Nombre del producto" defaultValue={product?.name ?? ""} required />
          </label>
          <label className={labelClass}>
            <span className={labelTextClass}>Slug</span>
            <input className={inputClass} name="slug" placeholder="slug-del-producto" defaultValue={product?.slug ?? ""} required />
          </label>
        </div>

        <label className={labelClass}>
          <span className={labelTextClass}>Descripción</span>
          <textarea className={`${inputClass} min-h-24 resize-y`} name="description" placeholder="Descripcion" defaultValue={product?.description ?? ""} />
        </label>

        <div className="grid gap-4 md:grid-cols-3">
          <label className={labelClass}>
            <span className={labelTextClass}>Precio</span>
            <MonetaryInput name="price" currency="ARS" placeholder="$ 0" defaultValue={product?.price ?? ""} required />
          </label>
          <label className={labelClass}>
            <span className={labelTextClass}>Precio oferta</span>
            <MonetaryInput name="compareAtPrice" currency="ARS" placeholder="$ 0" defaultValue={product?.compareAtPrice ?? ""} />
          </label>
          <label className={labelClass}>
            <span className={labelTextClass}>Stock</span>
            <input
              className={`${inputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              name="stock"
              type="number"
              min="0"
              placeholder="0"
              defaultValue={product?.stock ?? 0}
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label className={labelClass}>
            <span className={labelTextClass}>Puntos que otorga</span>
            <input
              className={`${inputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              name="pointsReward"
              type="number"
              min="0"
              placeholder="0"
              defaultValue={product?.pointsReward ?? 0}
            />
          </label>
          <label className={labelClass}>
            <span className={labelTextClass}>Estado</span>
            <CustomSelect options={statusOptions} value={status} onChange={setStatus} placeholder="Estado" />
          </label>
          <label className={labelClass}>
            <span className={labelTextClass}>Categoría</span>
            <CustomSelect
              options={[{ value: "", label: "Sin categoria" }, ...categories.map((c) => ({ value: c.id, label: c.name }))]}
              value={category}
              onChange={setCategory}
              placeholder="Categoria"
            />
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
          <input name="isFeatured" type="checkbox" defaultChecked={product?.isFeatured ?? false} />
          Producto destacado
        </label>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Guardando..." : product ? "Actualizar producto" : "Crear producto"}
        </Button>
      </form>

      <div className="glass rounded-[8px] p-4">
        <p className="mb-3 text-sm font-semibold text-white">Imagenes</p>
        {product?.id ? (
          <>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            <Button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="mb-3 w-full">
              <Upload size={16} />
              {uploading ? "Subiendo..." : "Subir imagen"}
            </Button>
          </>
        ) : (
          <p className="text-xs text-slate-500">Guarda el producto primero para poder subir imagenes.</p>
        )}
        <div className="grid gap-3">
          {images.map((img) => (
            <div key={img.id ?? img.url} className="relative flex items-center gap-3 rounded-[8px] border border-white/10 bg-black/20 p-2">
              <img src={img.url} alt={img.alt ?? ""} className="h-14 w-14 shrink-0 rounded-[4px] object-cover" />
              <span className="flex-1 truncate text-xs text-slate-400">{img.url.split("/").pop()}</span>
              <div className="flex gap-1">
                {img.sortOrder !== 0 && img.id && (
                  <button type="button" onClick={() => handleSetMain(img.id!)} className="rounded p-1 text-slate-500 hover:text-amber-300" title="Principal">
                    <Star size={14} />
                  </button>
                )}
                {img.sortOrder === 0 && <Star size={14} className="text-amber-300" />}
                {img.id && (
                  <button type="button" onClick={() => handleDeleteImage(img.id!, img.url)} className="rounded p-1 text-slate-500 hover:text-red-300" title="Eliminar">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
