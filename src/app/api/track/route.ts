import { NextRequest, NextResponse } from "next/server";
import { getUserFromCookie, trackPageView } from "@/lib/user-auth";

export async function POST(request: NextRequest) {
  const user = await getUserFromCookie();
  if (!user) return NextResponse.json({ ok: false });

  const { path } = await request.json();
  await trackPageView(user.id, path);
  return NextResponse.json({ ok: true });
}
