"use client";

import { useState } from "react";
import type { Book } from "@/types/book";
import { Book3D } from "@/components/three-d/Book3D";

const FACES = [
  { bg: "var(--color-cobalt)", fg: "var(--color-canvas)", band: "var(--color-sun)" },
  { bg: "var(--color-coral)", fg: "var(--color-ink)", band: "var(--color-canvas)" },
  { bg: "var(--color-sun)", fg: "var(--color-ink)", band: "var(--color-coral)" },
  { bg: "var(--color-mint)", fg: "var(--color-ink)", band: "var(--color-cobalt)" },
];

const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

/**
 * Bìa sách 3D tỉ lệ 2:3 (có gáy và mép giấy). Có ảnh bìa thì dùng ảnh; thiếu hoặc lỗi thì hiện
 * bìa thay thế, ghi rõ "Chưa có ảnh bìa", không giả làm bìa thật.
 */
export function BookCover({
  book,
  className = "",
  priority = false,
}: {
  book: Pick<Book, "title" | "author" | "coverUrl">;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = !!book.coverUrl && !failed;
  const f = FACES[hash(book.title) % FACES.length];

  return (
    <div className={`book-tilt relative w-full ${className}`} style={{ containerType: "inline-size" }}>
      <div className="relative aspect-[2/3] w-full" style={{ transformStyle: "preserve-3d" }}>
        <Book3D
          className="!absolute inset-0"
          w="100cqw"
          h="150cqw"
          d="13cqw"
          face={f.bg}
          side="var(--color-ink)"
          top="var(--color-canvas)"
          rightPages
          front={
            showImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={book.coverUrl}
                alt={`Bìa sách ${book.title}, tác giả ${book.author}`}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                onError={() => setFailed(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <span
                role="img"
                aria-label={`Chưa có ảnh bìa cho sách ${book.title}`}
                className="flex h-full flex-col justify-between p-[9cqw]"
                style={{ color: f.fg }}
              >
                <b className="block h-[3cqw] w-[40%]" style={{ background: f.band }} />
                <span className="block font-display text-[10cqw] font-bold leading-[1.05] line-clamp-5">{book.title}</span>
                <span className="block">
                  <span className="block text-[6.4cqw] leading-tight line-clamp-2">{book.author}</span>
                  <span className="mt-[3cqw] block text-[5cqw] opacity-90">Chưa có ảnh bìa</span>
                </span>
              </span>
            )
          }
        />
      </div>
    </div>
  );
}
