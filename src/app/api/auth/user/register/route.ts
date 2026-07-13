import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/lib/user-auth";

export async function POST(request: NextRequest) {
  const { username, email, password, captcha, captchaAnswer } = await request.json();

  // Verify captcha
  if (!captcha || captcha.toLowerCase() !== captchaAnswer?.toLowerCase()) {
    return NextResponse.json({ error: "验证码错误" }, { status: 400 });
  }

  if (!username || !email || !password) {
    return NextResponse.json({ error: "请填写所有字段" }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "密码至少6位" }, { status: 400 });
  }

  const result = await registerUser(username, email, password);
  if ("error" in result) {
    return NextResponse.json(result, { status: 400 });
  }

  return NextResponse.json({ ok: true, user: result.user });
}
