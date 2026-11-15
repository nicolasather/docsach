import type { Book } from "@/types/book";
import { validateBooks } from "@/lib/validate-books";
import raw from "./books.json";

/**
 * DANH MỤC SÁCH
 * -------------
 * Dữ liệu nằm trong data/books.json (không phải sửa mã nguồn).
 * Hiện để trống; thêm sách theo docs/HUONG-DAN-THEM-SACH.md.
 * Bản ghi sai định dạng bị bỏ qua, không làm hỏng website.
 * Chạy `npm run kiem-tra-sach` để xem lỗi bằng tiếng Việt.
 */
const result = validateBooks(raw);

if (process.env.NODE_ENV !== "production") {
  for (const i of result.issues) {
    if (i.level === "LOI")
      console.error(`[Mầm Đọc] ${i.code} – ${i.bookRef}: ${i.message}`);
  }
}

export const books: Book[] = result.books;

export const bookBySlug = (slug: string): Book | undefined =>
  books.find((b) => b.slug === slug);
