"use client";

import { useEffect } from "react";
import { setAuthState } from "@/lib/stores/auth-store";
import { isAuthenticated } from "@/lib/security/auth";
import type { AuthUser } from "@/types/auth";

type AuthStoreSyncProps = {
  user: AuthUser | null;
};

export function AuthStoreSync({ user }: AuthStoreSyncProps) {
  useEffect(() => {
    setAuthState({
      user,
      role: user?.role ?? "guest",
      isAuthenticated: isAuthenticated(user),
      isLoading: false
    });
  }, [user]);

  return null;
}
