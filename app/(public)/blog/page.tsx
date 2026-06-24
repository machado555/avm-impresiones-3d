import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { blogPosts } from "@/lib/constants/mock-data";

export const metadata = {
  title: "Blog",
  description: "Guias SEO sobre impresion 3D, electronica y prototipado."
};

export default function BlogPage() {
  return (
    <Section
      eyebrow="Blog"
      title="Descubri el mundo de la impresion 3D"
      description="Guias, consejos y novedades sobre impresion 3D, materiales, diseño y tecnologia."
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-4">
          {blogPosts.map((post) => (
            <GlassCard key={post.title}>
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-cyan-300">
                <span>{post.category}</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-white">{post.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{post.excerpt}</p>
            </GlassCard>
          ))}
        </div>
        <aside className="glass h-fit rounded-[8px] p-5">
          <p className="text-sm font-semibold text-white">Contenido patrocinado</p>
          <div className="mt-4 grid h-64 place-items-center rounded-[8px] border border-dashed border-white/20 text-sm text-slate-500">
            espacio publicitario
          </div>
        </aside>
      </div>
    </Section>
  );
}
