import { CustomRequestForm } from "@/components/forms/custom-request-form";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { getCurrentProfile } from "@/features/auth/data/get-current-profile";

export const metadata = {
  title: "Solicitar diseno personalizado",
  description: "Formulario para cotizar disenos e impresiones 3D personalizadas."
};

type CustomRequestPageProps = {
  searchParams: Promise<{ requestNumber?: string }>;
};

export default async function CustomRequestPage({ searchParams }: CustomRequestPageProps) {
  const [params, user] = await Promise.all([searchParams, getCurrentProfile()]);

  return (
    <Section
      eyebrow="Cotizacion"
      title="Solicita tu diseno personalizado"
      description="Completa el brief inicial y adjunta archivos STL, OBJ, 3MF, imagenes o ZIP para cotizar."
    >
      {params.requestNumber && (
        <GlassCard className="mb-6 border-cyan-300/35">
          <p className="font-semibold text-white">Solicitud recibida</p>
          <p className="mt-2 text-sm text-slate-300">Tu numero de seguimiento es {params.requestNumber}. Guardalo para futuras consultas.</p>
        </GlassCard>
      )}
      <CustomRequestForm contactName={user?.fullName} contactEmail={user?.email} contactPhone={user?.phone} />
    </Section>
  );
}
