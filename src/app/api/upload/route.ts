import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUploadPresignedUrl, generateFileKey } from "@/lib/r2";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { filename, contentType, folder = "uploads" } = await request.json();

    if (!filename || !contentType) {
      return NextResponse.json(
        { error: "Missing filename or contentType" },
        { status: 400 }
      );
    }

    const key = generateFileKey(folder, filename);
    const { presignedUrl, publicUrl } = await getUploadPresignedUrl(
      key,
      contentType
    );

    return NextResponse.json({ presignedUrl, publicUrl, key });
  } catch (error) {
    console.error("Failed to generate upload URL:", error);
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}
