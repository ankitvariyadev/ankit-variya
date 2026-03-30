import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const publicRoutes = ["/admin/login", "/api/auth"];
const protectedRoutes = ["/admin", "/api/admin"];
const adminRoutes = ["/admin/users", "/admin/settings"]; // Future: add if needed

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow public routes without authentication
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      const url = new URL("/admin/login", request.url);
      return NextResponse.redirect(url);
    }

    // Additional role checks can be added here if needed
    const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

    if (isAdminRoute && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
