import { Section } from "@/components/ui/section";
import { requireAuth } from "@/features/auth/guards/require-auth";

export default async function PointsPage() {
  await requireAuth("/puntos");

  return <Section eyebrow="Rewards" title="Puntos y recompensas" description="Muy pronto: acumula puntos con tus compras y canjealos por descuentos." />;
}
