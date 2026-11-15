import Link from "next/link";
import { collections, booksInCollection } from "@/data/collections";
import { books } from "@/data/books";
import { CollectionCard } from "@/components/collections/CollectionCard";

export function CollectionsSection() {
  return (
    <section aria-labelledby="col-title" className="border-y-2 border-ink bg-canvas-2 py-16 md:py-24">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="col-title" className="sd-tip max-w-xl text-4xl sm:text-5xl">Bộ sưu tập chọn lọc</h2>
          <Link href="/collections" className="link-underline font-bold">Xem tất cả</Link>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {collections.slice(0, 3).map((c, i) => (
            <div key={c.slug} className={i === 0 ? "sd-l" : i === 1 ? "sd-tip md:mt-10" : "sd-r md:mt-20"}>
              <CollectionCard collection={c} count={booksInCollection(c, books).length} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
