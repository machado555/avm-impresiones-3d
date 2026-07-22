"use client";

import { useState, useRef } from "react";
import { Upload, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { addToast } from "@/lib/stores/toast-store";
import { uploadCmsImage } from "@/features/cms/admin/data/get-cms-data";
import { saveCmsText, deleteCmsImage } from "@/features/cms/admin/actions/save-cms";
import type { CmsImage, CmsText } from "@/features/cms/admin/data/get-cms-data";

type CmsManagerProps = {
  images: CmsImage[];
  texts: CmsText[];
};

const imageSections = [
  { section: "home", label: "Home", keys: [
    { key: "hero_main", label: "Hero principal" },
    { key: "hero_banner", label: "Banner principal" },
    { key: "featured_1", label: "Imagen destacada 1" },
    { key: "featured_2", label: "Imagen destacada 2" },
    { key: "promo_1", label: "Imagen promocional" }
  ]},
  { section: "global", label: "Global", keys: [
    { key: "logo", label: "Logo del sitio" },
    { key: "favicon", label: "Favicon" },
    { key: "footer_logo", label: "Logo del footer" }
  ]},
  { section: "categories", label: "Categorias", keys: [
    { key: "default", label: "Imagen por defecto" }
  ]},
  { section: "blog", label: "Blog", keys: [
    { key: "cover_default", label: "Portada por defecto" },
    { key: "banner", label: "Banner del blog" }
  ]}
];

const textSections = [
  { section: "home", label: "Home", keys: [
    { key: "hero_title", label: "Titulo hero" },
    { key: "hero_subtitle", label: "Subtitulo hero" },
    { key: "hero_cta", label: "Texto boton hero" },
    { key: "promo_title", label: "Titulo promocional" },
    { key: "promo_text", label: "Texto promocional" }
  ]},
  { section: "footer", label: "Footer", keys: [
    { key: "contact_info", label: "Informacion de contacto" },
    { key: "copyright", label: "Copyright" }
  ]}
];

function ImageUploader({ section, imgKey, current }: { section: string; imgKey: string; current?: CmsImage }) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("section", section);
    fd.append("key", imgKey);
    const result = await uploadCmsImage(fd);
    addToast(result.ok ? "success" : "error", result.message);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="rounded-[8px] border border-white/10 bg-black/10 p-3">
      <p className="mb-2 text-xs font-medium text-slate-300">{imgKey}</p>
      {current && (
        <img src={current.url} alt={current.alt ?? ""} className="mb-2 h-20 w-full rounded-[4px] object-cover" />
      )}
      <div className="flex gap-2">
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        <Button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="flex-1 text-xs">
          <Upload size={14} />
          {uploading ? "..." : current ? "Cambiar" : "Subir"}
        </Button>
        {current && (
          <Button type="button" onClick={async () => {
            const r = await deleteCmsImage(current.id);
            addToast(r.ok ? "success" : "error", r.message);
          }} variant="danger">
            <Trash2 size={14} />
          </Button>
        )}
      </div>
    </div>
  );
}

function TextEditor({ section, textKey, current }: { section: string; textKey: string; current?: CmsText }) {
  const [value, setValue] = useState(current?.value ?? "");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    const result = await saveCmsText(section, textKey, value);
    addToast(result.ok ? "success" : "error", result.message);
    setSaving(false);
  }

  return (
    <div className="rounded-[8px] border border-white/10 bg-black/10 p-3">
      <p className="mb-2 text-xs font-medium text-slate-300">{textKey}</p>
      <input
        className="mb-2 w-full rounded-[6px] border border-white/10 bg-white/[0.07] px-3 py-2 text-sm text-white outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="button" onClick={handleSave} disabled={saving} className="w-full text-xs">
        <Save size={14} />
        {saving ? "Guardando..." : "Guardar"}
      </Button>
    </div>
  );
}

export function CmsManager({ images, texts }: CmsManagerProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <GlassCard>
        <h2 className="mb-4 text-lg font-semibold text-white">Imagenes globales</h2>
        <div className="grid gap-4">
          {imageSections.map((section) => (
            <div key={section.section}>
              <p className="mb-2 text-sm font-medium text-cyan-200">{section.label}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {section.keys.map((k) => (
                  <ImageUploader
                    key={`${section.section}-${k.key}`}
                    section={section.section}
                    imgKey={k.key}
                    current={images.find((i) => i.section === section.section && i.key === k.key)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <h2 className="mb-4 text-lg font-semibold text-white">Textos editables</h2>
        <div className="grid gap-4">
          {textSections.map((section) => (
            <div key={section.section}>
              <p className="mb-2 text-sm font-medium text-cyan-200">{section.label}</p>
              <div className="grid gap-3">
                {section.keys.map((k) => (
                  <TextEditor
                    key={`${section.section}-${k.key}`}
                    section={section.section}
                    textKey={k.key}
                    current={texts.find((t) => t.section === section.section && t.key === k.key)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

