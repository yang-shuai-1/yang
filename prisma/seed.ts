import { PrismaClient } from "@prisma/client";
import { getAllWorks } from "../src/lib/works";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database from markdown files...");

  const works = getAllWorks();
  console.log(`Found ${works.length} works in content/works/`);

  for (const work of works) {
    const existing = await prisma.work.findUnique({
      where: { slug: work.slug },
    });

    if (existing) {
      console.log(`  ⏭  Skipping "${work.title}" (already exists)`);
      continue;
    }

    await prisma.work.create({
      data: {
        title: work.title,
        slug: work.slug,
        category: work.category,
        description: work.description,
        coverImage: work.coverImage,
        images: work.images,
        techStack: work.techStack,
        liveUrl: work.liveUrl || null,
        year: work.year,
        sortOrder: work.sortOrder,
        published: work.published,
      },
    });

    console.log(`  ✅ Created "${work.title}"`);
  }

  console.log("🌱 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
