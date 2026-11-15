import Link from "next/link";
import type { Collection } from "@/data/collections";

export function CollectionCard({ collection, count, index }: { collection: Collection; count: number; index?: number }) {
  return (
    <article className="border-t-2 border-forest pt-5">
      {index !== undefined && (
        <p className="font-serif text-sm text-terracotta-ink">Bộ sưu tập {String(index + 1).padStart(2, "0")}</p>
      )}
      <h3 className="mt-1 text-2xl">
        <Link href={`/collections/${collection.slug}`} className="hover:text-forest hover:underline">{collection.title}</Link>
      </h3>
      <p className="mt-2 text-ink-soft">{collection.kicker}</p>
      <p className="mt-3 text-sm font-medium text-ink">
        {count > 0 ? `${count} cuốn sách` : "Đang tuyển chọn sách"}
      </p>
    </article>
  );
}
