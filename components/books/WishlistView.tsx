"use client";

import { useMemo } from "react";
import { books } from "@/data/books";
import { useWishlist } from "@/lib/storage";
import { BookCard } from "./BookCard";
import { EmptyState } from "@/components/shared/EmptyState";

export function WishlistView() {
  const { ids, clear } = useWishlist();
  const saved = useMemo(() => books.filter((b) => ids.includes(b.id)), [ids]);
  // Id đã lưu nhưng sách không còn trong danh mục (đã bị gỡ)
  const missing = ids.length - saved.length;

  if (saved.length === 0) {
    return (
      <EmptyState title="Chưa có cuốn sách nào được lưu" action={{ href: "/books", label: "Khám phá sách" }}>
        <p>Nhấn “Lưu sách” ở bất kỳ cuốn nào để tạo danh sách sách muốn đọc. Danh sách được lưu ngay trong trình duyệt này, không cần tài khoản.</p>
      </EmptyState>
    );
  }
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-serif text-xl" aria-live="polite">{saved.length} cuốn sách</p>
        <button type="button" onClick={clear} className="link-underline min-h-11 font-semibold">Xoá toàn bộ danh sách</button>
      </div>
      {missing > 0 && (
        <p className="mt-3 text-sm text-ink-soft">{missing} cuốn đã lưu hiện không còn trong danh mục nên không hiển thị.</p>
      )}
      <div className="mt-2 lg:grid lg:grid-cols-2 lg:gap-x-12">
        {saved.map((b) => <BookCard key={b.id} book={b} />)}
      </div>
    </div>
  );
}
