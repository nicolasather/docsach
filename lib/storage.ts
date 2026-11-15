"use client";

import { useCallback, useSyncExternalStore } from "react";
import { EMPTY_ANSWERS, type SurveyAnswers } from "@/types/survey";

/**
 * Lưu trữ phía trình duyệt, không gửi đi đâu.
 * - Câu trả lời khảo sát: sessionStorage (mất khi đóng tab) – đúng nguyên tắc ẩn danh, tạm thời.
 * - Danh sách sách đã lưu: localStorage (chỉ chứa mã sách, không chứa thông tin của bé).
 */
const SURVEY_KEY = "mamdoc.survey.v1";
const WISHLIST_KEY = "mamdoc.wishlist.v1";
const EVENT = "mamdoc:storage";

type Area = "session" | "local";
const area = (a: Area) => (a === "session" ? window.sessionStorage : window.localStorage);

function readRaw(a: Area, key: string): string | null {
  try {
    return area(a).getItem(key);
  } catch {
    return null; // chế độ riêng tư/chặn lưu trữ: coi như chưa có dữ liệu
  }
}
function writeRaw(a: Area, key: string, value: string | null) {
  try {
    if (value === null) area(a).removeItem(key);
    else area(a).setItem(key, value);
  } catch {
    /* trình duyệt chặn lưu trữ: bỏ qua, ứng dụng vẫn chạy */
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/* ---------------- Khảo sát ---------------- */

const parseAnswers = (raw: string | null): SurveyAnswers => {
  if (!raw) return EMPTY_ANSWERS;
  try {
    const v = JSON.parse(raw) as Partial<SurveyAnswers>;
    return { ...EMPTY_ANSWERS, ...v, interests: v.interests ?? [], goals: v.goals ?? [] };
  } catch {
    return EMPTY_ANSWERS;
  }
};

let answersCache: { raw: string | null; value: SurveyAnswers } = { raw: null, value: EMPTY_ANSWERS };
function getAnswersSnapshot(): SurveyAnswers {
  const raw = readRaw("session", SURVEY_KEY);
  if (raw !== answersCache.raw) answersCache = { raw, value: parseAnswers(raw) };
  return answersCache.value;
}

export function useSurveyAnswers() {
  const answers = useSyncExternalStore(subscribe, getAnswersSnapshot, () => EMPTY_ANSWERS);
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const update = useCallback((patch: Partial<SurveyAnswers>) => {
    const next = { ...getAnswersSnapshot(), ...patch };
    writeRaw("session", SURVEY_KEY, JSON.stringify(next));
  }, []);
  const reset = useCallback(() => writeRaw("session", SURVEY_KEY, null), []);
  return { answers, update, reset, hydrated };
}

/** Khảo sát đã đủ thông tin bắt buộc chưa? */
export const isSurveyComplete = (a: SurveyAnswers) =>
  a.grade !== null &&
  a.readingLevel !== null &&
  a.interests.length >= 1 &&
  a.format !== null &&
  a.goals.length >= 1 &&
  a.duration !== null;

/* ---------------- Danh sách sách đã lưu ---------------- */

const parseList = (raw: string | null): string[] => {
  if (!raw) return [];
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
};

const EMPTY_LIST: string[] = [];
let wishCache: { raw: string | null; value: string[] } = { raw: null, value: EMPTY_LIST };
function getWishSnapshot(): string[] {
  const raw = readRaw("local", WISHLIST_KEY);
  if (raw !== wishCache.raw) wishCache = { raw, value: raw ? parseList(raw) : EMPTY_LIST };
  return wishCache.value;
}

export function useWishlist() {
  const ids = useSyncExternalStore(subscribe, getWishSnapshot, () => EMPTY_LIST);
  const toggle = useCallback((id: string) => {
    const cur = getWishSnapshot();
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    writeRaw("local", WISHLIST_KEY, JSON.stringify(next));
  }, []);
  const remove = useCallback((id: string) => {
    writeRaw("local", WISHLIST_KEY, JSON.stringify(getWishSnapshot().filter((x) => x !== id)));
  }, []);
  const clear = useCallback(() => writeRaw("local", WISHLIST_KEY, null), []);
  return { ids, has: (id: string) => ids.includes(id), toggle, remove, clear };
}
