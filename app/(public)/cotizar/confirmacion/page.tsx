import Link from "next/link";

export default function ConfirmacionPedidoPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--avm-bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "480px" }}>
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "rgba(0, 178, 255, 0.12)",
            border: "1px solid rgba(0, 178, 255, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 32px",
            fontSize: "28px",
            color: "var(--avm-blue)",
          }}
        >
          ✓
        </div>

        <div
          style={{
            fontSize: "11px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--avm-blue)",
            marginBottom: "16px",
            fontFamily: "var(--avm-font-display)",
          }}
        >
          Pedido recibido
        </div>

        <h1
          style={{
            fontFamily: "var(--avm-font-display)",
            fontSize: "32px",
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            marginBottom: "16px",
          }}
        >
          Tu pedido fue cargado con éxito.
        </h1>

        <p
          style={{
            color: "var(--avm-muted)",
            fontSize: "15px",
            lineHeight: 1.75,
            marginBottom: "40px",
          }}
        >
          Revisamos tu solicitud y te contactamos en menos de 24 horas. Podés
          consultar el estado de tu pedido desde tu panel de cuenta.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/panel"
            style={{
              background: "var(--avm-blue)",
              color: "var(--avm-bg)",
              fontFamily: "var(--avm-font-display)",
              fontWeight: 600,
              fontSize: "13px",
              letterSpacing: "0.04em",
              padding: "11px 24px",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            Ver mis pedidos
          </Link>
          <Link
            href="/"
            style={{
              background: "transparent",
              color: "var(--avm-white)",
              fontFamily: "var(--avm-font-display)",
              fontWeight: 500,
              fontSize: "13px",
              padding: "11px 24px",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
