import Link from "next/link";
import type { Book } from "@/types/book";
import { BookShelf } from "@/components/books/BookShelf";

export function FeaturedShelf({ featured }: { featured: Book[] }) {
  return (
    <section aria-labelledby="shelf-title" className="container-page py-16 md:py-24">
      <h2 id="shelf-title" className="sd-tip max-w-2xl text-4xl sm:text-5xl">Những cuốn đang nằm trên kệ</h2>
      <div className="mt-10">
        {featured.length > 0 ? (
          <>
            <BookShelf books={featured} />
            <Link href="/books" className="link-underline mt-8 inline-block font-bold">Xem toàn bộ sách</Link>
          </>
        ) : (
          <div>
            <ul className="flex items-end gap-5 overflow-hidden px-3" aria-hidden="true">
              {[62, 74, 56, 80, 66, 72].map((h, i) => (
                <li key={i} className="hidden w-32 shrink-0 border-2 border-dashed border-ink/60 first:block sm:block" style={{ height: `${h * 2.4}px` }} />
              ))}
            </ul>
            <div className="h-4 border-2 border-ink bg-sun shadow-[0_6px_0_var(--color-ink)]" aria-hidden="true" />
            <p className="mt-8 max-w-xl text-ink-soft">Kệ đang được chuẩn bị. Sách đầu tiên, kèm thông tin đã kiểm chứng, sẽ xuất hiện ở đây.</p>
          </div>
        )}
      </div>
    </section>
  );
}
