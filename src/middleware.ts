import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const pathname = req.nextUrl.pathname;

  const protectedRoutes = ["/admin", "/checkout", "/orders"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Cegah akses halaman login/register jika sudah login
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect user tidak login dari protected route
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/login",
    "/register",
  ],
};
