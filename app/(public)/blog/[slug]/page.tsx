import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const title = slug.replaceAll("-", " ");

  return (
    <Section eyebrow="Blog" title={title} description="Plantilla SEO para articulo con metadata, lectura relacionada, schema y AdSense.">
      <GlassCard className="mx-auto max-w-3xl">
        <p className="text-sm leading-7 text-slate-300">
          Contenido preparado para publicacion. En la fase de blog se conectara a Supabase, se agregaran slugs reales,
          categorias, autor, fecha, Open Graph dinamico y bloques de anuncio controlados.
        </p>
      </GlassCard>
    </Section>
  );
}
