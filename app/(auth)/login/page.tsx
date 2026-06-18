import { LoginForm } from "@/features/auth/components/login-form";
import { Section } from "@/components/ui/section";

export const metadata = {
  title: "Iniciar sesion"
};

type LoginPageProps = {
  searchParams: Promise<{ redirectTo?: string; reason?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const description =
    params.reason === "inactive"
      ? "Tu cuenta no esta activa. Contacta a AVM para revisar el acceso."
      : "Accede con Supabase Auth. Tu sesion queda persistida de forma segura.";

  return (
    <Section eyebrow="Cuenta" title="Iniciar sesion" description={description}>
      <LoginForm redirectTo={params.redirectTo ?? "/panel"} />
    </Section>
  );
}
