import Link from "next/link";
import { AdminShell } from "@/features/admin/components/admin-shell";
import { AdminSectionHeader } from "@/features/admin/components/admin-section-header";
import { requireCapability } from "@/features/auth/guards/require-role";
import { getAdminProducts } from "@/features/products/admin/data/get-admin-products";
import { deleteProductAction, duplicateProductAction } from "@/features/products/admin/actions/save-product";

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value);
}

export default async function AdminProductsPage() {
  await requireCapability("products:manage");
  const products = await getAdminProducts();

  return (
    <AdminShell>
      <AdminSectionHeader title="Productos" description="Gestiona el catalogo de productos." />
      <Link
        href="/admin/productos/nuevo"
        className="mb-6 inline-flex items-center rounded-[8px] bg-cyan-400 px-5 py-3 text-sm font-medium text-black transition hover:bg-cyan-300"
      >
        + Nuevo producto
      </Link>
      <div className="overflow-x-auto rounded-[8px] border border-white/10">
        <table className="w-full text-sm text-slate-300">
          <thead className="border-b border-white/10 bg-white/[0.04] text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Imagen</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Oferta</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Puntos</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {products.map((product) => (
              <tr key={product.id} className="transition hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  {product.images?.[0] ? (
                    <img src={product.images[0].url} alt="" className="h-10 w-10 rounded-[4px] object-cover" />
                  ) : (
                    <div className="h-10 w-10 rounded-[4px] bg-white/10" />
                  )}
                </td>
                <td className="px-4 py-3 font-medium text-white">{product.name}</td>
                <td className="px-4 py-3 text-xs">{product.categoryId?.slice(0, 8) ?? "—"}</td>
                <td className="px-4 py-3">{formatPrice(product.price)}</td>
                <td className="px-4 py-3">{product.compareAtPrice ? formatPrice(product.compareAtPrice) : "—"}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    product.status === "active" ? "bg-emerald-400/10 text-emerald-300" :
                    product.status === "inactive" ? "bg-red-400/10 text-red-300" :
                    "bg-slate-400/10 text-slate-400"
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-3">{product.pointsReward ?? 0}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/productos/${product.id}`} className="rounded px-2 py-1 text-xs text-cyan-200 hover:bg-white/10">Editar</Link>
                    <form action={duplicateProductAction.bind(null, product.id)}>
                      <button type="submit" className="rounded px-2 py-1 text-xs text-slate-400 hover:bg-white/10">Duplicar</button>
                    </form>
                    <form action={deleteProductAction.bind(null, product.id)}>
                      <button type="submit" className="rounded px-2 py-1 text-xs text-red-300 hover:bg-white/10" onClick={(e) => { if (!confirm("Archivar producto?")) e.preventDefault(); }}>Archivar</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-slate-500">No hay productos.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
