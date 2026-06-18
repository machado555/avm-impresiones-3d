import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function GlassCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("glass rounded-[8px] p-5", className)} {...props} />;
}
