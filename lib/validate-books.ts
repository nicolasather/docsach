import type { Book } from "@/types/book";
import {
  BUDGETS,
  FORMATS,
  GENRES,
  GOALS,
  INTERESTS,
  LANGUAGES,
} from "./taxonomy";

export interface ValidationIssue {
  code: string;
  level: "LOI" | "CANH_BAO";
  bookRef: string;
  message: string;
}

export interface ValidationResult {
  books: Book[];
  issues: ValidationIssue[];
}

const KNOWN_KEYS = new Set([
  "id", "slug", "title", "author", "publisher", "isbn", "coverUrl",
  "ageRange", "gradeRange", "readingLevel", "genres", "interests", "goals",
  "format", "language", "estimatedReadingTime", "pageCount", "description",
  "childFriendlyDescription", "parentNotes", "contentNotes", "sharedReading",
  "price", "priceUpdatedAt", "priceSource", "retailerLinks", "sourceUrl",
  "dataStatus",
]);

const ids = <T extends { id: string }>(l: T[]) => new Set(l.map((x) => x.id));
const INTEREST_IDS = ids(INTERESTS);
const GENRE_IDS = ids(GENRES);
const FORMAT_IDS = ids(FORMATS);
const GOAL_IDS = ids(GOALS);
const LANG_IDS = ids(LANGUAGES);
void BUDGETS;

const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);
const isStr = (v: unknown): v is string =>
  typeof v === "string" && v.trim().length > 0;
const isHttps = (v: unknown) => isStr(v) && /^https:\/\/\S+$/.test(v);
const isDate = (v: unknown) =>
  isStr(v) && /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(v);

/**
 * Kiểm tra dữ liệu sách. Bản ghi lỗi bị loại khỏi website (không làm sập trang)
 * và được báo bằng tiếng Việt kèm cách sửa.
 */
export function validateBooks(raw: unknown): ValidationResult {
  const issues: ValidationIssue[] = [];
  const books: Book[] = [];

  if (!Array.isArray(raw)) {
    issues.push({
      code: "BOOKS_001",
      level: "LOI",
      bookRef: "(toàn tệp)",
      message:
        "Tệp data/books.json phải là một danh sách bắt đầu bằng [ và kết thúc bằng ]. Cách sửa: bao toàn bộ các sách trong cặp ngoặc vuông, mỗi sách là một khối { … } ngăn cách bằng dấu phẩy.",
    });
    return { books, issues };
  }

  const seenId = new Set<string>();
  const seenSlug = new Set<string>();

  raw.forEach((item, index) => {
    const ref = isObj(item) && isStr(item.title) ? `"${item.title}"` : `sách thứ ${index + 1}`;
    const err = (code: string, message: string) =>
      issues.push({ code, level: "LOI", bookRef: ref, message });
    const warn = (code: string, message: string) =>
      issues.push({ code, level: "CANH_BAO", bookRef: ref, message });

    if (!isObj(item)) {
      err("BOOKS_002", "Bản ghi không phải khối { … }. Cách sửa: kiểm tra dấu ngoặc và dấu phẩy quanh bản ghi này.");
      return;
    }
    const startErrors = issues.filter((i) => i.level === "LOI").length;

    for (const k of Object.keys(item)) {
      if (!KNOWN_KEYS.has(k))
        warn("BOOKS_003", `Trường "${k}" không được hệ thống sử dụng (có thể gõ sai tên). Cách sửa: đối chiếu tên trường với file docs/HUONG-DAN-THEM-SACH.md.`);
    }

    for (const f of ["id", "slug", "title", "author", "description"] as const) {
      if (!isStr(item[f]))
        err("BOOKS_010", `Thiếu trường bắt buộc "${f}". Cách sửa: điền nội dung cho "${f}".`);
    }
    if (isStr(item.slug) && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(item.slug))
      err("BOOKS_011", `slug "${item.slug}" chỉ được gồm chữ thường không dấu, số và dấu gạch ngang (ví dụ: de-men-phieu-luu-ky).`);
    if (isStr(item.id)) {
      if (seenId.has(item.id)) err("BOOKS_012", `id "${item.id}" bị trùng. Cách sửa: mỗi sách một id riêng.`);
      seenId.add(item.id);
    }
    if (isStr(item.slug)) {
      if (seenSlug.has(item.slug)) err("BOOKS_013", `slug "${item.slug}" bị trùng. Cách sửa: mỗi sách một slug riêng.`);
      seenSlug.add(item.slug);
    }

    const gr = item.gradeRange;
    if (!isObj(gr) || ![1, 2, 3, 4, 5].includes(gr.min as number) || ![1, 2, 3, 4, 5].includes(gr.max as number) || (gr.min as number) > (gr.max as number))
      err("BOOKS_020", 'gradeRange phải có dạng { "min": 1, "max": 3 } với lớp từ 1 đến 5 và min ≤ max. Đây là điều kiện để lọc sách theo độ tuổi nên bắt buộc.');
    if (![1, 2, 3, 4].includes(item.readingLevel as number))
      err("BOOKS_021", "readingLevel phải là 1, 2, 3 hoặc 4 (1 = mới tập đọc … 4 = sách dài, nhiều nội dung).");

    if (!Array.isArray(item.genres) || item.genres.length === 0 || !item.genres.every((g) => GENRE_IDS.has(g as string)))
      err("BOOKS_022", `genres phải là danh sách có ít nhất 1 mã hợp lệ: ${[...GENRE_IDS].join(", ")}. Phần tử đầu tiên là thể loại chính.`);
    if (!Array.isArray(item.interests) || !item.interests.every((g) => INTEREST_IDS.has(g as string)))
      err("BOOKS_023", `interests chứa mã không hợp lệ. Mã hợp lệ: ${[...INTEREST_IDS].join(", ")}.`);
    if (!Array.isArray(item.goals) || !item.goals.every((g) => GOAL_IDS.has(g as string)))
      err("BOOKS_024", `goals chứa mã không hợp lệ. Mã hợp lệ: ${[...GOAL_IDS].join(", ")}.`);
    if (!FORMAT_IDS.has(item.format as string))
      err("BOOKS_025", `format không hợp lệ. Mã hợp lệ: ${[...FORMAT_IDS].join(", ")}.`);
    if (!LANG_IDS.has(item.language as string))
      err("BOOKS_026", `language không hợp lệ. Mã hợp lệ: ${[...LANG_IDS].join(", ")}.`);
    if (!["verified", "incomplete", "demo"].includes(item.dataStatus as string))
      err("BOOKS_027", 'dataStatus phải là "verified" (đã xác minh), "incomplete" (còn thiếu) hoặc "demo" (minh hoạ).');

    if (item.dataStatus === "verified" && !isHttps(item.sourceUrl))
      err("BOOKS_030", 'Sách ghi dataStatus "verified" nhưng thiếu sourceUrl (đường dẫn https tới trang nguồn). Cách sửa: thêm sourceUrl hoặc đổi dataStatus thành "incomplete".');
    if (item.coverUrl !== undefined && !(isHttps(item.coverUrl) || (isStr(item.coverUrl) && /^\/covers\/[\w.\-]+$/.test(item.coverUrl))))
      err("BOOKS_031", 'coverUrl phải bắt đầu bằng https:// hoặc /covers/ (ví dụ: "/covers/ten-sach.jpg").');
    if (item.price !== undefined) {
      if (typeof item.price !== "number" || item.price <= 0)
        err("BOOKS_032", "price phải là số dương (VNĐ), ví dụ 85000.");
      if (!isDate(item.priceUpdatedAt) || !isStr(item.priceSource))
        err("BOOKS_033", "Có price thì bắt buộc có priceUpdatedAt (dd/mm/yyyy) và priceSource (nguồn giá). Nếu chưa xác minh, hãy xoá price.");
    }
    if (item.retailerLinks !== undefined) {
      if (!Array.isArray(item.retailerLinks)) err("BOOKS_034", "retailerLinks phải là danh sách.");
      else
        item.retailerLinks.forEach((l) => {
          if (!isObj(l) || !isHttps(l.url) || !["FAHASA", "Kim Đồng", "Phương Nam", "Khác"].includes(l.retailer as string))
            err("BOOKS_035", 'Mỗi retailerLinks cần "retailer" (FAHASA, Kim Đồng, Phương Nam hoặc Khác) và "url" bắt đầu bằng https://.');
          else if (l.retailer === "Khác" && !isStr(l.label))
            err("BOOKS_036", 'Nhà sách "Khác" cần thêm trường "label" là tên nhà sách.');
        });
    }
    if (item.isbn !== undefined && item.dataStatus !== "verified")
      warn("BOOKS_040", "Có ISBN nhưng sách chưa ở trạng thái verified nên website sẽ không hiển thị ISBN.");
    if (item.estimatedReadingTime !== undefined) {
      const t = item.estimatedReadingTime;
      if (!isObj(t) || typeof t.minMinutes !== "number" || typeof t.maxMinutes !== "number" || t.minMinutes <= 0 || t.minMinutes > t.maxMinutes)
        err("BOOKS_041", "estimatedReadingTime phải có dạng { \"minMinutes\": 20, \"maxMinutes\": 40 }, trong đó minMinutes ≤ maxMinutes.");
    }
    if (item.dataStatus === "demo")
      warn("BOOKS_050", "Đây là bản ghi minh hoạ (demo). Website sẽ gắn nhãn 'Dữ liệu minh hoạ'. Hãy xoá trước khi công khai.");

    const hasNewError = issues.filter((i) => i.level === "LOI").length > startErrors;
    if (!hasNewError) books.push(item as unknown as Book);
  });

  return { books, issues };
}
