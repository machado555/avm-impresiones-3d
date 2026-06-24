import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const title = slug.replaceAll("-", " ");

  return (
    <Section eyebrow="Blog" title={title} description="Articulo sobre impresion 3D, tecnologia y diseño personalizado.">
      <GlassCard className="mx-auto max-w-3xl">
        <p className="text-sm leading-7 text-slate-300">
          Este articulo esta siendo preparado. ¡Volve a visitarnos pronto para leer contenido exclusivo sobre impresion 3D, materiales, tips de diseño y las ultimas novedades en fabricacion digital!
        </p>
      </GlassCard>
    </Section>
  );
}
