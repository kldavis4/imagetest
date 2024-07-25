import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const fetchCache = "force-no-store";

const knownPaths: { [key: string]: string } = {
  "/pages/homepage": "/",
  robots: "/robots.txt",
};

const getRevalidationPath = (slug?: string | null) => {
  if (!slug) {
    throw new Error("Invalid slug");
  }
  if (knownPaths[slug]) {
    return knownPaths[slug];
  }

  return slug;
};

export async function GET(request: NextRequest) {
  try {
    if (
      request.nextUrl.searchParams.get("secret") !==
      process.env.WP_PREVIEW_SECRET
    ) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const slug = request.nextUrl.searchParams.get("slug");
    const path = getRevalidationPath(slug);
    revalidatePath(path);
    const url = request.nextUrl.clone();
    url.pathname = path;
    url.searchParams.delete("slug");
    url.searchParams.delete("secret");
    return NextResponse.redirect(url, {
      status: 307,
    });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 401 });
  }
}
