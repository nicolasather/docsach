import type { Book } from "@/types/book";
import type { Grade, SurveyAnswers } from "@/types/survey";
import {
  FORMAT_SHORT,
  GOAL_SHORT,
  INTEREST_LABEL,
  LEVEL_SHORT,
  gradeText,
} from "./taxonomy";
import {
  WEIGHTS,
  abilityScore,
  budgetScore,
  durationScore,
  formatScore,
  hasVerifiedPrice,
  interestMatch,
  languageScore,
  type Criterion,
} from "./matching-utils";

/**
 * BỘ MÁY GỢI Ý (luật cố định, minh bạch, không dùng AI/ngẫu nhiên)
 * 1) Loại sách ngoài khoảng lớp của bé (điều kiện bắt buộc).
 * 2) Chấm từng tiêu chí 0–1 rồi nhân trọng số.
 * 3) Tiêu chí bé bỏ qua hoặc sách chưa có dữ liệu thì bỏ khỏi phép tính
 *    (không phạt, không thưởng) và chia lại theo tổng trọng số còn lại.
 * 4) Sinh lý do từ chính các thuộc tính đã khớp.
 */

export type MatchBand = "rat-hop" | "kha-hop" | "co-the-thu";

export interface ScoredBook {
  book: Book;
  /** 0–1, chỉ dùng nội bộ để xếp hạng — không hiển thị cho người dùng. */
  score: number;
  band: MatchBand;
  reasons: string[];
  breakdown: Partial<Record<Criterion, number>>;
  /** Số chủ đề bé chọn mà sách khớp đúng. */
  exactInterestMatches: number;
  /** Sách có chủ đề nằm ngoài (và không liên quan) các chủ đề bé chọn. */
  isOutsideInterests: boolean;
}

export interface RecommendationResult {
  eligibleCount: number;
  totalCount: number;
  best: ScoredBook[];
  expand: ScoredBook[];
  together: ScoredBook[];
}

export const LIMITS = { best: 6, expand: 3, together: 3 } as const;
/** Dưới ngưỡng này thì không đưa vào nhóm "phù hợp nhất". */
const MIN_BEST_SCORE = 0.3;

export const isEligible = (book: Book, grade: Grade) =>
  grade >= book.gradeRange.min && grade <= book.gradeRange.max;

export function bandOf(score: number): MatchBand {
  if (score >= 0.75) return "rat-hop";
  if (score >= 0.55) return "kha-hop";
  return "co-the-thu";
}

export const BAND_LABEL: Record<MatchBand, string> = {
  "rat-hop": "Rất hợp với bé",
  "kha-hop": "Khá hợp với bé",
  "co-the-thu": "Có thể thử",
};

export function scoreBook(book: Book, a: SurveyAnswers): ScoredBook {
  const parts: { c: Criterion; value: number }[] = [];
  const reasonByCriterion: Partial<Record<Criterion, string>> = {};

  // 1) Chủ đề
  let exact = 0;
  if (a.interests.length > 0) {
    const matches = a.interests.map((i) => ({ i, m: interestMatch(i, book.interests) }));
    const total = matches.reduce((s, x) => s + x.m.score, 0);
    const denom = Math.min(a.interests.length, 2);
    parts.push({ c: "interests", value: Math.min(1, total / denom) });
    const exactList = matches.filter((x) => x.m.score === 1).map((x) => INTEREST_LABEL[x.i]);
    exact = exactList.length;
    const nearList = matches.filter((x) => x.m.score === 0.4);
    if (exactList.length > 0) {
      reasonByCriterion.interests = `Cùng chủ đề bé yêu thích: ${exactList.join(", ")}.`;
    } else if (nearList.length > 0) {
      const x = nearList[0];
      reasonByCriterion.interests = `Gần với chủ đề ${INTEREST_LABEL[x.i]} mà bé thích (sách nói về ${INTEREST_LABEL[x.m.via!].toLowerCase()}).`;
    }
  }

  // 2) Khả năng đọc
  if (a.readingLevel) {
    const s = abilityScore(a.readingLevel, book.readingLevel);
    parts.push({ c: "ability", value: s });
    if (s === 1) reasonByCriterion.ability = `Đúng mức đọc hiện tại của bé (${LEVEL_SHORT[book.readingLevel].toLowerCase()}).`;
    else if (book.readingLevel < a.readingLevel && s >= 0.65) reasonByCriterion.ability = "Hơi dễ hơn mức đọc hiện tại nên bé đọc thoải mái, dễ có cảm giác thành công.";
    else if (book.readingLevel > a.readingLevel && s >= 0.5) reasonByCriterion.ability = "Hơi thử thách hơn mức hiện tại, phù hợp để bé tiến thêm một bước.";
  }

  // 3) Kiểu sách
  if (a.format) {
    const s = formatScore(a.format, book.format);
    parts.push({ c: "format", value: s });
    if (s === 1) reasonByCriterion.format = `Đúng kiểu bé thích đọc: ${FORMAT_SHORT[book.format].toLowerCase()}.`;
    else if (s >= 0.55) reasonByCriterion.format = `Kiểu sách gần với sở thích của bé (${FORMAT_SHORT[book.format].toLowerCase()}).`;
  }

  // 4) Mục tiêu
  if (a.goals.length > 0) {
    const hit = a.goals.filter((g) => book.goals.includes(g));
    parts.push({ c: "goals", value: Math.min(1, hit.length / Math.min(a.goals.length, 2)) });
    if (hit.length > 0)
      reasonByCriterion.goals = `Hỗ trợ mục tiêu của gia đình: ${hit.map((g) => GOAL_SHORT[g]).join(", ")}.`;
  }

  // 5) Thời lượng (chỉ khi sách có dữ liệu)
  if (a.duration && book.estimatedReadingTime) {
    const s = durationScore(a.duration, book.estimatedReadingTime);
    parts.push({ c: "duration", value: s });
    if (s === 1) reasonByCriterion.duration = "Độ dài hợp với thời gian bé thường dành để đọc mỗi lần.";
  }

  // 6) Ngôn ngữ, ngân sách (tuỳ chọn)
  if (a.language) {
    const s = languageScore(a.language, book.language);
    parts.push({ c: "language", value: s });
    if (s === 1 && a.language !== "vi") reasonByCriterion.language = "Đúng ngôn ngữ gia đình mong muốn.";
    if (s === 0.7) reasonByCriterion.language = "Sách song ngữ, bé đọc được cả hai thứ tiếng.";
  }
  if (a.budget && a.budget !== "khong-gioi-han" && hasVerifiedPrice(book)) {
    const s = budgetScore(a.budget, book.price);
    parts.push({ c: "budget", value: s });
  }

  const totalWeight = parts.reduce((s, p) => s + WEIGHTS[p.c], 0);
  const score =
    totalWeight === 0
      ? 0
      : parts.reduce((s, p) => s + p.value * WEIGHTS[p.c], 0) / totalWeight;

  const breakdown: Partial<Record<Criterion, number>> = {};
  for (const p of parts) breakdown[p.c] = p.value;

  // Lý do: ưu tiên theo mức đóng góp (trọng số × điểm), tối đa 4 lý do
  const reasons: string[] = [];
  if (a.grade) reasons.push(`Phù hợp với bé học lớp ${a.grade} (sách dành cho ${gradeText(book.gradeRange.min, book.gradeRange.max).toLowerCase()}).`);
  const ranked = (Object.keys(reasonByCriterion) as Criterion[]).sort(
    (x, y) => WEIGHTS[y] * (breakdown[y] ?? 0) - WEIGHTS[x] * (breakdown[x] ?? 0)
  );
  for (const c of ranked) reasons.push(reasonByCriterion[c]!);

  const isOutside =
    a.interests.length > 0 &&
    a.interests.every((i) => interestMatch(i, book.interests).score === 0);

  return {
    book,
    score,
    band: bandOf(score),
    reasons: reasons.slice(0, 4),
    breakdown,
    exactInterestMatches: exact,
    isOutsideInterests: isOutside,
  };
}

const byScore = (x: ScoredBook, y: ScoredBook) =>
  y.score - x.score || x.book.title.localeCompare(y.book.title, "vi");

export function recommend(catalog: Book[], a: SurveyAnswers): RecommendationResult {
  if (!a.grade) {
    return { eligibleCount: 0, totalCount: catalog.length, best: [], expand: [], together: [] };
  }
  const eligible = catalog.filter((b) => isEligible(b, a.grade!));
  const scored = eligible.map((b) => scoreBook(b, a)).sort(byScore);
  const used = new Set<string>();

  // A. Phù hợp nhất
  const best = scored.filter((s) => s.score >= MIN_BEST_SCORE).slice(0, LIMITS.best);
  best.forEach((s) => used.add(s.book.id));

  // C. Đọc cùng bố mẹ: sách được đánh dấu đọc chung, hoặc khó hơn mức đọc của bé 1 bậc trở lên
  const togetherPool = scored
    .filter((s) => !used.has(s.book.id))
    .filter(
      (s) =>
        s.book.sharedReading === true ||
        (a.readingLevel !== null && s.book.readingLevel > a.readingLevel)
    )
    .map((s) => {
      const extra =
        s.book.sharedReading === true
          ? "Phù hợp để bố mẹ và bé cùng đọc, cùng trò chuyện sau mỗi chương."
          : "Cuốn này vượt mức đọc hiện tại của bé một chút, nên rất hợp để bố mẹ đọc cùng và giải thích thêm.";
      return { ...s, reasons: [...s.reasons.slice(0, 3), extra] };
    })
    // sách đọc chung có chủ đích được ưu tiên, sau đó mới tới điểm
    .sort(
      (x, y) =>
        Number(y.book.sharedReading === true) - Number(x.book.sharedReading === true) ||
        byScore(x, y)
    )
    .slice(0, LIMITS.together);
  togetherPool.forEach((s) => used.add(s.book.id));

  // B. Mở rộng thế giới: ngoài chủ đề bé chọn, nhưng vẫn vừa sức và hợp mục tiêu
  const seenGenres = new Set<string>();
  const expand: ScoredBook[] = [];
  const expandPool = scored
    .filter((s) => !used.has(s.book.id) && s.isOutsideInterests && (s.breakdown.ability ?? 0) >= 0.5)
    .sort((x, y) => {
      const fx = (x.breakdown.goals ?? 0) * 0.4 + (x.breakdown.ability ?? 0) * 0.4 + (x.breakdown.format ?? 0) * 0.2;
      const fy = (y.breakdown.goals ?? 0) * 0.4 + (y.breakdown.ability ?? 0) * 0.4 + (y.breakdown.format ?? 0) * 0.2;
      return fy - fx || byScore(x, y);
    });
  for (const s of expandPool) {
    const main = s.book.genres[0];
    if (seenGenres.has(main) && expandPool.length > LIMITS.expand * 2) continue; // ưu tiên đa dạng thể loại
    seenGenres.add(main);
    const topic = s.book.interests.length
      ? s.book.interests.map((i) => INTEREST_LABEL[i]).slice(0, 2).join(", ")
      : "một chủ đề mới";
    expand.push({
      ...s,
      reasons: [
        `Một chủ đề mới để bé làm quen: ${topic}.`,
        ...s.reasons.filter((r) => !r.startsWith("Cùng chủ đề") && !r.startsWith("Gần với chủ đề")).slice(0, 3),
      ],
    });
    if (expand.length >= LIMITS.expand) break;
  }

  return {
    eligibleCount: eligible.length,
    totalCount: catalog.length,
    best,
    expand,
    together: togetherPool,
  };
}
