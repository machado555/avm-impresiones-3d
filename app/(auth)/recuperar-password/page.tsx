import { Section } from "@/components/ui/section";
import { RecoverPasswordForm } from "@/features/auth/components/recover-password-form";

export const metadata = {
  title: "Recuperar password"
};

export default function RecoverPasswordPage() {
  return (
    <Section eyebrow="Cuenta" title="Recuperar password" description="Te enviaremos un enlace seguro con Supabase Auth.">
      <RecoverPasswordForm />
    </Section>
  );
}
