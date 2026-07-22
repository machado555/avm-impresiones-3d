import { ButtonLink } from "@/components/ui/button";

export default function ConfirmacionPedidoPage() {
  return (
    <main className="confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-icon">âœ“</div>

        <div className="avm-eyebrow mb-4 justify-center">
          Pedido recibido
        </div>

        <h1 className="mb-4 text-[32px] font-bold text-white">
          Tu pedido fue cargado con exito.
        </h1>

        <p className="mb-10 text-[15px] leading-7 text-[var(--avm-muted)]">
          Revisamos tu solicitud y te contactamos en menos de 24 horas. Podes
          consultar el estado de tu pedido desde tu panel de cuenta.
        </p>

        <div className="confirmation-actions">
          <ButtonLink href="/panel">Ver mis pedidos</ButtonLink>
          <ButtonLink href="/" variant="outline">Volver al inicio</ButtonLink>
        </div>
      </div>
    </main>
  );
}
