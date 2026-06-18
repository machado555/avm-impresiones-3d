import Image from "next/image";
import type { ProductImage } from "@/types/products";

type ProductGalleryProps = {
  images: ProductImage[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [primaryImage, ...secondaryImages] = images;

  return (
    <div className="grid gap-3">
      <div className="glass relative aspect-square overflow-hidden rounded-[8px]">
        {primaryImage ? (
          <Image src={primaryImage.url} alt={primaryImage.alt ?? productName} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" priority />
        ) : (
          <div className="grid h-full place-items-center bg-gradient-to-br from-cyan-300/15 to-violet-400/15 text-sm text-slate-400">Sin imagen</div>
        )}
      </div>
      {secondaryImages.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {secondaryImages.slice(0, 4).map((image) => (
            <div key={image.id} className="relative aspect-square overflow-hidden rounded-[8px] border border-white/10">
              <Image src={image.url} alt={image.alt ?? productName} fill className="object-cover" sizes="120px" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
