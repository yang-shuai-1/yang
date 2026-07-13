import { NextRequest, NextResponse } from "next/server";
import { loginUser, setUserCookie } from "@/lib/user-auth";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function POST(request: NextRequest) {
  const { identifier, password, captcha, captchaAnswer } = await request.json();

  if (!captcha || captcha.toLowerCase() !== captchaAnswer?.toLowerCase()) {
    return NextResponse.json({ error: "验证码错误" }, { status: 400 });
  }

  if (!identifier || !password) {
    return NextResponse.json({ error: "请填写所有字段" }, { status: 400 });
  }

  // Admin shortcut: uses admin password, sets user cookie
  if (identifier === "admin" && password === ADMIN_PASSWORD) {
    await setUserCookie("admin");
    return NextResponse.json({ ok: true, user: { id: "admin", username: "admin", email: "", role: "admin" } });
  }

  // Normal user login via database
  const result = await loginUser(identifier, password);
  if ("error" in result) {
    return NextResponse.json(result, { status: 401 });
  }

  return NextResponse.json({ ok: true, user: result.user });
}
