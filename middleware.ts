/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
// import jwt from "jsonwebtoken";  -> esta weada no es válida para edge
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET
);

export async function middleware(request: NextRequest) {

  const token = request.cookies.get("token")?.value;

  console.log('[middleware] validation :', token)

  const pathname = request.nextUrl.pathname;

  const publicRoutes = [
    "/login",
    "/register",
    "/backoffice/login",
  ];

  const isPublic = publicRoutes.includes(pathname);

  if (isPublic) {
    return NextResponse.next();
  }

  if (!token && !isPublic) {
    console.log('[middleware] return to login')
    return NextResponse.redirect(
      new URL(pathname.startsWith("/backoffice") ? "/backoffice/login" : "/login", request.url)
    );
  }

  // validamos la session
  try {
    await jwtVerify(
      token || '',
      secret
    );
  } catch (ex: any) {
    console.log(ex.message)
    console.log('[middleware] return to login - jwt not valid')
    return NextResponse.redirect(
      new URL(pathname.startsWith("/backoffice") ? "/backoffice/login" : "/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home",
    "/backoffice/:path*",
    // "/settings/:path*"
  ]
};
