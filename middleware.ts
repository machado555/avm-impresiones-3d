import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseMiddlewareClient } from "@/lib/supabase/middleware";
import { can } from "@/lib/security/roles";
import { routeCapabilities } from "@/lib/constants/routes";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const protectedPrefixes = ["/cuenta", "/panel", "/pedidos", "/puntos", "/favoritos", "/solicitudes", "/perfil", "/admin"];
  const isProtectedRoute = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const { supabase, response } = createSupabaseMiddlewareClient(request);

  if (!supabase) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("reason", "config");
    return NextResponse.redirect(loginUrl);
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role,status,is_active")
    .eq("id", user.id)
    .single();

  if (!profile || profile.status !== "active" || !profile.is_active) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("reason", "inactive");
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin")) {
    const matchedRoute = Object.keys(routeCapabilities)
      .sort((a, b) => b.length - a.length)
      .find((route) => pathname.startsWith(route));
    const requiredCapabilities = matchedRoute ? routeCapabilities[matchedRoute] : ["admin:access"];
    const hasAccess = requiredCapabilities.some((permission) => can(profile.role, permission));

    if (!hasAccess) {
      const deniedUrl = request.nextUrl.clone();
      deniedUrl.pathname = "/no-autorizado";
      deniedUrl.search = "";
      return NextResponse.redirect(deniedUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/panel/:path*",
    "/cuenta/:path*",
    "/pedidos/:path*",
    "/puntos/:path*",
    "/favoritos/:path*",
    "/solicitudes/:path*",
    "/perfil/:path*",
    "/admin/:path*"
  ]
};
