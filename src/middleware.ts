import { NextResponse, type NextRequest } from "next/server";

import { getSupabaseReqResClient } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = getSupabaseReqResClient(request);
  const { data } = await supabase.auth.getSession();
  const sessionUser = data?.session?.user;

  const searchParams = request.nextUrl.searchParams;
  const redirect = searchParams.get("redirect");
  const requestedPath = request.nextUrl.pathname;

  if (requestedPath === "/") {
    if (!sessionUser) {
      return NextResponse.redirect(new URL("/about", request.url));
    }
  }

  if (requestedPath === "/login") {
    if (sessionUser) {
      if (!redirect) {
        return NextResponse.redirect(new URL("/my", request.url));
      }
      return NextResponse.redirect(new URL(redirect, request.url));
    }
  }
  else if (requestedPath === "/logout") {
    if (!sessionUser) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response.value;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
