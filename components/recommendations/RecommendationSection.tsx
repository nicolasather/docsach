import type { ScoredBook } from "@/lib/recommendation-engine";
import { BAND_LABEL } from "@/lib/recommendation-engine";
import { BookCard } from "@/components/books/BookCard";

export function RecommendationSection({
  id,
  eyebrow,
  title,
  intro,
  items,
  showBand = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  items: ScoredBook[];
  showBand?: boolean;
}) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby={id} className="py-12 md:py-16">
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="mt-2 text-3xl sm:text-4xl">{title}</h2>
        <p className="mt-3 text-ink-soft">{intro}</p>
      </div>
      <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-x-12">
        {items.map((s) => (
          <BookCard
            key={s.book.id}
            book={s.book}
            reasons={s.reasons}
            bandLabel={showBand ? BAND_LABEL[s.band] : undefined}
          />
        ))}
      </div>
    </section>
  );
}
