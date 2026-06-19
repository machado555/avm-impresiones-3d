"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { loginAction } from "@/features/auth/actions/login";
import { initialAuthActionState } from "@/features/auth/actions/types";

type LoginFormProps = {
  redirectTo?: string;
};

export function LoginForm({ redirectTo = "/panel" }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(loginAction, initialAuthActionState);

  return (
    <GlassCard className="mx-auto max-w-md">
      <form action={formAction} className="grid gap-4">
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <input className="rounded-[8px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none" name="email" placeholder="Email" type="email" autoComplete="email" />
        <input className="rounded-[8px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none" name="password" placeholder="Password" type="password" autoComplete="current-password" />
        {state.message && <p className={state.status === "error" ? "text-sm text-red-300" : "text-sm text-emerald-300"}>{state.message}</p>}
        <Button type="submit" disabled={isPending}>{isPending ? "Ingresando..." : "Entrar"}</Button>
        <Link href="/registro" className="text-center text-sm text-cyan-200">Crear cuenta</Link>
        <Link href="/recuperar-password" className="text-center text-sm text-slate-400">Recuperar password</Link>
      </form>
    </GlassCard>
  );
}
