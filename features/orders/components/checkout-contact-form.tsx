type CheckoutContactFormProps = {
  fullName?: string | null;
  email?: string | null;
  phone?: string | null;
};

const inputClass = "rounded-[8px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none";

export function CheckoutContactForm({ fullName, email, phone }: CheckoutContactFormProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <input className={inputClass} name="fullName" placeholder="Nombre completo" defaultValue={fullName ?? ""} required />
      <input className={inputClass} name="email" placeholder="Email" type="email" defaultValue={email ?? ""} required />
      <input className={inputClass} name="phone" placeholder="Telefono" defaultValue={phone ?? ""} />
    </div>
  );
}
