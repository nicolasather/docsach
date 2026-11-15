import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { validateBooks } from "../lib/validate-books";

const ROOT = process.cwd();
const VERSION = "0.1.0";
const log = (level: string, code: string, msg: string) => {
  const line = `${new Date().toISOString()} | ${level} | v${VERSION} | ${code} | ${msg}\n`;
  try {
    appendFileSync(join(ROOT, "nhat-ky.txt"), line);
  } catch {
    /* không ghi được nhật ký thì vẫn tiếp tục */
  }
};

let raw: unknown;
try {
  raw = JSON.parse(readFileSync(join(ROOT, "data", "books.json"), "utf8"));
} catch (e) {
  const msg = `Không đọc được data/books.json: ${(e as Error).message}. Cách sửa: kiểm tra dấu phẩy, dấu ngoặc và dấu nháy kép; dán nội dung vào jsonlint.com để thấy dòng bị lỗi.`;
  console.error("LỖI: " + msg);
  log("LOI", "BOOKS_000", msg);
  process.exit(1);
}

const { books, issues } = validateBooks(raw);
for (const b of books) {
  if (b.coverUrl?.startsWith("/covers/") && !existsSync(join(ROOT, "public", b.coverUrl))) {
    issues.push({
      code: "BOOKS_060",
      level: "CANH_BAO",
      bookRef: `"${b.title}"`,
      message: `Không thấy file ảnh bìa public${b.coverUrl}. Cách sửa: chép file vào thư mục public/covers/ đúng tên.`,
    });
  }
}

const errors = issues.filter((i) => i.level === "LOI");
console.log(`Đã đọc ${Array.isArray(raw) ? raw.length : 0} bản ghi: ${books.length} hợp lệ, ${errors.length} lỗi, ${issues.length - errors.length} cảnh báo.`);
for (const i of issues) {
  console.log(`${i.level === "LOI" ? "LỖI    " : "CẢNH BÁO"} [${i.code}] ${i.bookRef}: ${i.message}`);
  log(i.level, i.code, `${i.bookRef}: ${i.message}`);
}
log("INFO", "BOOKS_OK", `${books.length} hợp lệ / ${errors.length} lỗi`);
process.exit(errors.length ? 1 : 0);
