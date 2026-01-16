import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';

  if (path === '/' && token) {
    return NextResponse.next();
  }

  return NextResponse.next();
}
