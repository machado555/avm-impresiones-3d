import { Section } from "@/components/ui/section";
import { requireAuth } from "@/features/auth/guards/require-auth";

export default async function ProfilePage() {
  const user = await requireAuth("/perfil");

  if (!user) return null;

  return <Section eyebrow="Mi cuenta" title="Perfil" description={`Bienvenido${user.fullName ? `, ${user.fullName}` : ""}. Gestiona tus datos personales desde aca.`} />;
}
