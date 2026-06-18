import type { ProductVariant } from "@/types/products";

type ProductVariantsProps = {
  variants: ProductVariant[];
};

export function ProductVariants({ variants }: ProductVariantsProps) {
  if (variants.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-3">
      <p className="text-sm font-semibold text-white">Variantes</p>
      <div className="grid gap-2">
        {variants.map((variant) => (
          <div key={variant.id} className="rounded-[8px] border border-white/10 bg-white/[0.05] p-3 text-sm text-slate-300">
            <div className="flex flex-wrap gap-2">
              {variant.color && <span>Color: {variant.color}</span>}
              {variant.material && <span>Material: {variant.material}</span>}
              {variant.size && <span>Tamano: {variant.size}</span>}
              {variant.finish && <span>Acabado: {variant.finish}</span>}
            </div>
            <p className="mt-2 text-xs text-slate-500">Stock: {variant.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
