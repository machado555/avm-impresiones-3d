import type { AuthUser } from "@/types/auth";
import { canAccessAnyCapability, isAuthenticated } from "@/lib/security/auth";
import { routeCapabilities } from "@/lib/constants/routes";

export function canAccessRoute(user: AuthUser | null, pathname: string) {
  if (pathname.startsWith("/admin")) {
    const matchedRoute = Object.keys(routeCapabilities)
      .sort((a, b) => b.length - a.length)
      .find((route) => pathname.startsWith(route));

    if (!matchedRoute) {
      return false;
    }

    return canAccessAnyCapability(user, routeCapabilities[matchedRoute]);
  }

  if (pathname.startsWith("/panel") || pathname.startsWith("/cuenta")) {
    return isAuthenticated(user);
  }

  return true;
}
