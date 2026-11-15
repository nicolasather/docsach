import Link from "next/link";
import type { Book } from "@/types/book";
import { BookCover } from "./BookCover";

/** Kệ sách: hàng bìa sách đặt trên một thanh kệ. Cuộn ngang trên điện thoại. */
export function BookShelf({ books }: { books: Book[] }) {
  return (
    <div>
      <ul className="flex gap-5 overflow-x-auto px-1 pb-5 pt-2 sm:gap-7" tabIndex={0} aria-label="Kệ sách, cuộn ngang để xem thêm">
        {books.map((b) => (
          <li key={b.id} className="w-36 shrink-0 sm:w-44">
            <Link href={`/books/${b.slug}`} className="group block">
              <BookCover book={b} />
              <p className="mt-3 line-clamp-2 font-serif text-base font-semibold leading-snug group-hover:text-forest group-hover:underline">
                {b.title}
              </p>
              <p className="mt-0.5 line-clamp-1 text-sm text-ink-soft">{b.author}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="h-3 rounded-[2px] bg-ink/85" aria-hidden="true" />
      <div className="h-2 bg-ink/10" aria-hidden="true" />
    </div>
  );
}
