/**
 * Kiểm thử bộ máy gợi ý, bộ lọc và bộ kiểm tra dữ liệu.
 * Sách dưới đây là DỮ LIỆU THỬ chỉ dùng trong file này, không đi vào website.
 */
import assert from "node:assert/strict";
import type { Book } from "../types/book";
import { EMPTY_ANSWERS, type SurveyAnswers } from "../types/survey";
import { recommend, scoreBook, isEligible } from "../lib/recommendation-engine";
import { filterBooks, similarBooks } from "../lib/catalog";
import { validateBooks } from "../lib/validate-books";
import { normalizeText } from "../lib/matching-utils";
import { THEMES } from "../lib/taxonomy";

let passed = 0;
const test = (name: string, fn: () => void) => {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (e) {
    console.error(`  ✗ ${name}\n    ${(e as Error).message}`);
    process.exitCode = 1;
  }
};

const mk = (o: Partial<Book> & Pick<Book, "id" | "title">): Book => ({
  slug: o.id,
  author: "Tác giả thử",
  gradeRange: { min: 1, max: 5 },
  readingLevel: 2,
  genres: ["truyen-ngan"],
  interests: [],
  goals: [],
  format: "can-bang",
  language: "vi",
  description: "Mô tả thử",
  dataStatus: "demo",
  ...o,
});

const catalog: Book[] = [
  mk({ id: "dv-l2", title: "Dế thử", gradeRange: { min: 1, max: 3 }, readingLevel: 2, interests: ["dong-vat", "phieu-luu"], goals: ["giai-tri", "thoi-quen"], format: "can-bang", estimatedReadingTime: { minMinutes: 20, maxMinutes: 40 } }),
  mk({ id: "dv-l4", title: "Voi thử", gradeRange: { min: 4, max: 5 }, readingLevel: 4, interests: ["dong-vat"], format: "chu-va-truyen" }),
  mk({ id: "kh-l3", title: "Vũ trụ thử", gradeRange: { min: 2, max: 5 }, readingLevel: 3, genres: ["sach-khoa-hoc"], interests: ["khoa-hoc"], goals: ["kien-thuc"], format: "kien-thuc-hinh-anh" }),
  mk({ id: "ls-l3", title: "Sử thử", gradeRange: { min: 3, max: 5 }, readingLevel: 3, genres: ["sach-lich-su-dia-ly"], interests: ["lich-su"], goals: ["kien-thuc"], sharedReading: true }),
  mk({ id: "ng-l1", title: "Tranh thử", gradeRange: { min: 1, max: 2 }, readingLevel: 1, genres: ["sach-tranh"], interests: ["nghe-thuat"], goals: ["thoi-quen"], format: "nhieu-tranh" }),
  mk({ id: "en-l2", title: "English thử", gradeRange: { min: 1, max: 4 }, readingLevel: 2, language: "en", interests: ["dong-vat"], price: 90000, priceUpdatedAt: "01/01/2026", priceSource: "Nguồn thử" }),
  mk({ id: "bil", title: "Song ngữ thử", gradeRange: { min: 1, max: 4 }, readingLevel: 2, language: "song-ngu", interests: ["dong-vat"], price: 250000 }), // giá thiếu nguồn
];

const base: SurveyAnswers = {
  ...EMPTY_ANSWERS,
  grade: 2,
  readingLevel: 2,
  interests: ["dong-vat", "phieu-luu"],
  format: "can-bang",
  goals: ["giai-tri"],
  duration: "10-20",
};

console.log("Điều kiện lớp");
test("loại sách ngoài khoảng lớp", () => {
  assert.equal(isEligible(catalog[1], 2), false);
  const r = recommend(catalog, base);
  const all = [...r.best, ...r.expand, ...r.together].map((s) => s.book.id);
  assert.ok(!all.includes("dv-l4"), "Voi thử (lớp 4–5) không được xuất hiện cho lớp 2");
  assert.ok(!all.includes("ls-l3"), "Sử thử (lớp 3–5) không được xuất hiện cho lớp 2");
});
test("không có lớp thì không gợi ý", () => {
  const r = recommend(catalog, { ...base, grade: null });
  assert.equal(r.best.length + r.expand.length + r.together.length, 0);
});

console.log("Xếp hạng");
test("sách trùng chủ đề + đúng mức đọc xếp trên sách không liên quan", () => {
  const r = recommend(catalog, base);
  assert.equal(r.best[0].book.id, "dv-l2");
  const kh = r.best.findIndex((s) => s.book.id === "kh-l3");
  assert.ok(kh === -1 || kh > 0);
});
test("điểm sắp xếp giảm dần", () => {
  const r = recommend(catalog, base);
  for (let i = 1; i < r.best.length; i++) assert.ok(r.best[i - 1].score >= r.best[i].score);
});
test("điểm nằm trong 0–1", () => {
  for (const b of catalog.filter((x) => isEligible(x, 2))) {
    const s = scoreBook(b, base).score;
    assert.ok(s >= 0 && s <= 1, `${b.id}: ${s}`);
  }
});
test("sách cùng mức đọc điểm cao hơn sách lệch 2 bậc", () => {
  const a = scoreBook(mk({ id: "a", title: "a", readingLevel: 2, interests: ["dong-vat"] }), { ...base, interests: ["dong-vat"] });
  const b = scoreBook(mk({ id: "b", title: "b", readingLevel: 4, interests: ["dong-vat"] }), { ...base, interests: ["dong-vat"] });
  assert.ok(a.score > b.score);
});
test("tiêu chí bỏ qua không phạt điểm (ngôn ngữ/ngân sách trống)", () => {
  const withOut = scoreBook(catalog[0], base).score;
  const withLang = scoreBook(catalog[0], { ...base, language: "vi" }).score;
  assert.ok(Math.abs(withOut - withLang) < 0.05);
});
test("ngôn ngữ tiếng Anh: sách tiếng Anh điểm cao hơn sách tiếng Việt khi mọi thứ khác bằng nhau", () => {
  const vi = mk({ id: "t-vi", title: "vi", interests: ["dong-vat"], language: "vi" });
  const en = mk({ id: "t-en", title: "en", interests: ["dong-vat"], language: "en" });
  const a = { ...base, language: "en" as const, interests: ["dong-vat"] as SurveyAnswers["interests"] };
  assert.ok(scoreBook(en, a).score > scoreBook(vi, a).score);
});
test("ngân sách chỉ dùng giá có nguồn: sách giá thiếu nguồn không bị tính", () => {
  const a = { ...base, budget: "duoi-100" as const };
  assert.equal(scoreBook(catalog[6], a).breakdown.budget, undefined);
  assert.equal(scoreBook(catalog[5], a).breakdown.budget, 1);
});

console.log("Lý do gợi ý");
test("lý do chỉ nêu chủ đề thật sự trùng", () => {
  const s = scoreBook(catalog[0], base);
  const line = s.reasons.find((r) => r.startsWith("Cùng chủ đề"));
  assert.ok(line?.includes("Động vật") && line.includes("Phiêu lưu"));
  const s2 = scoreBook(catalog[2], base);
  assert.ok(!s2.reasons.some((r) => r.includes("Động vật")));
});
test("không hiển thị phần trăm/điểm số trong lý do", () => {
  for (const b of catalog.filter((x) => isEligible(x, 2)))
    for (const r of scoreBook(b, base).reasons) assert.ok(!/%|\d+\.\d+/.test(r), r);
});
test("có đúng tối đa 4 lý do", () => {
  for (const b of catalog) assert.ok(scoreBook(b, base).reasons.length <= 4);
});

console.log("Ba nhóm kết quả");
test("không trùng sách giữa các nhóm", () => {
  const r = recommend(catalog, { ...base, grade: 3 });
  const ids = [...r.best, ...r.expand, ...r.together].map((s) => s.book.id);
  assert.equal(new Set(ids).size, ids.length);
});
test("nhóm Mở rộng: chủ đề ngoài sở thích", () => {
  const r = recommend(catalog, { ...base, grade: 3, interests: ["dong-vat"], readingLevel: 3 });
  for (const s of r.expand) assert.ok(!s.book.interests.includes("dong-vat"));
});
test("nhóm Đọc cùng bố mẹ: đánh dấu đọc chung hoặc khó hơn mức đọc", () => {
  const r = recommend(catalog, { ...base, grade: 3, readingLevel: 2 });
  for (const s of r.together) assert.ok(s.book.sharedReading === true || s.book.readingLevel > 2);
});
test("danh mục rỗng không lỗi", () => {
  const r = recommend([], base);
  assert.equal(r.totalCount, 0);
  assert.equal(r.best.length, 0);
});

console.log("Tìm kiếm và bộ lọc");
test("tìm không phân biệt dấu", () => {
  assert.equal(normalizeText("Đàn Voi"), "dan voi");
  assert.equal(filterBooks(catalog, { q: "vu tru" }).length, 1);
  assert.equal(filterBooks(catalog, { q: "VŨ TRỤ" }).length, 1);
});
test("lọc theo lớp / mức đọc / ngôn ngữ", () => {
  assert.ok(filterBooks(catalog, { grade: 5 }).every((b) => b.gradeRange.max >= 5));
  assert.ok(filterBooks(catalog, { level: 1 }).every((b) => b.readingLevel === 1));
  assert.deepEqual(filterBooks(catalog, { language: "en" }).map((b) => b.id), ["en-l2"]);
});
test("lọc giá loại sách không có giá xác minh", () => {
  assert.deepEqual(filterBooks(catalog, { price: "duoi-100" }).map((b) => b.id), ["en-l2"]);
});
test("lọc theo chủ đề trang chủ", () => {
  const t = THEMES.find((x) => x.id === "dong-vat")!;
  assert.ok(filterBooks(catalog, { theme: t }).every((b) => b.interests.includes("dong-vat")));
});
test("sách tương tự không chứa chính nó và có chủ đề chung", () => {
  const s = similarBooks(catalog[0], catalog);
  assert.ok(s.length > 0 && s.every((b) => b.id !== "dv-l2"));
});

console.log("Kiểm tra dữ liệu sách");
test("danh sách rỗng hợp lệ", () => {
  const r = validateBooks([]);
  assert.equal(r.books.length, 0);
  assert.equal(r.issues.length, 0);
});
test("bản ghi thiếu lớp bị loại, có hướng dẫn tiếng Việt", () => {
  const bad = { ...mk({ id: "x", title: "Hỏng" }), gradeRange: undefined };
  const r = validateBooks([bad]);
  assert.equal(r.books.length, 0);
  assert.ok(r.issues.some((i) => i.code === "BOOKS_020"));
});
test("verified thiếu sourceUrl bị loại", () => {
  const r = validateBooks([mk({ id: "v", title: "V", dataStatus: "verified" })]);
  assert.equal(r.books.length, 0);
});
test("giá thiếu nguồn bị loại", () => {
  const r = validateBooks([mk({ id: "p", title: "P", price: 10000 })]);
  assert.equal(r.books.length, 0);
});
test("trùng slug bị báo", () => {
  const r = validateBooks([mk({ id: "a", title: "A", slug: "s" }), mk({ id: "b", title: "B", slug: "s" })]);
  assert.equal(r.books.length, 1);
});
test("link nhà sách không https bị loại", () => {
  const r = validateBooks([mk({ id: "l", title: "L", retailerLinks: [{ retailer: "FAHASA", url: "http://x.vn" }] })]);
  assert.equal(r.books.length, 0);
});
test("bản ghi đủ thông tin hợp lệ", () => {
  const r = validateBooks([mk({ id: "ok", title: "OK" })]);
  assert.equal(r.books.length, 1);
});
test("không phải mảng", () => {
  assert.equal(validateBooks({}).issues[0].code, "BOOKS_001");
});

console.log(`\n${passed} kiểm thử đạt${process.exitCode ? ", CÓ KIỂM THỬ LỖI" : ""}.`);
