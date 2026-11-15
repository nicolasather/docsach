import Link from "next/link";
import { collections, booksInCollection } from "@/data/collections";
import { books } from "@/data/books";
import { CollectionCard } from "@/components/collections/CollectionCard";

export function CollectionsSection() {
  return (
    <section aria-labelledby="col-title" className="container-page py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Bộ sưu tập chọn lọc</p>
          <h2 id="col-title" className="mt-3 max-w-xl text-3xl sm:text-4xl">Mỗi bộ sưu tập, một lời giới thiệu.</h2>
        </div>
        <Link href="/collections" className="link-underline font-semibold">Xem tất cả bộ sưu tập</Link>
      </div>
      <div className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-6">
        {collections.slice(0, 3).map((c, i) => (
          <div key={c.slug} className={i === 0 ? "md:col-span-6 lg:col-span-3" : "md:col-span-3 lg:col-span-3"}>
            <CollectionCard collection={c} count={booksInCollection(c, books).length} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
