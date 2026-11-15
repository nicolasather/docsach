import type { Book } from "@/types/book";
import type {
  Budget,
  Duration,
  Interest,
  Language,
  ReadingFormat,
} from "@/types/survey";

/** Trọng số theo đặc tả (tổng = 100). Ngôn ngữ 3 + ngân sách 2 = 5. */
export const WEIGHTS = {
  interests: 30,
  ability: 25,
  format: 15,
  goals: 15,
  duration: 10,
  language: 3,
  budget: 2,
} as const;

export type Criterion = keyof typeof WEIGHTS;

/** Chủ đề gần nhau: nhận 40% điểm nếu sách không trùng đúng chủ đề bé chọn. */
const RELATED: [Interest, Interest][] = [
  ["khoa-hoc", "thien-nhien"],
  ["khoa-hoc", "cong-nghe"],
  ["dong-vat", "thien-nhien"],
  ["phieu-luu", "kham-pha-the-gioi"],
  ["phieu-luu", "fantasy"],
  ["phieu-luu", "bi-an-giai-do"],
  ["lich-su", "kham-pha-the-gioi"],
  ["nghe-thuat", "fantasy"],
];

export const areRelated = (a: Interest, b: Interest) =>
  RELATED.some(([x, y]) => (x === a && y === b) || (x === b && y === a));

/** Điểm khớp chủ đề: 1 nếu trùng, 0.4 nếu liên quan, 0 nếu không. */
export function interestMatch(
  wanted: Interest,
  bookInterests: Interest[]
): { score: number; via?: Interest } {
  if (bookInterests.includes(wanted)) return { score: 1, via: wanted };
  const related = bookInterests.find((i) => areRelated(wanted, i));
  return related ? { score: 0.4, via: related } : { score: 0 };
}

/**
 * Mức đọc: bằng nhau = 1; sách dễ hơn 1 bậc = 0.65 (thoải mái);
 * khó hơn 1 bậc = 0.5 (thử thách vừa phải); lệch 2 bậc: dễ hơn 0.3, khó hơn 0.
 */
export function abilityScore(childLevel: number, bookLevel: number): number {
  const diff = bookLevel - childLevel;
  if (diff === 0) return 1;
  if (diff === -1) return 0.65;
  if (diff === 1) return 0.5;
  if (diff === -2) return 0.3;
  return 0;
}

/** Độ gần giữa các kiểu sách (đối xứng). Cùng kiểu = 1. */
const FORMAT_NEAR: Record<string, number> = {
  "nhieu-tranh|can-bang": 0.55,
  "can-bang|chu-va-truyen": 0.55,
  "chu-va-truyen|nhieu-nhan-vat": 0.75,
  "can-bang|nhieu-nhan-vat": 0.4,
  "can-bang|kien-thuc-hinh-anh": 0.5,
  "nhieu-tranh|kien-thuc-hinh-anh": 0.4,
  "chu-va-truyen|kien-thuc-hinh-anh": 0.2,
  "nhieu-tranh|chu-va-truyen": 0.1,
};

export function formatScore(a: ReadingFormat, b: ReadingFormat): number {
  if (a === b) return 1;
  return FORMAT_NEAR[`${a}|${b}`] ?? FORMAT_NEAR[`${b}|${a}`] ?? 0;
}

/** Khoảng tổng thời gian đọc hết sách (phút) được coi là hợp lý theo thời lượng mỗi lần đọc. */
const DURATION_IDEAL: Record<Duration, [number, number]> = {
  "5-10": [3, 30],
  "10-20": [15, 90],
  "20+": [45, 600],
};

export function durationScore(
  wanted: Duration,
  time: NonNullable<Book["estimatedReadingTime"]>
): number {
  const [lo, hi] = DURATION_IDEAL[wanted];
  const v = (time.minMinutes + time.maxMinutes) / 2;
  if (v >= lo && v <= hi) return 1;
  if (v < lo) return Math.max(0.2, v / lo);
  return Math.max(0.2, hi / v);
}

export function languageScore(wanted: Language, book: Language): number {
  if (wanted === book) return 1;
  if (book === "song-ngu") return 0.7; // sách song ngữ vẫn đọc được cả hai thứ tiếng
  return 0;
}

const BUDGET_RANGE: Record<Budget, [number, number]> = {
  "duoi-100": [0, 100_000],
  "100-200": [100_000, 200_000],
  "tren-200": [200_000, Infinity],
  "khong-gioi-han": [0, Infinity],
};

export const priceInBudget = (price: number, b: Budget) => {
  const [lo, hi] = BUDGET_RANGE[b];
  return price >= lo && price <= hi;
};

export function budgetScore(wanted: Budget, price: number): number {
  const [lo, hi] = BUDGET_RANGE[wanted];
  if (price >= lo && price <= hi) return 1;
  const gap = price < lo ? (lo - price) / lo : (price - hi) / hi;
  return gap <= 0.25 ? 0.4 : 0;
}

/** Giá chỉ được dùng/hiển thị khi đủ cả nguồn lẫn ngày cập nhật. */
export const hasVerifiedPrice = (b: Book): b is Book & {
  price: number;
  priceUpdatedAt: string;
  priceSource: string;
} =>
  typeof b.price === "number" &&
  !!b.priceUpdatedAt &&
  !!b.priceSource;

/** So khớp văn bản không phân biệt dấu/hoa thường (cho ô tìm kiếm). */
export const normalizeText = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();

export const formatVnd = (n: number) =>
  `${new Intl.NumberFormat("vi-VN").format(n)}đ`;

export const formatMinutes = (t: { minMinutes: number; maxMinutes: number }) => {
  const fmt = (m: number) =>
    m >= 60 ? `${Math.floor(m / 60)} giờ${m % 60 ? ` ${m % 60} phút` : ""}` : `${m} phút`;
  return t.minMinutes === t.maxMinutes
    ? fmt(t.minMinutes)
    : `${fmt(t.minMinutes)} – ${fmt(t.maxMinutes)}`;
};
