import type {
  Grade,
  Interest,
  Language,
  ReadingFormat,
  ReadingGoal,
  ReadingLevel,
} from "./survey";

/** Thể loại chính của sách (dùng cho bộ lọc "Thể loại"). */
export type Genre =
  | "sach-tranh"
  | "truyen-tranh"
  | "truyen-ngan"
  | "truyen-dai"
  | "co-tich-dan-gian"
  | "tho"
  | "sach-kien-thuc"
  | "sach-khoa-hoc"
  | "sach-lich-su-dia-ly"
  | "ky-nang-song"
  | "sach-hoat-dong";

/**
 * Tình trạng dữ liệu của một bản ghi sách:
 * - verified   : đã đối chiếu với nguồn chính thức (có sourceUrl)
 * - incomplete : còn thiếu thông tin, chưa xác minh hết
 * - demo       : bản ghi minh hoạ để thử giao diện, KHÔNG phải sách thật
 */
export type DataStatus = "verified" | "incomplete" | "demo";

export type RetailerName = "FAHASA" | "Kim Đồng" | "Phương Nam" | "Khác";

export interface RetailerLink {
  retailer: RetailerName;
  /** Nếu retailer = "Khác": tên hiển thị của nhà sách */
  label?: string;
  /** Đường dẫn https tới đúng trang sách trên nhà sách. Không dùng link affiliate tự chế. */
  url: string;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  publisher?: string;
  isbn?: string;
  /** Đường dẫn ảnh bìa thật (https://… hoặc /covers/ten-file.jpg trong thư mục public). */
  coverUrl?: string;

  ageRange?: { min: number; max: number };
  /** Lớp phù hợp. Bắt buộc: dùng làm điều kiện loại sách không phù hợp. */
  gradeRange: { min: Grade; max: Grade };
  readingLevel: ReadingLevel;

  genres: Genre[]; // phần tử đầu tiên là thể loại chính
  interests: Interest[];
  goals: ReadingGoal[];
  format: ReadingFormat;
  language: Language;

  /** Tổng thời gian đọc hết cuốn sách (phút). Chỉ điền khi biết. */
  estimatedReadingTime?: { minMinutes: number; maxMinutes: number };
  pageCount?: number;

  description: string;
  childFriendlyDescription?: string;
  parentNotes?: string;
  contentNotes?: string;
  /** Sách phù hợp để bố mẹ và bé cùng đọc, cùng trò chuyện. */
  sharedReading?: boolean;

  /** VNĐ. Chỉ hiển thị khi có đủ price + priceUpdatedAt + priceSource. */
  price?: number;
  priceUpdatedAt?: string; // dd/mm/yyyy
  priceSource?: string;
  retailerLinks?: RetailerLink[];

  /** Nguồn dữ liệu (trang NXB / nhà sách) để đối chiếu. */
  sourceUrl?: string;
  dataStatus: DataStatus;
}
