import { createStore } from "@/lib/stores/store";
import type { AuthState } from "@/types/auth";

export const authStore = createStore<AuthState>({
  user: null,
  role: "guest",
  isLoading: true,
  isAuthenticated: false
});

export function setAuthState(state: Partial<AuthState>) {
  authStore.setState(state);
}

export function clearAuthState() {
  authStore.setState({
    user: null,
    role: "guest",
    isLoading: false,
    isAuthenticated: false
  });
}
