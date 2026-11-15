import Link from "next/link";
import type { Book } from "@/types/book";
import { BookShelf } from "@/components/books/BookShelf";

export function FeaturedShelf({ featured }: { featured: Book[] }) {
  return (
    <section aria-labelledby="shelf-title" className="container-page pb-16 md:pb-24">
      <p className="eyebrow">Kệ sách chọn lọc</p>
      <h2 id="shelf-title" className="mt-3 max-w-2xl text-3xl sm:text-4xl">Những cuốn đang nằm trên kệ.</h2>
      <div className="mt-8">
        {featured.length > 0 ? (
          <>
            <BookShelf books={featured} />
            <Link href="/books" className="link-underline mt-6 inline-block font-semibold">Xem toàn bộ sách</Link>
          </>
        ) : (
          <div>
            <ul className="flex gap-5 overflow-hidden px-1" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <li key={i} className="hidden aspect-[2/3] w-40 shrink-0 border border-dashed border-line first:block sm:block">
                  <span className="sr-only">Chỗ trống trên kệ</span>
                </li>
              ))}
            </ul>
            <div className="h-3 bg-ink/85" aria-hidden="true" />
            <p className="mt-6 max-w-xl text-ink-soft">
              Kệ sách đang được chuẩn bị. Những cuốn sách đầu tiên, kèm thông tin đã kiểm chứng, sẽ xuất hiện ở đây.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
