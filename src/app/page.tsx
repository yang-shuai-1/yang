import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { FeaturedWorks } from "@/components/home/featured-works-section";
import { PottedPlant } from "@/components/decorations/potted-plant";
import { GeometricBuddy } from "@/components/decorations/geometric-buddy";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { FeaturedSection } from "@/components/home/featured-section";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <div className="flex justify-center py-4">
          <div className="hairline-section" />
        </div>
        <FeaturedSection />
        <div className="flex justify-center py-4">
          <div className="hairline-section" />
        </div>
        <FeaturedWorks />
      </main>
      <Footer />
      <PottedPlant />
      <GeometricBuddy />
      <ScrollToTop />
    </>
  );
}
