import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000/api";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  console.log("PROXY:", {
    path,
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
  });

  // Protected routes
  if (path.startsWith("/dashboard")) {
    // No tokens at all → login
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    // Refresh token exists but access token is missing
    if (!accessToken && refreshToken) {
      try {
        const response = await fetch(
          `${BACKEND_URL}/auth/renew-token`,
          {
            method: "POST",
            headers: {
              Cookie: `refreshToken=${refreshToken.value}`,
            },
          }
        );

        if (!response.ok) {
          return NextResponse.redirect(
            new URL("/login", request.url)
          );
        }

        const setCookie = response.headers.get("set-cookie");

        const nextResponse = NextResponse.next();

        if (setCookie) {
          nextResponse.headers.append(
            "set-cookie",
            setCookie
          );
        }

        return nextResponse;
      } catch (error) {
        console.error("Token refresh failed:", error);

        return NextResponse.redirect(
          new URL("/login", request.url)
        );
      }
    }
  }

  // Already authenticated → don't allow login/signup
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