import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

// GET single work — used by admin edit page
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const work = await prisma.work.findUnique({ where: { id } });
    if (!work) {
      return NextResponse.json({ error: "Work not found" }, { status: 404 });
    }
    return NextResponse.json(work);
  } catch (error) {
    console.error("Failed to fetch work:", error);
    return NextResponse.json(
      { error: "Failed to fetch work" },
      { status: 500 }
    );
  }
}

// PUT update work
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const work = await prisma.work.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        category: body.category,
        description: body.description,
        coverImage: body.coverImage,
        images: body.images || [],
        techStack: body.techStack || [],
        liveUrl: body.liveUrl || null,
        year: body.year,
        sortOrder: body.sortOrder ?? 0,
        published: body.published ?? true,
      },
    });
    return NextResponse.json(work);
  } catch (error) {
    console.error("Failed to update work:", error);
    return NextResponse.json(
      { error: "Failed to update work" },
      { status: 500 }
    );
  }
}

// DELETE work
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.work.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete work:", error);
    return NextResponse.json(
      { error: "Failed to delete work" },
      { status: 500 }
    );
  }
}
