import type { ReactNode } from "react";
import { ToastContainer } from "@/components/ui/toast";

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
