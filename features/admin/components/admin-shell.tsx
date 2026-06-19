import type { ReactNode } from "react";
import Link from "next/link";
import { adminNavItems } from "@/features/admin/admin-nav";
import { requireCapability } from "@/features/auth/guards/require-role";

type AdminShellProps = {
  children: ReactNode;
};

export async function AdminShell({ children }: AdminShellProps) {
  await requireCapability("admin:access");

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
      <aside className="glass h-fit rounded-[8px] p-4">
        <p className="px-3 text-sm font-semibold text-white">AVM Admin</p>
        <nav className="mt-4 grid gap-1">
          {adminNavItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-[8px] px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">
              {item.label}
            </Link>
          ))}
          <Link href="/admin/configuracion" className="rounded-[8px] px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">
            Configuracion
          </Link>
        </nav>
      </aside>
      <div>{children}</div>
    </section>
  );
}
