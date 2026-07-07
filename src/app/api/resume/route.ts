import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

// Public GET — resume metadata (not sensitive for a personal site)
export async function GET() {
  try {
    const resume = await prisma.resume.findUnique({
      where: { id: "default" },
      include: {
        versions: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });
    return NextResponse.json(resume || null);
  } catch (error) {
    console.error("Failed to fetch resume:", error);
    return NextResponse.json(
      { error: "Failed to fetch resume" },
      { status: 500 }
    );
  }
}

// Admin-only PUT
export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { filename, path, size, mimeType } = body;

    const resume = await prisma.resume.upsert({
      where: { id: "default" },
      update: { filename, path, size, mimeType },
      create: { id: "default", filename, path, size, mimeType },
    });

    await prisma.resumeVersion.create({
      data: { resumeId: resume.id, filename, path, size, mimeType },
    });

    return NextResponse.json(resume);
  } catch (error) {
    console.error("Failed to update resume:", error);
    return NextResponse.json(
      { error: "Failed to update resume" },
      { status: 500 }
    );
  }
}
