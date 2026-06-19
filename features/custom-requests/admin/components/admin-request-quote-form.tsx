import { Button } from "@/components/ui/button";
import { createCustomRequestQuote } from "@/features/custom-requests/admin/actions/create-custom-request-quote";
import type { CustomRequest } from "@/types/custom-requests";

const inputClass = "rounded-[8px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none";

export function AdminRequestQuoteForm({ request }: { request: CustomRequest }) {
  return (
    <form action={createCustomRequestQuote} className="grid gap-3">
      <input type="hidden" name="requestId" value={request.id} />
      <input type="hidden" name="requestNumber" value={request.requestNumber} />
      <div className="grid gap-3 md:grid-cols-2">
        <input className={inputClass} name="material" placeholder="Material" defaultValue={request.material ?? ""} />
        <input className={inputClass} name="currency" placeholder="Moneda" defaultValue="ARS" />
        <input className={inputClass} name="estimatedWeightGrams" type="number" placeholder="Peso estimado (g)" />
        <input className={inputClass} name="estimatedPrintTimeMinutes" type="number" placeholder="Tiempo impresion (min)" />
        <input className={inputClass} name="materialCost" type="number" placeholder="Costo material" />
        <input className={inputClass} name="laborCost" type="number" placeholder="Mano de obra" />
        <input className={inputClass} name="machineCost" type="number" placeholder="Costo maquina" />
        <input className={inputClass} name="marginPercentage" type="number" placeholder="Margen %" defaultValue="45" />
        <input className={inputClass} name="validUntil" type="date" />
      </div>
      <textarea className={`${inputClass} min-h-24 resize-y`} name="notes" placeholder="Notas de cotizacion" />
      <Button type="submit">Crear cotizacion</Button>
    </form>
  );
}
