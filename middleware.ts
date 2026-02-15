import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value
  const { pathname } = request.nextUrl

  const isDashboardRoute = pathname === "/dashboard" || pathname.startsWith("/dashboard/")
  const isAuthRoute =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/verify-email" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password"

  // If accessing dashboard without token → redirect to login
  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If accessing auth page while logged in → redirect to dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/verify-email",
    "/forgot-password",
    "/reset-password",
  ],
}
