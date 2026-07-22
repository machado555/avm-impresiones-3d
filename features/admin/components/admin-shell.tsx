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
      <aside className="glass h-fit rounded-[var(--avm-radius-md)] p-4">
        <p className="px-3 text-sm font-semibold text-white">AVM Admin</p>
        <nav className="mt-4 grid gap-1">
          {adminNavItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link flex w-full justify-start">
              {item.label}
            </Link>
          ))}
          <Link href="/admin/configuracion" className="nav-link flex w-full justify-start">
            Configuracion
          </Link>
        </nav>
      </aside>
      <div>{children}</div>
    </section>
  );
}
