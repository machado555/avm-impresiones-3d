"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { createCustomRequest } from "@/features/custom-requests/actions/create-custom-request";
import { CustomRequestFilesField } from "@/features/custom-requests/components/custom-request-files-field";
import Link from "next/link";

type CustomRequestFormProps = {
  contactName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
};

export function CustomRequestForm({ contactName, contactEmail, contactPhone }: CustomRequestFormProps) {
  const [state, formAction, isPending] = useActionState(
    async (_prev: { ok: boolean; message: string } | null, formData: FormData) => {
      return await createCustomRequest(formData);
    },
    null
  );

  const inputClass = "w-full rounded-[8px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60";

  return (
    <GlassCard>
      <form action={formAction} className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <input className={inputClass} name="contactName" placeholder="Nombre completo" defaultValue={contactName ?? ""} required />
          <input className={inputClass} name="contactEmail" placeholder="Email" type="email" defaultValue={contactEmail ?? ""} required />
          <input className={inputClass} name="contactPhone" placeholder="WhatsApp" defaultValue={contactPhone ?? ""} />
          <select className={inputClass} name="requestType" defaultValue="custom_model">
            <option value="" disabled>Tipo de solicitud</option>
            <option value="custom_model">Modelo personalizado</option>
            <option value="existing_model_print">Imprimir modelo existente</option>
            <option value="lithophane">Litofania</option>
            <option value="replacement_part">Repuesto</option>
            <option value="other">Otro</option>
          </select>
        </div>
        <input className={inputClass} name="projectName" placeholder="Nombre del proyecto" required />
        <textarea className={`${inputClass} min-h-36 resize-y`} name="description" placeholder="Descripcion, medidas aproximadas, material, color y objetivo de uso" required />
        <div className="grid gap-4 md:grid-cols-3">
          <input className={inputClass} name="quantity" placeholder="Cantidad" type="number" min="1" defaultValue="1" />
          <input className={inputClass} name="estimatedSize" placeholder="Tamano aproximado" />
          <input className={inputClass} name="material" placeholder="Material deseado" />
          <input className={inputClass} name="color" placeholder="Color deseado" />
          <select className={inputClass} name="quality" defaultValue="standard">
            <option value="draft">Rapida</option>
            <option value="standard">Standard</option>
            <option value="high">Alta calidad</option>
          </select>
          <select className={inputClass} name="priority" defaultValue="normal">
            <option value="normal">Prioridad normal</option>
            <option value="urgent">Urgente</option>
          </select>
        </div>
        <input className={inputClass} name="estimatedDate" type="date" />
        <textarea className={`${inputClass} min-h-28 resize-y`} name="notes" placeholder="Observaciones" />
        <CustomRequestFilesField />
        {state && !state.ok && (
          <p className="text-sm text-red-300">{state.message}</p>
        )}
        <div className="grid gap-3 text-sm leading-6 text-slate-300">
          <label>
            <input name="privacyAccepted" type="checkbox" required className="mr-2" />
            Acepto la <Link href="/politica-de-privacidad" className="text-cyan-200">Politica de Privacidad</Link>.
          </label>
          <label>
            <input name="termsAccepted" type="checkbox" required className="mr-2" />
            Acepto los <Link href="/terminos-y-condiciones" className="text-cyan-200">Terminos y Condiciones</Link>.
          </label>
          <label>
            <input name="fileOwnershipAccepted" type="checkbox" required className="mr-2" />
            Declaro que poseo los derechos sobre los archivos enviados y autorizo a AVM-Impresiones 3D a utilizarlos exclusivamente para la cotización y fabricación solicitada.
          </label>
        </div>
        <Button type="submit" disabled={isPending}>{isPending ? "Enviando..." : "Enviar solicitud"}</Button>
      </form>
    </GlassCard>
  );
}
