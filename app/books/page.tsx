import type { Metadata } from "next";
import { Suspense } from "react";
import { books } from "@/data/books";
import { CatalogBrowser } from "@/components/books/CatalogBrowser";

export const metadata: Metadata = {
  title: "Khám phá sách",
  description: "Tìm sách thiếu nhi theo lớp, thể loại, mức đọc, ngôn ngữ và khoảng giá.",
};

export default function BooksPage() {
  return (
    <div className="container-page py-10 md:py-16">
      <p className="eyebrow">Khám phá sách</p>
      <h1 className="mt-2 max-w-3xl text-4xl sm:text-5xl">Tìm theo cách của bạn.</h1>
      <div className="mt-10">
        <Suspense fallback={<p className="text-ink-soft">Đang tải danh mục…</p>}>
          <CatalogBrowser all={books} />
        </Suspense>
      </div>
    </div>
  );
}
