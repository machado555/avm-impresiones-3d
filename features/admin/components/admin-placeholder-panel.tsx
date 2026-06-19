import { GlassCard } from "@/components/ui/glass-card";

export function AdminPlaceholderPanel({ title }: { title: string }) {
  return (
    <GlassCard>
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Modulo preparado para gestion completa. Las acciones profundas se conectaran en una etapa operativa posterior.
      </p>
    </GlassCard>
  );
}
