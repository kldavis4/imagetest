import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // Check if the request is for a static asset in the public folder
  const { pathname } = req.nextUrl
  console.log(pathname)
  if (pathname.startsWith('/js')) {
    const response = NextResponse.next()
    // Add or modify headers
    response.headers.set('ETag', 'CustomETagValue')
    response.headers.set('X-Custom-Header', 'CustomHeaderValue')
    return response
  }

  return NextResponse.next()
}