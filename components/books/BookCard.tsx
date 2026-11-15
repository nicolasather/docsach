import Link from "next/link";
import type { Book } from "@/types/book";
import { GENRE_LABEL, LEVEL_SHORT, gradeText } from "@/lib/taxonomy";
import { formatMinutes } from "@/lib/matching-utils";
import { BookCover } from "./BookCover";
import { WishlistButton } from "./WishlistButton";
import { DataStatusBadge } from "./DataStatusBadge";

export function BookCard({
  book,
  reasons,
  bandLabel,
  headingLevel = 3,
}: {
  book: Book;
  reasons?: string[];
  bandLabel?: string;
  headingLevel?: 2 | 3;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-line py-6 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
      <Link href={`/books/${book.slug}`} aria-label={`Xem chi tiết: ${book.title}`} tabIndex={-1}>
        <BookCover book={book} />
      </Link>
      <div className="min-w-0">
        {bandLabel && <p className="eyebrow">{bandLabel}</p>}
        <H className="mt-0.5 font-display text-xl font-semibold leading-snug sm:text-2xl">
          <Link href={`/books/${book.slug}`} className="hover:text-cobalt hover:underline">
            {book.title}
          </Link>
        </H>
        <p className="mt-1 text-[0.95rem] text-ink-soft">
          {book.author}
          {book.publisher ? ` · ${book.publisher}` : " · Chưa rõ nhà xuất bản"}
        </p>

        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink">
          <li>{gradeText(book.gradeRange.min, book.gradeRange.max)}</li>
          <li>Mức đọc: {LEVEL_SHORT[book.readingLevel]}</li>
          <li>{GENRE_LABEL[book.genres[0]]}</li>
          {book.estimatedReadingTime && <li>Đọc khoảng {formatMinutes(book.estimatedReadingTime)}</li>}
        </ul>

        <p className="mt-3 line-clamp-3 text-[0.98rem] leading-relaxed">
          {book.childFriendlyDescription ?? book.description}
        </p>

        {reasons && reasons.length > 0 && (
          <div className="mt-4 border-l-[3px] border-sun bg-canvas-2 px-4 py-3">
            <p className="text-sm font-semibold text-cobalt">Vì sao hợp với bé</p>
            <ul className="mt-1.5 space-y-1 text-[0.95rem] leading-snug">
              {reasons.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href={`/books/${book.slug}`} className="btn btn-primary">
            Xem chi tiết
          </Link>
          <WishlistButton bookId={book.id} title={book.title} variant="text" />
          <DataStatusBadge status={book.dataStatus} />
        </div>
      </div>
    </article>
  );
}
