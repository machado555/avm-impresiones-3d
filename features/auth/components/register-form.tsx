"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { registerAction } from "@/features/auth/actions/register";
import { initialAuthActionState } from "@/features/auth/actions/types";

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, initialAuthActionState);

  return (
    <GlassCard className="mx-auto max-w-md">
      <form action={formAction} className="grid gap-4">
        <input className="rounded-[8px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none" name="fullName" placeholder="Nombre completo" autoComplete="name" />
        <input className="rounded-[8px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none" name="phone" placeholder="Telefono" autoComplete="tel" />
        <input className="rounded-[8px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none" name="email" placeholder="Email" type="email" autoComplete="email" />
        <input className="rounded-[8px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none" name="password" placeholder="Password" type="password" autoComplete="new-password" />
        <label className="text-sm leading-6 text-slate-300">
          <input name="legalAccepted" type="checkbox" required className="mr-2" />
          Acepto los <Link href="/terminos-y-condiciones" className="text-cyan-200">Terminos y Condiciones</Link> y la <Link href="/politica-de-privacidad" className="text-cyan-200">Politica de Privacidad</Link>.
        </label>
        {state.message && <p className={state.status === "error" ? "text-sm text-red-300" : "text-sm text-emerald-300"}>{state.message}</p>}
        <Button type="submit" disabled={isPending}>{isPending ? "Creando..." : "Crear cuenta"}</Button>
      </form>
    </GlassCard>
  );
}
