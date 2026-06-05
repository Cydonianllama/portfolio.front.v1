import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const pathname = request.nextUrl.pathname;

  const publicRoutes = [
    "/login",
    "/register",
    "/home"
  ];

  const isPublic = publicRoutes.includes(pathname);

  if (!token && !isPublic) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // validamos la session
  try {
    jwt.verify(
      token || '',
      process.env.JWT_SECRET || ''
    );
  } catch {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home",
    // "/settings/:path*"
  ]
};