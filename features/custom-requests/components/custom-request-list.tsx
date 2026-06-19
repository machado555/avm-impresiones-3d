import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { CustomRequestStatusBadge } from "@/features/custom-requests/components/custom-request-status-badge";
import type { CustomRequest } from "@/types/custom-requests";

export function CustomRequestList({ requests }: { requests: CustomRequest[] }) {
  return (
    <div className="grid gap-3">
      {requests.map((request) => (
        <Link key={request.id} href={`/solicitudes/${request.requestNumber}`}>
          <GlassCard className="grid gap-4 transition hover:-translate-y-1 hover:border-cyan-300/40 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-semibold text-white">{request.projectName}</p>
              <p className="mt-1 text-sm text-slate-400">{request.requestNumber}</p>
            </div>
            <CustomRequestStatusBadge status={request.status} />
          </GlassCard>
        </Link>
      ))}
    </div>
  );
}
