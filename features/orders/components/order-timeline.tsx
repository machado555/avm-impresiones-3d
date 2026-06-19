import type { OrderEvent } from "@/types/orders";

type OrderTimelineProps = {
  events: OrderEvent[];
};

export function OrderTimeline({ events }: OrderTimelineProps) {
  if (events.length === 0) {
    return <p className="text-sm text-slate-400">Aun no hay eventos para este pedido.</p>;
  }

  return (
    <div className="grid gap-3">
      {events.map((event) => (
        <div key={event.id} className="rounded-[8px] border border-white/10 bg-white/[0.05] p-3">
          <p className="text-sm font-semibold text-white">{event.event.replaceAll("_", " ")}</p>
          <p className="mt-1 text-xs text-slate-500">{new Date(event.createdAt).toLocaleString("es-AR")} · {event.actorType}</p>
        </div>
      ))}
    </div>
  );
}
