import type { Book, Genre } from "@/types/book";
import type {
  Budget,
  Grade,
  Interest,
  Language,
  ReadingGoal,
  ReadingLevel,
} from "@/types/survey";
import type { Theme } from "./taxonomy";
import { hasVerifiedPrice, normalizeText, priceInBudget } from "./matching-utils";
import { GENRE_LABEL, INTEREST_LABEL } from "./taxonomy";

export interface CatalogFilters {
  q?: string;
  grade?: Grade;
  genre?: Genre;
  level?: ReadingLevel;
  language?: Language;
  price?: Budget;
  theme?: Theme;
}

export const searchHaystack = (b: Book) =>
  normalizeText(
    [
      b.title,
      b.author,
      b.publisher ?? "",
      ...b.genres.map((g) => GENRE_LABEL[g]),
      ...b.interests.map((i) => INTEREST_LABEL[i]),
    ].join(" ")
  );

export function filterBooks(list: Book[], f: CatalogFilters): Book[] {
  const q = f.q ? normalizeText(f.q) : "";
  return list.filter((b) => {
    if (q && !searchHaystack(b).includes(q)) return false;
    if (f.grade && !(f.grade >= b.gradeRange.min && f.grade <= b.gradeRange.max)) return false;
    if (f.genre && !b.genres.includes(f.genre)) return false;
    if (f.level && b.readingLevel !== f.level) return false;
    if (f.language && b.language !== f.language) return false;
    if (f.price && f.price !== "khong-gioi-han") {
      if (!hasVerifiedPrice(b) || !priceInBudget(b.price, f.price)) return false;
    }
    if (f.theme) {
      const byInterest = f.theme.interests?.some((i) => b.interests.includes(i)) ?? false;
      const byGoal = f.theme.goals?.some((g) => b.goals.includes(g)) ?? false;
      if (!byInterest && !byGoal) return false;
    }
    return true;
  });
}

/** Sách tương tự: trùng chủ đề/thể loại, mức đọc gần nhau, chung khoảng lớp. */
export function similarBooks(book: Book, all: Book[], limit = 4): Book[] {
  const score = (o: Book) => {
    const sharedInterests = o.interests.filter((i: Interest) => book.interests.includes(i)).length;
    const sharedGenres = o.genres.filter((g) => book.genres.includes(g)).length;
    const sharedGoals = o.goals.filter((g: ReadingGoal) => book.goals.includes(g)).length;
    const levelClose = Math.abs(o.readingLevel - book.readingLevel) <= 1 ? 1 : 0;
    const gradeOverlap =
      Math.min(o.gradeRange.max, book.gradeRange.max) >= Math.max(o.gradeRange.min, book.gradeRange.min) ? 1 : 0;
    const topical = sharedInterests * 3 + sharedGenres * 1.5 + sharedGoals * 0.5;
    return topical > 0 ? topical + levelClose + gradeOverlap : 0;
  };
  return all
    .filter((o) => o.id !== book.id)
    .map((o) => ({ o, s: score(o) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || a.o.title.localeCompare(b.o.title, "vi"))
    .slice(0, limit)
    .map((x) => x.o);
}
