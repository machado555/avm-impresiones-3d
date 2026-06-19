import { Button } from "@/components/ui/button";
import { updateCustomRequestStatus } from "@/features/custom-requests/admin/actions/update-custom-request-status";
import type { CustomRequest } from "@/types/custom-requests";

export function AdminRequestStatusForm({ request }: { request: CustomRequest }) {
  return (
    <form action={updateCustomRequestStatus} className="grid gap-3">
      <input type="hidden" name="requestId" value={request.id} />
      <input type="hidden" name="requestNumber" value={request.requestNumber} />
      <select name="status" defaultValue={request.status} className="rounded-[8px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none">
        {["pending", "reviewing", "quoted", "approved", "printing", "ready", "delivered", "rejected", "cancelled"].map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
      <Button type="submit">Cambiar estado</Button>
    </form>
  );
}
