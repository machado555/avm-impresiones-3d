"use client";

import { useState, useRef, type FormEvent } from "react";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type VerificationModalProps = {
  email: string;
  onVerified: () => void;
  onBack: () => void;
};

export function VerificationModal({ email, onVerified, onBack }: VerificationModalProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(index: number, value: string) {
    if (value.length > 1) return;
    const next = [...code];
    next[index] = value;
    setCode(next);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const token = code.join("");
    if (token.length !== 6) {
      setError("Ingresa el codigo completo de 6 digitos.");
      return;
    }
    setError("");
    setIsPending(true);
    const supabase = createSupabaseBrowserClient();
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "signup"
    });
    setIsPending(false);
    if (verifyError) {
      setError(verifyError.message === "Token has expired or is invalid"
        ? "El codigo expiro o es invalido. Solicita uno nuevo."
        : verifyError.message
      );
      return;
    }
    onVerified();
  }

  async function handleResend() {
    setResendMessage("");
    const supabase = createSupabaseBrowserClient();
    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email
    });
    if (resendError) {
      setError(resendError.message);
      return;
    }
    setResendMessage("Codigo reenviado. Revisa tu bandeja de entrada.");
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="glass w-full max-w-md rounded-[var(--avm-radius-lg)] border border-white/15 p-8">
        <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-cyan-300/20 to-violet-500/20">
          <Mail className="text-cyan-200" size={26} />
        </div>
        <h2 className="text-center text-xl font-semibold text-white">Verifica tu correo</h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Enviamos un codigo de verificacion a <span className="font-medium text-slate-200">{email}</span>
        </p>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
          <div className="flex justify-center gap-2">
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="avm-input h-12 w-11 p-0 text-center text-lg font-semibold"
                autoComplete="one-time-code"
              />
            ))}
          </div>
          {error && <p className="text-center text-sm text-red-300">{error}</p>}
          {resendMessage && <p className="text-center text-sm text-emerald-300">{resendMessage}</p>}
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <><Loader2 size={16} className="animate-spin" /> Verificando...</>
            ) : (
              "Verificar codigo"
            )}
          </Button>
        </form>
        <div className="mt-4 flex items-center justify-between">
          <Button type="button" variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={14} /> Volver
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={handleResend}>
            Reenviar codigo
          </Button>
        </div>
      </div>
    </div>
  );
}
