import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_ROUTE, PRIVATE_ROUTE } from "./common/routers";
import { ACCESS_TOKEN, SESSION } from "./common/contants/auth.constant";

export function middleware(request: NextRequest) {
  let response = NextResponse.next();
  const session = request.cookies.get(ACCESS_TOKEN);

  if (
    !session &&
    request.nextUrl.pathname !== PUBLIC_ROUTE.LOGIN &&
    !request.nextUrl.pathname.startsWith(
      process.env.NEXT_PUBLIC_DEFAULT_CUSTOM_API_PREFIX
    )
  ) {
    const url = request.nextUrl.clone();
    url.pathname = PUBLIC_ROUTE.LOGIN;
    return NextResponse.redirect(url, 302);
  }

  if (session) {
    response.cookies.set(SESSION, session.value, {
      path: "/",
      // secure: process.env.NODE_ENV === "production",
    });
  }

  if (request.nextUrl.pathname === "/dashboard") {
    const url = request.nextUrl.clone();
    url.pathname = PRIVATE_ROUTE.HOME;
    return NextResponse.rewrite(url);
  }
  return response;
}

export const config = { matcher: "/((?!.*\\.).*)" };
