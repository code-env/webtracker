import { NextResponse } from "next/server";
import { AUTH_ROUTES, PUBLIC_ROUTES, DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { auth } from "./auth";

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

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
  }

  if (!isAuthenticated && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
