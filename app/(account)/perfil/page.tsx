import { Section } from "@/components/ui/section";
import { requireAuth } from "@/features/auth/guards/require-auth";
import { ProfileForm } from "@/features/profile/components/profile-form";

export default async function ProfilePage() {
  const user = await requireAuth("/perfil");

  if (!user) return null;

  return (
    <Section eyebrow="Mi cuenta" title="Perfil" description={`Bienvenido${user.fullName ? `, ${user.fullName}` : ""}. Gestiona tus datos personales desde aca.`}>
      <ProfileForm user={user} />
    </Section>
  );
}
