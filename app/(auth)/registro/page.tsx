import { Section } from "@/components/ui/section";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata = {
  title: "Crear cuenta"
};

export default function RegisterPage() {
  return (
    <Section eyebrow="Cuenta" title="Crear cuenta" description="Completa tus datos y empezá a disfrutar de todos los beneficios.">
      <RegisterForm />
    </Section>
  );
}
