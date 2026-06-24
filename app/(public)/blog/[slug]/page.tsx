import { notFound } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const supabase = await createSupabaseServerClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title,excerpt,content,cover_image,created_at,blog_categories(name)")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) {
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

  return (
    <Section eyebrow="Blog" title={post.title} description={post.excerpt ?? ""}>
      <GlassCard className="mx-auto max-w-3xl">
        {post.cover_image && (
          <img src={post.cover_image} alt={post.title} className="mb-6 w-full rounded-[8px] object-cover" />
        )}
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-cyan-300">
          <span>{post.blog_categories?.name ?? "Blog"}</span>
          <span>{new Date(post.created_at).toLocaleDateString("es-AR")}</span>
        </div>
        <div className="mt-6 text-sm leading-7 text-slate-300">
          {post.content?.split("\n").map((line: string, i: number) => (
            <p key={i} className="mb-4">{line}</p>
          )) ?? <p>Contenido no disponible.</p>}
        </div>
      </GlassCard>
    </Section>
  );
}
