import { Button } from "@/components/ui/button";

const inputClass = "rounded-[8px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none";

export function AdminCustomRequestFilters() {
  return (
    <form className="glass mb-5 grid gap-3 rounded-[8px] p-4 md:grid-cols-3 lg:grid-cols-6">
      <input className={inputClass} name="query" placeholder="Buscar" />
      <select className={inputClass} name="status" defaultValue="">
        <option value="">Estado</option>
        <option value="pending">Pendiente</option>
        <option value="reviewing">Revision</option>
        <option value="quoted">Cotizada</option>
        <option value="approved">Aprobada</option>
        <option value="printing">Imprimiendo</option>
      </select>
      <select className={inputClass} name="priority" defaultValue="">
        <option value="">Prioridad</option>
        <option value="normal">Normal</option>
        <option value="urgent">Urgente</option>
      </select>
      <select className={inputClass} name="requestType" defaultValue="">
        <option value="">Tipo</option>
        <option value="custom_model">Modelo</option>
        <option value="existing_model_print">Imprimir modelo</option>
        <option value="lithophane">Litofania</option>
        <option value="replacement_part">Repuesto</option>
      </select>
      <input className={inputClass} name="from" type="date" />
      <Button type="submit">Filtrar</Button>
    </form>
  );
}
