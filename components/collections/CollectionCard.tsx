import Link from "next/link";
import type { Collection } from "@/data/collections";
import { BookPile } from "@/components/three-d/BookPile";

export function CollectionCard({ collection, count, index = 0 }: { collection: Collection; count: number; index?: number }) {
  return (
    <article className="surface-1 group relative flex h-full flex-col overflow-hidden transition-transform duration-300 [transition-timing-function:var(--ease-flip)] hover:-translate-y-1">
      <div className={`grid place-items-center overflow-hidden border-b-2 border-ink pb-7 pt-8 ${["bg-sun", "bg-mint", "bg-coral"][index % 3]}`}>
        <div className="transition-transform duration-500 [transition-timing-function:var(--ease-flip)] group-hover:[transform:rotateY(18deg)_scale(1.04)]" style={{ perspective: "900px" }}>
          <BookPile count={count} variant={index} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl">
          <Link href={`/collections/${collection.slug}`} className="after:absolute after:inset-0 hover:text-cobalt">{collection.title}</Link>
        </h3>
        <p className="mt-2 text-ink-soft">{collection.kicker}</p>
        <p className="mt-auto pt-4 text-sm font-semibold">{count > 0 ? `${count} cuốn sách` : "Đang tuyển chọn sách"}</p>
      </div>
    </article>
  );
}
