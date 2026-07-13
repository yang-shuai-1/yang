import { NextResponse } from "next/server";
import { getUserFromCookie } from "@/lib/user-auth";

export async function GET() {
  const user = await getUserFromCookie();
  if (!user) {
    return NextResponse.json(null);
  }
  return NextResponse.json(user);
}
