import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value
  const url = request.nextUrl.clone()

  // Protect Routes
  const protectedPaths = ["/dashboard", "/courses", "/tutor", "/admin", "/faculty", "/profile", "/settings"]
  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  if (isProtectedPath && !token) {
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  // Auth Page Redirection (e.g., if already logged in, skip login page)
  const authPaths = ["/login", "/signup"]
  const isAuthPath = authPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  if (isAuthPath && token) {
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
