import { Button } from "@/components/ui/button";
import { addCustomRequestInternalNote } from "@/features/custom-requests/admin/actions/add-custom-request-internal-note";
import type { CustomRequest } from "@/types/custom-requests";

export function AdminRequestInternalNoteForm({ request }: { request: CustomRequest }) {
  return (
    <form action={addCustomRequestInternalNote} className="grid gap-3">
      <input type="hidden" name="requestId" value={request.id} />
      <input type="hidden" name="requestNumber" value={request.requestNumber} />
      <textarea name="internalNote" defaultValue={request.internalNotes ?? ""} className="min-h-28 rounded-[8px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none" placeholder="Nota interna" />
      <Button type="submit">Guardar nota</Button>
    </form>
  );
}
