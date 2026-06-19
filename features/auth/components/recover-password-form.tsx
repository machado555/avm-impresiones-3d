"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { recoverPasswordAction } from "@/features/auth/actions/recover-password";
import { initialAuthActionState } from "@/features/auth/actions/types";

export function RecoverPasswordForm() {
  const [state, formAction, isPending] = useActionState(recoverPasswordAction, initialAuthActionState);

  return (
    <GlassCard className="mx-auto max-w-md">
      <form action={formAction} className="grid gap-4">
        <input className="rounded-[8px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none" name="email" placeholder="Email" type="email" autoComplete="email" />
        {state.message && <p className={state.status === "error" ? "text-sm text-red-300" : "text-sm text-emerald-300"}>{state.message}</p>}
        <Button type="submit" disabled={isPending}>{isPending ? "Enviando..." : "Enviar enlace"}</Button>
      </form>
    </GlassCard>
  );
}
