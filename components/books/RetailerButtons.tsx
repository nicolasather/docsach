import type { Book } from "@/types/book";

export function RetailerButtons({ book }: { book: Book }) {
  const links = book.retailerLinks ?? [];
  if (links.length === 0) {
    return (
      <p className="text-ink-soft">
        Chưa có liên kết mua sách đã được xác minh cho cuốn này.
      </p>
    );
  }
  return (
    <ul className="flex flex-wrap gap-3">
      {links.map((l) => {
        const name = l.retailer === "Khác" ? l.label ?? "nhà sách" : l.retailer;
        return (
          <li key={l.url}>
            <a
              href={l.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="btn btn-outline"
            >
              Mua tại {name}
              <span aria-hidden="true">↗</span>
              <span className="visually-hidden"> (mở trang nhà sách ở tab mới)</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
