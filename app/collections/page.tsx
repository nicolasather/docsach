import type { Metadata } from "next";
import { collections, booksInCollection } from "@/data/collections";
import { books } from "@/data/books";
import { CollectionCard } from "@/components/collections/CollectionCard";

export const metadata: Metadata = {
  title: "Bộ sưu tập",
  description: "Những bộ sưu tập sách thiếu nhi được tuyển chọn theo chủ đề, kèm lời giới thiệu.",
};

export default function CollectionsPage() {
  return (
    <div className="container-page py-10 md:py-16">
      <p className="eyebrow">Bộ sưu tập</p>
      <h1 className="mt-2 max-w-3xl text-4xl sm:text-5xl">Sách được chọn theo từng câu chuyện của bé.</h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">
        Mỗi bộ sưu tập có một lời giới thiệu ngắn về lý do những cuốn sách này đứng cạnh nhau.
      </p>
      <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {collections.map((c, i) => (
          <CollectionCard key={c.slug} collection={c} count={booksInCollection(c, books).length} index={i} />
        ))}
      </div>
    </div>
  );
}
