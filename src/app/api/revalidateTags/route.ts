import { revalidateTag } from "next/cache";
import type { NextRequest  } from "next/server";
import { NextResponse } from "next/server";


async function handleRevalidate(request: NextRequest) {
  try {
    const tags = request.nextUrl.searchParams.getAll("tag");

    // console.log("Before revalidate: ", tags)
    // revalidateTag(tags.join(","));
    // console.log("After revalidate")
    tags.filter((tag) => tag)
      .forEach((tag) => {
        console.info('Revalidating tag:', tag)
        revalidateTag(tag)
      })

    // return NextResponse.json({ message: "Revalidation started" });
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return new Response(null, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  console.info('POST request')
  return handleRevalidate(request);
}

export async function GET(request: NextRequest) {
  console.info('GET request')
  return handleRevalidate(request);
}
