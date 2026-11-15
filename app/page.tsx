import { books } from "@/data/books";
import { Hero } from "@/components/homepage/Hero";
import { HowItWorks } from "@/components/homepage/HowItWorks";
import { CollectionsSection } from "@/components/homepage/CollectionsSection";
import { ThemesSection } from "@/components/homepage/ThemesSection";
import { FeaturedShelf } from "@/components/homepage/FeaturedShelf";
import { ParentsSection } from "@/components/homepage/ParentsSection";
import { FinalCta } from "@/components/homepage/FinalCta";

export default function HomePage() {
  const withCovers = books.filter((b) => !!b.coverUrl);
  const featured = [...withCovers, ...books.filter((b) => !b.coverUrl)].slice(0, 8);
  return (
    <>
      <Hero coverBooks={withCovers} />
      <HowItWorks />
      <CollectionsSection />
      <ThemesSection />
      <FeaturedShelf featured={featured} />
      <ParentsSection />
      <FinalCta />
    </>
  );
}
