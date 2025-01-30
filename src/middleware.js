import { NextResponse } from "next/server";

// Middleware function
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isAuth = request.cookies.get("auth")?.value; // Get the auth cookie

  // If the user is authenticated and tries to access /login or /signup, redirect to home
  if (isAuth && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the user is not authenticated and tries to access protected routes, redirect to /login
  if (!isAuth && pathname !== "/login" && pathname !== "/signup") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If none of the above conditions match, allow the request to continue
  return NextResponse.next();
}

// Config to match specific routes
export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard"], // Match these routes for middleware
};
