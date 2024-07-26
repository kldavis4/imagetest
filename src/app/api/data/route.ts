import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ message: "here's your data" });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 401 });
  }
}
