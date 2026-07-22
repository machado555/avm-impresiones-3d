import { Button, ButtonLink } from "@/components/ui/button";
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
      <ButtonLink href="/admin/productos/nuevo" className="mb-6">
        + Nuevo producto
      </ButtonLink>
      <div className="avm-table">
        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Precio</th>
              <th>Oferta</th>
              <th>Estado</th>
              <th>Puntos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  {product.images?.[0] ? (
                    <img src={product.images[0].url} alt="" className="h-10 w-10 rounded-[var(--avm-radius-xs)] object-cover" />
                  ) : (
                    <div className="h-10 w-10 rounded-[var(--avm-radius-xs)] bg-white/10" />
                  )}
                </td>
                <td className="font-medium text-white">{product.name}</td>
                <td className="text-xs">{product.categoryId?.slice(0, 8) ?? "-"}</td>
                <td>{formatPrice(product.price)}</td>
                <td>{product.compareAtPrice ? formatPrice(product.compareAtPrice) : "-"}</td>
                <td>
                  <span className={`avm-status-badge ${
                    product.status === "active" ? "avm-status-badge--success" :
                    product.status === "inactive" ? "avm-status-badge--danger" :
                    ""
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td>{product.pointsReward ?? 0}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <ButtonLink href={`/admin/productos/${product.id}`} variant="ghost" size="sm">Editar</ButtonLink>
                    <form action={async () => { await duplicateProductAction(product.id); }}>
                      <Button type="submit" variant="ghost" size="sm">Duplicar</Button>
                    </form>
                    <form action={async () => { await deleteProductAction(product.id); }}>
                      <Button type="submit" variant="danger" size="sm">Archivar</Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-500">No hay productos.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
