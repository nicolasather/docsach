import Link from "next/link";
import type { Book } from "@/types/book";
import { BookCover } from "@/components/books/BookCover";
import { HeroArt } from "./HeroArt";

export function Hero({ coverBooks }: { coverBooks: Book[] }) {
  const useCovers = coverBooks.length >= 3;
  return (
    <section aria-labelledby="hero-title" className="border-b border-line">
      <div className="container-page grid items-center gap-10 py-12 md:py-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="eyebrow">Thư viện gợi ý sách cho học sinh tiểu học · Lớp 1 đến lớp 5</p>
          <h1 id="hero-title" className="mt-4 text-[2.5rem] font-semibold leading-[1.1] sm:text-6xl lg:text-[4.25rem]">
            Tìm cuốn sách mà bé sẽ <em className="font-serif italic text-forest">muốn đọc tiếp.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-soft">
            Mỗi em nhỏ có một sở thích và cách đọc riêng. Hãy để Mầm Đọc giúp bạn tìm ra những cuốn sách phù hợp với bé.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/survey" className="btn btn-primary">Khám phá sách phù hợp</Link>
            <Link href="/collections" className="btn btn-outline">Xem bộ sưu tập sách</Link>
          </div>
          <p className="mt-5 text-sm text-ink-soft">
            Năm câu hỏi, khoảng 1–2 phút. Không cần tài khoản, không hỏi tên hay ngày sinh của bé.
          </p>
        </div>

        <div className="lg:col-span-5">
          {useCovers ? (
            <div className="relative mx-auto flex max-w-md items-end justify-center gap-4 pb-6">
              {coverBooks.slice(0, 3).map((b, i) => (
                <div key={b.id} className={`w-1/3 ${i === 1 ? "-translate-y-6" : ""}`}>
                  <BookCover book={b} priority />
                </div>
              ))}
              <div className="absolute inset-x-0 bottom-0 h-3 bg-ink/85" aria-hidden="true" />
            </div>
          ) : (
            <HeroArt />
          )}
        </div>
      </div>
    </section>
  );
}
