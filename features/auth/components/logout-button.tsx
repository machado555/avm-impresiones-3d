import { LogOut } from "lucide-react";
import { logoutAction } from "@/features/auth/actions/logout";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white" type="submit">
        <LogOut size={16} />
        Salir
      </button>
    </form>
  );
}
