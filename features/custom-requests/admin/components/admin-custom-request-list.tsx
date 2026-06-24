import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { CustomRequestStatusBadge } from "@/features/custom-requests/components/custom-request-status-badge";
import type { CustomRequest } from "@/types/custom-requests";

export function AdminCustomRequestList({ requests }: { requests: CustomRequest[] }) {
  return (
    <div className="grid gap-3">
      {requests.map((request) => (
        <Link key={request.id} href={`/admin/solicitudes/${request.requestNumber}`} className="cursor-pointer">
          <GlassCard className="grid gap-4 transition hover:-translate-y-1 hover:border-cyan-300/40 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-semibold text-white">{request.projectName}</p>
              <p className="mt-1 text-sm text-slate-400">{request.requestNumber} · {request.contactName} · {request.contactEmail}</p>
            </div>
            <div className="flex items-center gap-2">
              {request.isUrgent && <span className="rounded-full bg-red-400/15 px-3 py-1 text-xs text-red-200">Urgente</span>}
              <CustomRequestStatusBadge status={request.status} />
            </div>
          </GlassCard>
        </Link>
      ))}
    </div>
  );
}
