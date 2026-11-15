import Link from "next/link";
import type { Book } from "@/types/book";
import { BookCover } from "./BookCover";

/** Kệ sách: hàng bìa sách 3D đặt trên tấm kệ dày. Cuộn ngang trên điện thoại. */
export function BookShelf({ books }: { books: Book[] }) {
  return (
    <div>
      <ul className="flex gap-6 overflow-x-auto px-3 pb-6 pt-4 sm:gap-9" tabIndex={0} aria-label="Kệ sách, cuộn ngang để xem thêm">
        {books.map((b, i) => (
          <li key={b.id} className={`w-36 shrink-0 sm:w-44 ${i % 2 ? "sd-l" : "sd-r"}`}>
            <Link href={`/books/${b.slug}`} className="group block">
              <BookCover book={b} />
              <p className="mt-4 line-clamp-2 font-display text-base font-bold leading-snug group-hover:text-cobalt group-hover:underline">{b.title}</p>
              <p className="mt-0.5 line-clamp-1 text-sm text-ink-soft">{b.author}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="h-4 border-2 border-ink bg-sun shadow-[0_6px_0_var(--color-ink)]" aria-hidden="true" />
    </div>
  );
}
