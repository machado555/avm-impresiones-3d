import { Button } from "@/components/ui/button";
import { duplicateCustomRequestQuote } from "@/features/custom-requests/admin/actions/duplicate-custom-request-quote";
import { resendCustomRequestQuote } from "@/features/custom-requests/admin/actions/resend-custom-request-quote";
import type { CustomRequestQuote } from "@/types/custom-requests";

export function AdminRequestQuotesList({ quotes, requestId, requestNumber }: { quotes: CustomRequestQuote[]; requestId: string; requestNumber: string }) {
  if (quotes.length === 0) {
    return <p className="text-sm text-slate-400">Sin cotizaciones.</p>;
  }

  return (
    <div className="grid gap-3">
      {quotes.map((quote) => (
        <div key={quote.id} className="rounded-[8px] border border-white/10 bg-white/[0.05] p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-white">Version {quote.version} · {formatPrice(quote.finalPrice, quote.currency)}</p>
            {quote.isActive && <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">Activa</span>}
          </div>
          <p className="mt-2 text-sm text-slate-400">{quote.material} · margen {quote.marginPercentage}%</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <form action={async () => { "use server"; await duplicateCustomRequestQuote(quote.id, requestId, requestNumber); }}>
              <Button variant="secondary" className="min-h-9 px-4">Duplicar</Button>
            </form>
            <form action={async () => { "use server"; await resendCustomRequestQuote(quote.id, requestId, requestNumber); }}>
              <Button variant="secondary" className="min-h-9 px-4">Reenviar</Button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}

function formatPrice(value: number, currency: string) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
}
