import type { Genre } from "@/types/book";
import type {
  Budget,
  Duration,
  Grade,
  Interest,
  Language,
  ReadingFormat,
  ReadingGoal,
  ReadingLevel,
} from "@/types/survey";

export const GRADES: { id: Grade; label: string }[] = [
  { id: 1, label: "Lớp 1" },
  { id: 2, label: "Lớp 2" },
  { id: 3, label: "Lớp 3" },
  { id: 4, label: "Lớp 4" },
  { id: 5, label: "Lớp 5" },
];

export const READING_LEVELS: {
  id: ReadingLevel;
  /** Câu mô tả trong khảo sát */
  survey: string;
  /** Nhãn ngắn trên thẻ sách */
  short: string;
}[] = [
  {
    id: 1,
    survey: "Bé mới tập đọc và cần nhiều hình minh họa.",
    short: "Mới tập đọc",
  },
  { id: 2, survey: "Bé đọc được những câu chuyện ngắn.", short: "Truyện ngắn" },
  {
    id: 3,
    survey: "Bé đọc khá tốt và có thể theo dõi cốt truyện dài hơn.",
    short: "Đọc khá",
  },
  {
    id: 4,
    survey: "Bé thích đọc sách dài và có nhiều nội dung khám phá.",
    short: "Sách dài, nhiều nội dung",
  },
];

export const INTERESTS: { id: Interest; label: string }[] = [
  { id: "dong-vat", label: "Động vật" },
  { id: "khoa-hoc", label: "Khoa học" },
  { id: "thien-nhien", label: "Thiên nhiên" },
  { id: "kham-pha-the-gioi", label: "Khám phá thế giới" },
  { id: "phieu-luu", label: "Phiêu lưu" },
  { id: "fantasy", label: "Fantasy" },
  { id: "lich-su", label: "Lịch sử" },
  { id: "cong-nghe", label: "Công nghệ" },
  { id: "hai-huoc", label: "Hài hước" },
  { id: "tinh-ban-gia-dinh", label: "Tình bạn và gia đình" },
  { id: "bi-an-giai-do", label: "Bí ẩn và giải đố" },
  { id: "nghe-thuat", label: "Nghệ thuật" },
];

export const FORMATS: { id: ReadingFormat; survey: string; short: string }[] = [
  {
    id: "nhieu-tranh",
    survey: "Nhiều tranh minh họa, ít chữ.",
    short: "Nhiều tranh, ít chữ",
  },
  {
    id: "can-bang",
    survey: "Có sự cân bằng giữa hình ảnh và nội dung.",
    short: "Cân bằng tranh và chữ",
  },
  {
    id: "chu-va-truyen",
    survey: "Chủ yếu là chữ và câu chuyện.",
    short: "Chủ yếu là chữ",
  },
  {
    id: "nhieu-nhan-vat",
    survey: "Bé thích truyện có nhiều nhân vật và tình tiết.",
    short: "Nhiều nhân vật, nhiều tình tiết",
  },
  {
    id: "kien-thuc-hinh-anh",
    survey: "Bé thích sách kiến thức, hình ảnh và thông tin.",
    short: "Sách kiến thức, nhiều hình ảnh",
  },
];

export const GOALS: { id: ReadingGoal; label: string }[] = [
  { id: "thoi-quen", label: "Hình thành thói quen đọc sách." },
  { id: "giai-tri", label: "Giải trí và thư giãn." },
  { id: "kien-thuc", label: "Mở rộng kiến thức." },
  { id: "tu-duy", label: "Phát triển tư duy." },
  { id: "cam-xuc", label: "Phát triển cảm xúc và kỹ năng sống." },
];

export const GOAL_SHORT: Record<ReadingGoal, string> = {
  "thoi-quen": "hình thành thói quen đọc",
  "giai-tri": "giải trí và thư giãn",
  "kien-thuc": "mở rộng kiến thức",
  "tu-duy": "phát triển tư duy",
  "cam-xuc": "phát triển cảm xúc và kỹ năng sống",
};

export const DURATIONS: { id: Duration; label: string }[] = [
  { id: "5-10", label: "5–10 phút." },
  { id: "10-20", label: "10–20 phút." },
  { id: "20+", label: "Trên 20 phút." },
];

export const LANGUAGES: { id: Language; label: string }[] = [
  { id: "vi", label: "Tiếng Việt" },
  { id: "song-ngu", label: "Song ngữ Việt – Anh" },
  { id: "en", label: "Tiếng Anh" },
];

export const BUDGETS: { id: Budget; label: string }[] = [
  { id: "duoi-100", label: "Dưới 100.000đ" },
  { id: "100-200", label: "100.000–200.000đ" },
  { id: "tren-200", label: "Trên 200.000đ" },
  { id: "khong-gioi-han", label: "Không giới hạn" },
];

export const GENRES: { id: Genre; label: string }[] = [
  { id: "sach-tranh", label: "Sách tranh" },
  { id: "truyen-tranh", label: "Truyện tranh" },
  { id: "truyen-ngan", label: "Truyện ngắn" },
  { id: "truyen-dai", label: "Truyện dài" },
  { id: "co-tich-dan-gian", label: "Cổ tích và truyện dân gian" },
  { id: "tho", label: "Thơ" },
  { id: "sach-kien-thuc", label: "Sách kiến thức" },
  { id: "sach-khoa-hoc", label: "Sách khoa học" },
  { id: "sach-lich-su-dia-ly", label: "Lịch sử và địa lý" },
  { id: "ky-nang-song", label: "Kỹ năng sống" },
  { id: "sach-hoat-dong", label: "Sách hoạt động" },
];

const toMap = <T extends { id: string | number }>(
  list: T[],
  pick: (x: T) => string
) => Object.fromEntries(list.map((x) => [x.id, pick(x)])) as Record<
  T["id"],
  string
>;

export const INTEREST_LABEL = toMap(INTERESTS, (x) => x.label) as Record<
  Interest,
  string
>;
export const GENRE_LABEL = toMap(GENRES, (x) => x.label) as Record<
  Genre,
  string
>;
export const FORMAT_SHORT = toMap(FORMATS, (x) => x.short) as Record<
  ReadingFormat,
  string
>;
export const LEVEL_SHORT = toMap(READING_LEVELS, (x) => x.short) as Record<
  ReadingLevel,
  string
>;
export const LANGUAGE_LABEL = toMap(LANGUAGES, (x) => x.label) as Record<
  Language,
  string
>;

export const gradeText = (min: number, max: number) =>
  min === max ? `Lớp ${min}` : `Lớp ${min}–${max}`;

/**
 * Chủ đề đọc phổ biến trên trang chủ. Mỗi chủ đề là một quy tắc lọc
 * (không gán cứng sách) nên tự có sách khi danh mục được bổ sung.
 */
export interface Theme {
  id: string;
  label: string;
  note: string;
  interests?: Interest[];
  goals?: ReadingGoal[];
}

export const THEMES: Theme[] = [
  {
    id: "phieu-luu-kham-pha",
    label: "Phiêu lưu và khám phá",
    note: "Những chuyến đi, những vùng đất chưa biết.",
    interests: ["phieu-luu", "kham-pha-the-gioi"],
  },
  {
    id: "khoa-hoc-thien-nhien",
    label: "Khoa học và thiên nhiên",
    note: "Vì sao thế giới vận hành như vậy.",
    interests: ["khoa-hoc", "thien-nhien"],
  },
  {
    id: "dong-vat",
    label: "Động vật",
    note: "Từ con kiến nhỏ đến loài thú lớn.",
    interests: ["dong-vat"],
  },
  {
    id: "lich-su",
    label: "Lịch sử",
    note: "Chuyện xưa kể cho bé hôm nay.",
    interests: ["lich-su"],
  },
  {
    id: "fantasy",
    label: "Fantasy và thế giới tưởng tượng",
    note: "Nơi mọi điều đều có thể xảy ra.",
    interests: ["fantasy"],
  },
  {
    id: "hai-huoc",
    label: "Truyện hài hước",
    note: "Để bé cười và muốn đọc tiếp.",
    interests: ["hai-huoc"],
  },
  {
    id: "ky-nang-cam-xuc",
    label: "Kỹ năng sống và cảm xúc",
    note: "Hiểu mình, hiểu bạn, hiểu gia đình.",
    interests: ["tinh-ban-gia-dinh"],
    goals: ["cam-xuc"],
  },
  {
    id: "tu-duy-sang-tao",
    label: "Tư duy và sáng tạo",
    note: "Giải đố, chế tạo, nghĩ khác đi.",
    interests: ["bi-an-giai-do", "cong-nghe", "nghe-thuat"],
    goals: ["tu-duy"],
  },
];
