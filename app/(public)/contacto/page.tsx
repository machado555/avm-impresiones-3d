import { Mail, MapPin, MessageCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";

export const metadata = {
  title: "Contacto",
  description: "Contacta a AVM-Impresiones 3D."
};

export default function ContactPage() {
  const contactCards = [
    { title: "WhatsApp", description: "Respuesta rapida para cotizaciones.", Icon: MessageCircle },
    { title: "Email", description: "Consultas, presupuestos y pedidos.", Icon: Mail },
    { title: "Zona", description: "Atencion local con envio coordinado.", Icon: MapPin }
  ];

  return (
    <Section eyebrow="Contacto" title="Hablemos de tu proximo proyecto" description="Pagina preparada para consultas comerciales, soporte y derivacion a WhatsApp.">
      <div className="grid gap-4 md:grid-cols-3">
        {contactCards.map(({ title, description, Icon }) => (
          <GlassCard key={title}>
            <Icon className="text-cyan-200" size={25} />
            <h2 className="mt-5 text-xl font-semibold text-white">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
