import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  console.log("PROXY:", {
    path,
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
  }); 

  if (
    path === "/dashboard" &&
    !accessToken &&
    !refreshToken
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  if (
    (path === "/login" || path === "/signup") &&
    accessToken
  ) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/signup",
  ],
};