import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cacheGet, cacheSet } from './cache';

export async function middleware(req: NextRequest) {
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

  const cacheKey = req.nextUrl.toString()
  const cachedResponse = await cacheGet(cacheKey)
  console.log({cachedResponse})
  if (!cachedResponse) {
    await cacheSet(cacheKey, 'Hello World')
  }

  return NextResponse.next()
}
export const config: {
  matcher: string | string[];
  runtime?: 'nodejs' | 'edge';
} = {
  // Matches any request
  matcher: ['*'],
  runtime: 'nodejs',
}
