import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken");

  const path = request.nextUrl.pathname;

  if (token) {
    if (path === "/login" || path === "/register") {
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }
  }

  if (!token) {
    if (path === "/dashboard") {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard"],
};