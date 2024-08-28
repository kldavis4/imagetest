import { revalidateTag } from "next/cache";
import type { NextRequest  } from "next/server";
import { NextResponse } from "next/server";


export async function GET(request: NextRequest) {
  try {
    const tags = request.nextUrl.searchParams.getAll("tag");

    console.log("Before revalidate: ", tags)
    revalidateTag(tags.join(","));
    console.log("After revalidate")
    return NextResponse.json({ message: "Revalidation started" });
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 401 });
  }
}
