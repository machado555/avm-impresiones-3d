type AdminSectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function AdminSectionHeader({ eyebrow = "Admin", title, description }: AdminSectionHeaderProps) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">{eyebrow}</p>
      <h1 className="text-3xl font-semibold text-white">{title}</h1>
      {description && <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{description}</p>}
    </div>
  );
}
