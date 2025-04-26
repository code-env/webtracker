import { DEFAULT_LOGIN_REDIRECT, PUBLIC_ROUTES, AUTH_ROUTES } from "@/routes";
import { NextResponse } from "next/server";
import { auth } from "@/auth";


export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;

  if (
    nextUrl.pathname === "/api/track" ||
    nextUrl.pathname === "/tracking-script.js"
  ) {
    return NextResponse.next();
  }


  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  if (
    nextUrl.pathname.startsWith("/api") ||
    PUBLIC_ROUTES.includes(nextUrl.pathname)
  ) {
    return NextResponse.next(); // Allow the request to proceed
  }

  console.log("isAuthRoute", nextUrl.pathname.startsWith("/dashboard"));

  if (isAuthRoute && isAuthenticated)
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));

  if (!isAuthenticated && !isAuthRoute && nextUrl.pathname.startsWith('/dashboard'))
    return NextResponse.redirect(new URL("/auth", nextUrl));
});

export const config = {
  matcher: [
    "/((?!_next|static|favicon.ico|api|tracking-script.js).*)",
    "/api/:path*",
    "/dashboard/:path*",
  ],
};