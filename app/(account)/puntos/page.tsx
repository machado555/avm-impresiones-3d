import { Section } from "@/components/ui/section";
import { requireAuth } from "@/features/auth/guards/require-auth";

export default async function PointsPage() {
  await requireAuth("/puntos");

  return <Section eyebrow="Rewards" title="Puntos y recompensas" description="Vista futura con saldo, movimientos, recompensas disponibles y canjes activos." />;
}
