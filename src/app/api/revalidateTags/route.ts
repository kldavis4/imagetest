import { revalidateTag } from "next/cache";
import type { NextRequest  } from "next/server";
import { NextResponse } from "next/server";


async function handleRevalidate(request: NextRequest) {
  try {
    const tags = request.nextUrl.searchParams.getAll("tag");
    const sleep = request.nextUrl.searchParams.get("sleep");

    // console.log("Before revalidate: ", tags)
    // revalidateTag(tags.join(","));
    // console.log("After revalidate")
    tags.filter((tag) => tag)
      .forEach((tag) => {
        console.info('Revalidating tag:', tag)
        revalidateTag(tag)
      })

    if (sleep) {
      await new Promise((resolve) => setTimeout(resolve, parseInt(sleep, 10)));
    }

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
