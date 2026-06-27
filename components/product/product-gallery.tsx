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
      <div className="avm-card relative aspect-square overflow-hidden p-0">
        {primaryImage ? (
          <Image src={primaryImage.url} alt={primaryImage.alt ?? productName} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" priority />
        ) : (
          <div className="grid h-full place-items-center text-sm text-[var(--avm-muted)]">Sin imagen</div>
        )}
      </div>
      {secondaryImages.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {secondaryImages.slice(0, 4).map((image) => (
            <div key={image.id} className="avm-card relative aspect-square overflow-hidden p-0">
              <Image src={image.url} alt={image.alt ?? productName} fill className="object-cover" sizes="120px" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
