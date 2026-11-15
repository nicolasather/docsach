import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { books, bookBySlug } from "@/data/books";
import { similarBooks } from "@/lib/catalog";
import {
  FORMAT_SHORT,
  GENRE_LABEL,
  GOAL_SHORT,
  INTEREST_LABEL,
  LANGUAGE_LABEL,
  LEVEL_SHORT,
  gradeText,
} from "@/lib/taxonomy";
import { formatMinutes, formatVnd, hasVerifiedPrice } from "@/lib/matching-utils";
import { BookCover } from "@/components/books/BookCover";
import { WishlistButton } from "@/components/books/WishlistButton";
import { RetailerButtons } from "@/components/books/RetailerButtons";
import { DataStatusBadge } from "@/components/books/DataStatusBadge";
import { BookShelf } from "@/components/books/BookShelf";

export const dynamicParams = true;

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const book = bookBySlug(slug);
  if (!book) return { title: "Không tìm thấy sách" };
  return { title: book.title, description: book.childFriendlyDescription ?? book.description };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = bookBySlug(slug);
  if (!book) notFound();

  const similar = similarBooks(book, books);
  const verified = book.dataStatus === "verified";

  const facts: [string, string][] = [
    ["Tác giả", book.author],
    ["Nhà xuất bản", book.publisher ?? "Chưa rõ"],
    ...(verified && book.isbn ? ([["ISBN", book.isbn]] as [string, string][]) : []),
    ["Lớp phù hợp", gradeText(book.gradeRange.min, book.gradeRange.max)],
    ...(book.ageRange ? ([["Độ tuổi", `${book.ageRange.min}–${book.ageRange.max} tuổi`]] as [string, string][]) : []),
    ["Mức đọc", LEVEL_SHORT[book.readingLevel]],
    ["Kiểu sách", FORMAT_SHORT[book.format]],
    ["Ngôn ngữ", LANGUAGE_LABEL[book.language]],
    ...(book.pageCount ? ([["Số trang", String(book.pageCount)]] as [string, string][]) : []),
    ...(book.estimatedReadingTime ? ([["Thời gian đọc ước tính", formatMinutes(book.estimatedReadingTime)]] as [string, string][]) : []),
  ];

  return (
    <article className="container-page py-10 md:py-16">
      <nav aria-label="Đường dẫn" className="text-sm text-ink-soft">
        <Link href="/books" className="hover:underline">Khám phá sách</Link> <span aria-hidden="true">/</span>{" "}
        <span>{book.title}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="mx-auto w-full max-w-[18rem] lg:col-span-4 lg:mx-0 lg:max-w-none">
          <BookCover book={book} priority />
        </div>

        <div className="lg:col-span-8">
          <p className="eyebrow">{GENRE_LABEL[book.genres[0]]}</p>
          <h1 className="mt-2 text-4xl sm:text-5xl">{book.title}</h1>
          <p className="mt-3 text-lg text-ink-soft">{book.author}</p>
          <div className="mt-3"><DataStatusBadge status={book.dataStatus} /></div>

          <div className="mt-6 max-w-2xl space-y-4 text-lg">
            <p>{book.description}</p>
            {book.childFriendlyDescription && <p className="font-serif text-xl italic text-forest">{book.childFriendlyDescription}</p>}
          </div>

          <dl className="mt-8 grid max-w-2xl gap-x-8 sm:grid-cols-2">
            {facts.map(([k, v]) => (
              <div key={k} className="border-t border-line py-3">
                <dt className="text-sm text-ink-soft">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap gap-2" aria-label="Chủ đề và thể loại">
            {[...book.genres.map((g) => GENRE_LABEL[g]), ...book.interests.map((i) => INTEREST_LABEL[i])].map((t) => (
              <span key={t} className="rounded-sm bg-paper-2 px-2.5 py-1 text-sm">{t}</span>
            ))}
          </div>

          <section aria-labelledby="mua-sach" className="mt-10 border-t-2 border-forest pt-6">
            <h2 id="mua-sach" className="text-2xl">Mua sách</h2>
            {hasVerifiedPrice(book) && (
              <p className="mt-2">
                <span className="font-semibold">{formatVnd(book.price)}</span>
                <span className="text-sm text-ink-soft"> · Nguồn: {book.priceSource}, cập nhật {book.priceUpdatedAt}. Giá có thể đã thay đổi.</span>
              </p>
            )}
            <div className="mt-4"><RetailerButtons book={book} /></div>
            <p className="mt-3 text-sm text-ink-soft">Các nút trên dẫn sang trang nhà sách bên ngoài. Mầm Đọc không bán sách.</p>
            <div className="mt-5"><WishlistButton bookId={book.id} title={book.title} /></div>
          </section>
        </div>
      </div>

      <div className="mt-14 grid gap-10 border-t border-line pt-10 lg:grid-cols-2 lg:gap-14">
        <section aria-labelledby="vi-sao">
          <h2 id="vi-sao" className="text-2xl">Vì sao cuốn sách này phù hợp</h2>
          <ul className="mt-4 space-y-2 text-[1.02rem]">
            <li>Dành cho {gradeText(book.gradeRange.min, book.gradeRange.max).toLowerCase()}, mức đọc “{LEVEL_SHORT[book.readingLevel].toLowerCase()}”.</li>
            {book.interests.length > 0 && <li>Phù hợp với bé thích: {book.interests.map((i) => INTEREST_LABEL[i]).join(", ")}.</li>}
            {book.goals.length > 0 && <li>Hỗ trợ: {book.goals.map((g) => GOAL_SHORT[g]).join(", ")}.</li>}
            <li>Kiểu sách: {FORMAT_SHORT[book.format].toLowerCase()}.</li>
          </ul>
        </section>
        <section aria-labelledby="ghi-chu">
          <h2 id="ghi-chu" className="text-2xl">Ghi chú cho phụ huynh</h2>
          <div className="mt-4 space-y-3 text-[1.02rem]">
            {book.parentNotes ? <p>{book.parentNotes}</p> : <p className="text-ink-soft">Chưa có ghi chú cho cuốn sách này.</p>}
            {book.contentNotes && (
              <p className="border-l-4 border-gold bg-paper-2 px-4 py-3"><span className="font-semibold">Lưu ý nội dung: </span>{book.contentNotes}</p>
            )}
          </div>
        </section>
      </div>

      <section aria-labelledby="tuong-tu" className="mt-16 border-t border-line pt-10">
        <h2 id="tuong-tu" className="text-3xl">Những cuốn sách tương tự</h2>
        {similar.length > 0 ? (
          <div className="mt-6"><BookShelf books={similar} /></div>
        ) : (
          <p className="mt-3 text-ink-soft">Chưa có cuốn nào tương tự trong danh mục hiện tại. <Link href="/books" className="link-underline">Xem toàn bộ sách</Link>.</p>
        )}
      </section>
    </article>
  );
}
