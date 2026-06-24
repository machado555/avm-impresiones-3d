"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { VerificationModal } from "@/features/auth/components/verification-modal";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const inputClass = "rounded-[8px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const formData = new FormData(form);

    const firstName = String(formData.get("firstName") ?? "").trim();
    const lastName = String(formData.get("lastName") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const address = String(formData.get("address") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");
    const termsAccepted = formData.get("termsAccepted") === "on";

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Completa todos los campos obligatorios.");
      return;
    }
    if (password.length < 8) {
      setError("La contrasena debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contrasenas no coinciden.");
      return;
    }
    if (!termsAccepted) {
      setError("Debes aceptar los Terminos y Condiciones.");
      return;
    }

    setIsPending(true);
    const supabase = createSupabaseBrowserClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`,
          phone,
          address,
          terms_accepted: true,
          privacy_accepted: true
        }
      }
    });
    setIsPending(false);

    if (signUpError || !data.user) {
      setError(signUpError?.message ?? "No se pudo crear la cuenta.");
      return;
    }

    if (data.session) {
      await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`,
          phone: phone || null,
          address: address || null,
          terms_accepted: true,
          terms_accepted_at: new Date().toISOString(),
          privacy_accepted: true,
          privacy_accepted_at: new Date().toISOString()
        })
        .eq("id", data.user.id);
      router.push("/panel");
      router.refresh();
      return;
    }

    setRegisteredEmail(email);
    setShowVerification(true);
  }

  function handleVerified() {
    router.push("/panel");
    router.refresh();
  }

  if (showVerification) {
    return (
      <VerificationModal
        email={registeredEmail}
        onVerified={handleVerified}
        onBack={() => setShowVerification(false)}
      />
    );
  }

  return (
    <GlassCard className="mx-auto max-w-md">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid grid-cols-2 gap-3">
          <input className={inputClass} name="firstName" placeholder="Nombre" required autoComplete="given-name" />
          <input className={inputClass} name="lastName" placeholder="Apellido" required autoComplete="family-name" />
        </div>
        <input className={inputClass} name="phone" placeholder="Telefono" type="tel" autoComplete="tel" />
        <input className={inputClass} name="address" placeholder="Direccion" autoComplete="street-address" />
        <input className={inputClass} name="email" placeholder="Email" type="email" required autoComplete="email" />
        <input className={inputClass} name="password" placeholder="Contrasena" type="password" required autoComplete="new-password" minLength={8} />
        <input className={inputClass} name="confirmPassword" placeholder="Confirmar contrasena" type="password" required autoComplete="new-password" minLength={8} />
        <label className="flex items-start gap-2 text-sm leading-6 text-slate-300">
          <input name="termsAccepted" type="checkbox" required className="mt-1" />
          <span>
            Acepto los <Link href="/terminos-y-condiciones" className="text-cyan-200">Terminos y Condiciones</Link> (obligatorio)
          </span>
        </label>
        {error && <p className="text-sm text-red-300">{error}</p>}
        <Button type="submit" disabled={isPending}>{isPending ? "Creando cuenta..." : "Crear cuenta"}</Button>
        <Link href="/login" className="text-center text-sm text-cyan-200">Ya tengo una cuenta</Link>
      </form>
    </GlassCard>
  );
}
