import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getAllWorks, saveWork } from "@/lib/works-file";

export async function GET() {
  try {
    const authed = await isAuthenticated();
    const works = getAllWorks();
    // Admin sees all, public sees only published
    const result = authed ? works : works.filter((w) => w.published);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch works:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authed = await isAuthenticated();
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const slug = body.slug || body.title.replace(/\s+/g, "-").toLowerCase();

    saveWork({
      title: body.title,
      slug,
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

    return NextResponse.json({ ok: true, slug }, { status: 201 });
  } catch (error) {
    console.error("Failed to create work:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
