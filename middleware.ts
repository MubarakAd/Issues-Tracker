import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt' // Use this to get the token from cookies

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = await getToken({ req: request }) // Get the token

  // Allow authenticated users to access IssuePage and showIssuePage
  if (pathname.startsWith('/IssuePage') || pathname.startsWith('/showIssuePage')) {
    if (!token) {
      // If the user is not authenticated, redirect to the login page
      return NextResponse.redirect(new URL('/LoginFormPage', request.url))
    }
  }

  // Allow the request to continue if conditions are met
  return NextResponse.next()
}

// Apply this middleware to specific paths
export const config = {
  matcher: ['/IssuePage/:path*', '/showIssuePage/:path*'],
}
