import type { ReactNode } from "react";
import { GlassCard } from "@/components/ui/glass-card";

type AdminStatCardProps = {
  label: string;
  value: ReactNode;
  hint?: string;
};

export function AdminStatCard({ label, value, hint }: AdminStatCardProps) {
  return (
    <GlassCard>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
      {hint && <p className="mt-2 text-xs text-slate-500">{hint}</p>}
    </GlassCard>
  );
}
