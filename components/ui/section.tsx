import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type SectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
};

export function Section({ eyebrow, title, description, children, className }: SectionProps) {
  return (
    <section className={cn("mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8", className)}>
      {(eyebrow || title || description) && (
        <div className="mb-10 max-w-3xl">
          {eyebrow && <span className="avm-eyebrow mb-4">{eyebrow}</span>}
          {title && <h2 className="text-[clamp(28px,3.5vw,44px)] font-semibold leading-[1.08] tracking-tight text-white">{title}</h2>}
          {description && <p className="mt-4 text-base leading-7 text-[var(--avm-muted)] max-w-[580px]">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
