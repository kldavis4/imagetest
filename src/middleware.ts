import { cacheGet, cacheSet } from './cache';
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/middleware") {
    return demo(request);
  }
}

async function demo(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key") || "not-set";
  const before = Date.now();
  const fromCache = await cacheGet(key);
  if (fromCache) {
    return NextResponse.json({
      cached: true,
      readDuration: Date.now() - before,
      key,
      value: fromCache,
    });
  }
  const value = new Date().toString();
  const beforeWrite = Date.now();
  await cacheSet(key, value);
  return NextResponse.json({
    cached: false,
    readDuration: beforeWrite - before,
    writeDuration: Date.now() - beforeWrite,
    key,
    value,
  });
}

export const config = {
  matcher: ["/middleware"],
};
