import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

// Public GET — only published works
export async function GET() {
  try {
    const works = await prisma.work.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { year: "desc" }],
    });
    return NextResponse.json(works);
  } catch (error) {
    console.error("Failed to fetch works:", error);
    return NextResponse.json(
      { error: "Failed to fetch works" },
      { status: 500 }
    );
  }
}

// Admin-only POST
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const work = await prisma.work.create({
      data: {
        title: body.title,
        slug: body.slug,
        category: body.category,
        description: body.description,
        content: body.content || null,
        coverImage: body.coverImage,
        images: body.images || [],
        techStack: body.techStack || [],
        liveUrl: body.liveUrl || null,
        year: body.year,
        sortOrder: body.sortOrder || 0,
        published: body.published ?? true,
      },
    });
    return NextResponse.json(work, { status: 201 });
  } catch (error) {
    console.error("Failed to create work:", error);
    return NextResponse.json(
      { error: "Failed to create work" },
      { status: 500 }
    );
  }
}
