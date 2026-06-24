import { createStore } from "@/lib/stores/store";

export type ToastType = "success" | "error" | "warning";

export type Toast = {
  id: string;
  type: ToastType;
  message: string;
};

type ToastState = {
  toasts: Toast[];
};

export const toastStore = createStore<ToastState>({ toasts: [] });

export function addToast(type: ToastType, message: string) {
  const id = Math.random().toString(36).slice(2);
  toastStore.setState((state) => ({ toasts: [...state.toasts, { id, type, message }] }));
  setTimeout(() => removeToast(id), 4000);
}

export function removeToast(id: string) {
  toastStore.setState((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
}
