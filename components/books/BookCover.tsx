"use client";

import { useState } from "react";
import type { Book } from "@/types/book";

/** Ảnh bìa tỉ lệ 2:3. Thiếu ảnh hoặc ảnh lỗi thì hiện bìa thay thế gọn gàng, không giả làm bìa thật. */
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

  return (
    <div
      className={`relative aspect-[2/3] w-full overflow-hidden rounded-[3px] border border-line bg-paper-2 shadow-[2px_3px_0_rgba(48,51,45,0.12)] ${className}`}
    >
      {showImage ? (
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
        <div
          role="img"
          aria-label={`Chưa có ảnh bìa cho sách ${book.title}`}
          className="flex h-full flex-col justify-between border-l-[10px] border-forest/80 p-4"
        >
          <p className="font-serif text-lg font-semibold leading-snug text-forest line-clamp-5">{book.title}</p>
          <div>
            <p className="text-sm text-ink-soft line-clamp-2">{book.author}</p>
            <p className="mt-2 text-xs text-ink-soft">Chưa có ảnh bìa</p>
          </div>
        </div>
      )}
    </div>
  );
}
