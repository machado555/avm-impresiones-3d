import { Section } from "@/components/ui/section";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata = {
  title: "Crear cuenta"
};

export default function RegisterPage() {
  return (
    <Section eyebrow="Cuenta" title="Crear cuenta" description="Registro conectado con Supabase Auth y perfil customer.">
      <RegisterForm />
    </Section>
  );
}
