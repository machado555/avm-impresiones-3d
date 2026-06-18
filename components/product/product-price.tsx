type ProductPriceProps = {
  price: number;
  compareAtPrice?: number | null;
};

export function ProductPrice({ price, compareAtPrice }: ProductPriceProps) {
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(price);

  const formattedCompareAt = compareAtPrice
    ? new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0
      }).format(compareAtPrice)
    : null;

  return (
    <div className="flex items-baseline gap-3">
      <span className="text-3xl font-semibold text-white">{formattedPrice}</span>
      {formattedCompareAt && <span className="text-sm text-slate-500 line-through">{formattedCompareAt}</span>}
    </div>
  );
}
