"use client";

import { CheckCircle, X, AlertTriangle, AlertCircle } from "lucide-react";
import { toastStore, removeToast } from "@/lib/stores/toast-store";
import { useStore } from "@/lib/stores/use-store";
import type { ToastType } from "@/lib/stores/toast-store";

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={18} />,
  error: <AlertCircle size={18} />,
  warning: <AlertTriangle size={18} />
};

const styles: Record<ToastType, string> = {
  success: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  error: "border-red-400/30 bg-red-400/10 text-red-200",
  warning: "border-amber-400/30 bg-amber-400/10 text-amber-200"
};

function ToastItem({ id, type, message }: { id: string; type: ToastType; message: string }) {
  return (
    <div className={`flex items-start gap-3 rounded-[8px] border px-4 py-3 text-sm shadow-lg backdrop-blur-xl ${styles[type]}`}>
      <span className="mt-0.5 shrink-0">{icons[type]}</span>
      <p className="flex-1 leading-5">{message}</p>
      <button type="button" onClick={() => removeToast(id)} className="shrink-0 opacity-60 hover:opacity-100">
        <X size={16} />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const toasts = useStore(toastStore, (state) => state.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto animate-in slide-in-from-right-2 fade-in duration-200">
          <ToastItem id={toast.id} type={toast.type} message={toast.message} />
        </div>
      ))}
    </div>
  );
}
