import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { uploadToCOS } from "@/lib/cos";

export async function POST(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { base64, filename, folder = "uploads" } = await request.json();

    if (!base64 || !filename) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // COS 未配置时回退：直接返回 Base64（存到 markdown 文件里）
    if (!process.env.COS_SECRET_ID) {
      return NextResponse.json({ url: base64, fallback: true });
    }

    const url = await uploadToCOS(base64, folder, filename);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
