"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { Book, Genre } from "@/types/book";
import type { Budget, Grade, Language, ReadingLevel } from "@/types/survey";
import { filterBooks } from "@/lib/catalog";
import { BUDGETS, GENRES, GRADES, LANGUAGES, READING_LEVELS, THEMES } from "@/lib/taxonomy";
import { BookCard } from "./BookCard";
import { EmptyState } from "@/components/shared/EmptyState";

const sel =
  "min-h-12 w-full rounded-[4px] border-2 border-line bg-canvas px-3 py-2 text-base focus-visible:border-cobalt";

export function CatalogBrowser({ all }: { all: Book[] }) {
  const router = useRouter();
  const sp = useSearchParams();
  const get = (k: string) => sp.get(k) ?? "";

  const theme = THEMES.find((t) => t.id === get("chu-de"));
  const filters = {
    q: get("q"),
    grade: get("lop") ? (Number(get("lop")) as Grade) : undefined,
    genre: (get("the-loai") || undefined) as Genre | undefined,
    level: get("muc-doc") ? (Number(get("muc-doc")) as ReadingLevel) : undefined,
    language: (get("ngon-ngu") || undefined) as Language | undefined,
    price: (get("gia") || undefined) as Budget | undefined,
    theme,
  };
  const results = useMemo(() => filterBooks(all, filters), [all, filters.q, filters.grade, filters.genre, filters.level, filters.language, filters.price, theme]); // eslint-disable-line react-hooks/exhaustive-deps
  const active = ["q", "lop", "the-loai", "muc-doc", "ngon-ngu", "gia", "chu-de"].filter((k) => get(k));

  function set(key: string, value: string) {
    const next = new URLSearchParams(sp.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`/books${next.toString() ? `?${next}` : ""}`, { scroll: false });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <form role="search" aria-label="Tìm và lọc sách" className="space-y-5 lg:col-span-3" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="q" className="mb-1.5 block font-semibold">Tìm theo tên sách, tác giả</label>
          <input id="q" type="search" value={get("q")} onChange={(e) => set("q", e.target.value)} className={sel} placeholder="Ví dụ: phiêu lưu" />
        </div>
        <div>
          <label htmlFor="lop" className="mb-1.5 block font-semibold">Lớp</label>
          <select id="lop" value={get("lop")} onChange={(e) => set("lop", e.target.value)} className={sel}>
            <option value="">Tất cả các lớp</option>
            {GRADES.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="the-loai" className="mb-1.5 block font-semibold">Thể loại</label>
          <select id="the-loai" value={get("the-loai")} onChange={(e) => set("the-loai", e.target.value)} className={sel}>
            <option value="">Tất cả thể loại</option>
            {GENRES.map((g) => <option key={g.id} value={g.id}>{g.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="muc-doc" className="mb-1.5 block font-semibold">Mức đọc</label>
          <select id="muc-doc" value={get("muc-doc")} onChange={(e) => set("muc-doc", e.target.value)} className={sel}>
            <option value="">Mọi mức đọc</option>
            {READING_LEVELS.map((l) => <option key={l.id} value={l.id}>{l.short}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="ngon-ngu" className="mb-1.5 block font-semibold">Ngôn ngữ</label>
          <select id="ngon-ngu" value={get("ngon-ngu")} onChange={(e) => set("ngon-ngu", e.target.value)} className={sel}>
            <option value="">Mọi ngôn ngữ</option>
            {LANGUAGES.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="gia" className="mb-1.5 block font-semibold">Khoảng giá</label>
          <select id="gia" value={get("gia")} onChange={(e) => set("gia", e.target.value)} className={sel}>
            <option value="">Mọi mức giá</option>
            {BUDGETS.filter((b) => b.id !== "khong-gioi-han").map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
          </select>
          <p className="mt-1.5 text-sm text-ink-soft">Chỉ tính những cuốn có giá đã xác minh.</p>
        </div>
        {active.length > 0 && (
          <Link href="/books" className="btn btn-outline w-full">Xoá bộ lọc</Link>
        )}
      </form>

      <section aria-labelledby="ket-qua" className="lg:col-span-9">
        <h2 id="ket-qua" className="font-display text-2xl" aria-live="polite">
          {theme ? `${theme.label}: ` : ""}
          {results.length > 0 ? `${results.length} cuốn sách` : "Không có kết quả"}
        </h2>
        {all.length === 0 ? (
          <div className="mt-6">
            <EmptyState title="Kệ sách đang được chuẩn bị">
              <p>Danh mục sách chưa có cuốn nào. Những cuốn đầu tiên sẽ xuất hiện ở đây, kèm thông tin đã kiểm chứng.</p>
            </EmptyState>
          </div>
        ) : results.length === 0 ? (
          <div className="mt-6">
            <EmptyState title="Không tìm thấy sách phù hợp" action={{ href: "/books", label: "Xoá bộ lọc" }}>
              <p>Thử bỏ bớt bộ lọc hoặc đổi từ khoá tìm kiếm.</p>
            </EmptyState>
          </div>
        ) : (
          <div className="mt-2">
            {results.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        )}
      </section>
    </div>
  );
}
