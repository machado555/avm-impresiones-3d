import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/constants/site";

export function WhatsAppButton() {
  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=Hola%20AVM%2C%20quiero%20consultar%20por%20impresiones%203D`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-emerald-300 to-cyan-400 text-slate-950 shadow-[0_0_38px_rgba(56,245,255,0.35)] transition hover:scale-105"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={25} />
    </a>
  );
}
