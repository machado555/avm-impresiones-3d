const inputClass = "rounded-[8px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none";

export function CheckoutShippingForm() {
  return (
    <div className="grid gap-4">
      <select className={inputClass} name="deliveryMethod" defaultValue="pickup">
        <option value="pickup">Retiro en persona</option>
        <option value="shipping">Envio a domicilio</option>
      </select>
      <div className="grid gap-4 md:grid-cols-2">
        <input className={inputClass} name="address" placeholder="Direccion" />
        <input className={inputClass} name="city" placeholder="Ciudad" />
        <input className={inputClass} name="province" placeholder="Provincia" />
        <input className={inputClass} name="postalCode" placeholder="Codigo postal" />
      </div>
      <textarea className={`${inputClass} min-h-28 resize-y md:col-span-2`} name="notes" placeholder="Notas para el pedido" />
    </div>
  );
}
