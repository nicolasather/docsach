/** Các mã (id) dùng chung giữa khảo sát, dữ liệu sách và bộ máy gợi ý. */

export type Grade = 1 | 2 | 3 | 4 | 5;

/** 1 = mới tập đọc · 2 = truyện ngắn · 3 = đọc khá · 4 = sách dài, nhiều nội dung */
export type ReadingLevel = 1 | 2 | 3 | 4;

export type Interest =
  | "dong-vat"
  | "khoa-hoc"
  | "thien-nhien"
  | "kham-pha-the-gioi"
  | "phieu-luu"
  | "fantasy"
  | "lich-su"
  | "cong-nghe"
  | "hai-huoc"
  | "tinh-ban-gia-dinh"
  | "bi-an-giai-do"
  | "nghe-thuat";

export type ReadingFormat =
  | "nhieu-tranh"
  | "can-bang"
  | "chu-va-truyen"
  | "nhieu-nhan-vat"
  | "kien-thuc-hinh-anh";

export type ReadingGoal =
  | "thoi-quen"
  | "giai-tri"
  | "kien-thuc"
  | "tu-duy"
  | "cam-xuc";

export type Duration = "5-10" | "10-20" | "20+";

export type Language = "vi" | "song-ngu" | "en";

export type Budget = "duoi-100" | "100-200" | "tren-200" | "khong-gioi-han";

/** Câu trả lời khảo sát. Không chứa thông tin định danh của bé. */
export interface SurveyAnswers {
  grade: Grade | null;
  readingLevel: ReadingLevel | null;
  interests: Interest[];
  format: ReadingFormat | null;
  goals: ReadingGoal[];
  duration: Duration | null;
  language: Language | null; // tuỳ chọn
  budget: Budget | null; // tuỳ chọn
}

export const EMPTY_ANSWERS: SurveyAnswers = {
  grade: null,
  readingLevel: null,
  interests: [],
  format: null,
  goals: [],
  duration: null,
  language: null,
  budget: null,
};
