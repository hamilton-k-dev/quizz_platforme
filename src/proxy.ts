import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const PUBLIC_ROUTES = ["/", "/login", "/register", "/reset-password"];
const AUTH_ROUTES = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await auth.api.getSession({ headers: await headers() });
  const isAuthenticated = !!session;

  const matchesRoute = (routes: string[]) =>
    routes.some((r) => pathname === r || pathname.startsWith(r + "/"));

  if (isAuthenticated && matchesRoute(AUTH_ROUTES)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isAuthenticated && !matchesRoute(PUBLIC_ROUTES)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
