import Image from "next/image";
import Link from "next/link";
import type { OrderItem } from "@/types/orders";

type OrderItemsListProps = {
  items: OrderItem[];
};

export function OrderItemsList({ items }: OrderItemsListProps) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div key={item.id} className="grid grid-cols-[64px_1fr_auto] gap-3 rounded-[8px] border border-white/10 bg-white/[0.05] p-3">
          <div className="relative h-16 w-16 overflow-hidden rounded-[8px] bg-white/10">
            {item.productImage && <Image src={item.productImage} alt={item.productName ?? ""} fill className="object-cover" />}
          </div>
          <div>
            <Link href={`/productos/${item.productSlug}`} className="font-semibold text-white hover:text-cyan-200">{item.productName}</Link>
            <p className="mt-1 text-sm text-slate-400">Cantidad: {item.quantity}</p>
          </div>
          <p className="text-sm font-semibold text-white">{formatPrice(item.unitPrice * item.quantity)}</p>
        </div>
      ))}
    </div>
  );
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value);
}
