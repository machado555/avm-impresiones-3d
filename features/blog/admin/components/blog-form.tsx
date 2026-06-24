"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CustomSelect } from "@/components/ui/custom-select";
import { addToast } from "@/lib/stores/toast-store";
import { createBlogPost, updateBlogPost } from "@/features/blog/admin/actions/blog-posts";
import type { BlogPostDetail } from "@/features/blog/admin/data/get-admin-blog-post-by-id";

type BlogFormProps = {
  post?: BlogPostDetail | null;
  categories: Array<{ id: string; name: string; slug: string }>;
};

const statusOptions = [
  { value: "draft", label: "Borrador" },
  { value: "published", label: "Publicado" },
  { value: "archived", label: "Archivado" }
];

export function BlogForm({ post, categories }: BlogFormProps) {
  const isEdit = Boolean(post);
  const action = isEdit
    ? async (prev: { ok: boolean; message: string }) => {
        const form = document.getElementById("blog-form") as HTMLFormElement;
        return updateBlogPost(post!.id, prev, new FormData(form));
      }
    : createBlogPost;

  const [state, formAction, isPending] = useActionState(action, { ok: false, message: "" });

  useEffect(() => {
    if (state.message) addToast(state.ok ? "success" : "error", state.message);
  }, [state]);

  const inputClass = "rounded-[8px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60";

  return (
    <form id="blog-form" action={formAction} className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <input className={inputClass} name="title" placeholder="Titulo del articulo" defaultValue={post?.title ?? ""} required />
        <input className={inputClass} name="slug" placeholder="slug-del-articulo" defaultValue={post?.slug ?? ""} required />
      </div>
      <input className={inputClass} name="excerpt" placeholder="Resumen breve" defaultValue={post?.excerpt ?? ""} />
      <textarea className={`${inputClass} min-h-40 resize-y`} name="content" placeholder="Contenido del articulo en HTML o markdown" defaultValue={post?.content ?? ""} />
      <input className={inputClass} name="coverImage" placeholder="URL de imagen destacada" defaultValue={post?.coverImage ?? ""} />
      <div className="grid gap-4 md:grid-cols-2">
        <input className={inputClass} name="seoTitle" placeholder="SEO title (opcional)" defaultValue={post?.seoTitle ?? ""} />
        <input className={inputClass} name="seoDescription" placeholder="SEO description (opcional)" defaultValue={post?.seoDescription ?? ""} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <select name="categoryId" defaultValue={post?.categoryId ?? ""} className={inputClass}>
          <option value="">Sin categoria</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <select name="status" defaultValue={post?.status ?? "draft"} className={inputClass}>
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Guardando..." : post ? "Actualizar articulo" : "Crear articulo"}
      </Button>
    </form>
  );
}
