import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export function GlassCard({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("avm-card", className)} {...props} />;
}
