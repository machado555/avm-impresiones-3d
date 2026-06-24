"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { updateProfile } from "@/features/auth/actions/update-profile";
import { addToast } from "@/lib/stores/toast-store";
import type { AuthUser } from "@/types/auth";

type ProfileFormProps = {
  user: AuthUser;
};

export function ProfileForm({ user }: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState(updateProfile, { ok: false, message: "" });

  useEffect(() => {
    if (state.message) {
      addToast(state.ok ? "success" : "error", state.message);
    }
  }, [state]);

  const inputClass = "rounded-[8px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60";

  return (
    <GlassCard className="mx-auto max-w-md">
      <form action={formAction} className="grid gap-4">
        <div className="grid grid-cols-2 gap-3">
          <input className={inputClass} name="firstName" placeholder="Nombre" defaultValue={user.firstName ?? ""} required />
          <input className={inputClass} name="lastName" placeholder="Apellido" defaultValue={user.lastName ?? ""} required />
        </div>
        <input className={inputClass} name="phone" placeholder="Telefono" type="tel" defaultValue={user.phone ?? ""} />
        <input className={inputClass} name="address" placeholder="Direccion" defaultValue={user.address ?? ""} />
        <p className="text-sm text-slate-400">Email: {user.email}</p>
        <Button type="submit" disabled={isPending}>{isPending ? "Guardando..." : "Guardar cambios"}</Button>
      </form>
    </GlassCard>
  );
}
