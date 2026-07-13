import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getWorkBySlug, saveWork, deleteWork } from "@/lib/works-file";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const work = getWorkBySlug(id);
  if (!work) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ...work, id: work.slug });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticated();
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();

    saveWork({
      title: body.title, slug: body.slug || id,
      category: body.category || "other",
      description: body.description || "",
      coverImage: body.coverImage || "",
      images: body.images || [],
      techStack: body.techStack || [],
      liveUrl: body.liveUrl || undefined,
      featured: body.featured || false,
      year: body.year || new Date().getFullYear(),
      sortOrder: body.sortOrder || 0,
      published: body.published ?? true,
      content: body.content || "",
    });

    // 如果 slug 改了，删掉旧文件
    if (body.slug && body.slug !== id) {
      deleteWork(id);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to update work:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticated();
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    deleteWork(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete work:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
