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
    <section className={cn("mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8", className)}>
      {(eyebrow || title || description) && (
        <div className="mb-9 max-w-3xl">
          {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">{eyebrow}</p>}
          {title && <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>}
          {description && <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
