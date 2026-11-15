import type { Book } from "@/types/book";

/**
 * BỘ SƯU TẬP
 * Mỗi bộ sưu tập là một QUY TẮC lọc (không gán cứng sách) nên tự có sách
 * khi danh mục data/books.json được bổ sung.
 * `pinned`: danh sách id sách muốn đưa lên đầu bộ sưu tập (tuỳ chọn).
 */
export interface Collection {
  slug: string;
  title: string;
  /** Mô tả ngắn hiển thị ở thẻ */
  kicker: string;
  /** Lời giới thiệu biên tập ở đầu trang bộ sưu tập */
  intro: string[];
  matches: (b: Book) => boolean;
  limit?: number;
  pinned?: string[];
}

export const collections: Collection[] = [
  {
    slug: "yeu-khoa-hoc",
    title: "10 cuốn sách giúp bé yêu khoa học",
    kicker: "Từ câu hỏi “vì sao” đến những thí nghiệm nhỏ.",
    intro: [
      "Trẻ con vốn là nhà khoa học: bé hỏi vì sao trời mưa, vì sao con kiến đi thành hàng. Một cuốn sách tốt không vội trả lời hết, mà làm bé hỏi thêm.",
      "Bộ sưu tập này gom những cuốn sách khoa học và công nghệ viết cho trẻ tiểu học, ưu tiên cách giải thích gần gũi, có hình ảnh rõ ràng và không biến kiến thức thành bài học thuộc lòng.",
    ],
    matches: (b) =>
      b.interests.includes("khoa-hoc") ||
      b.interests.includes("cong-nghe") ||
      b.genres.includes("sach-khoa-hoc"),
    limit: 10,
  },
  {
    slug: "chua-co-thoi-quen-doc",
    title: "Sách dành cho bé chưa có thói quen đọc",
    kicker: "Ngắn, nhiều tranh, dễ bắt đầu và dễ đọc tiếp.",
    intro: [
      "Với bé chưa quen đọc sách, điều quan trọng nhất không phải là cuốn sách “bổ ích” nhất mà là cuốn bé chịu mở ra và đọc được đến trang cuối.",
      "Những cuốn trong bộ sưu tập này có độ dài vừa phải, mức đọc dễ và hướng tới việc hình thành thói quen. Hãy để bé tự chọn, rồi đọc cùng bé vài trang đầu.",
    ],
    matches: (b) => b.goals.includes("thoi-quen") && b.readingLevel <= 2,
    limit: 10,
  },
  {
    slug: "phieu-luu-hap-dan",
    title: "Những câu chuyện phiêu lưu hấp dẫn",
    kicker: "Một chuyến đi, một bí mật, và một lý do để lật trang tiếp.",
    intro: [
      "Truyện phiêu lưu cho trẻ biết cách hồi hộp một cách an toàn: nhân vật gặp khó khăn, tìm cách vượt qua, và người đọc đi cùng từng bước.",
      "Đây là những cuốn có cốt truyện cuốn hút, phù hợp cho bé thích khám phá và những bé cần một câu chuyện đủ hay để muốn đọc tiếp tối hôm sau.",
    ],
    matches: (b) =>
      b.interests.includes("phieu-luu") ||
      b.interests.includes("kham-pha-the-gioi") ||
      b.interests.includes("bi-an-giai-do"),
    limit: 10,
  },
  {
    slug: "hieu-ve-cam-xuc",
    title: "Sách giúp bé hiểu về cảm xúc",
    kicker: "Gọi tên cảm xúc, hiểu bạn bè, hiểu gia đình.",
    intro: [
      "Có những điều khó nói thành lời: vì sao con buồn khi bạn không chơi cùng, vì sao con giận khi em lấy đồ chơi. Một câu chuyện hay cho bé một cách để gọi tên điều đó.",
      "Bộ sưu tập tập trung vào những cuốn sách về cảm xúc, tình bạn và kỹ năng sống, phù hợp để bé tự đọc hoặc để bố mẹ đọc cùng rồi trò chuyện.",
    ],
    matches: (b) =>
      b.goals.includes("cam-xuc") || b.interests.includes("tinh-ban-gia-dinh"),
    limit: 10,
  },
  {
    slug: "doc-cung-bo-me",
    title: "Những cuốn sách thích hợp để đọc cùng bố mẹ",
    kicker: "Để giờ đọc sách trở thành giờ trò chuyện.",
    intro: [
      "Đọc cùng con không chỉ dành cho bé mới tập đọc. Ở bất kỳ lớp nào, một cuốn sách đọc chung cũng mở ra những cuộc trò chuyện mà bình thường rất khó có.",
      "Những cuốn dưới đây được chọn vì có nội dung để cùng suy nghĩ, cùng đoán, cùng bàn luận. Mục “Ghi chú cho phụ huynh” ở từng cuốn sẽ gợi ý vài câu hỏi để bắt đầu.",
    ],
    matches: (b) => b.sharedReading === true,
    limit: 10,
  },
];

export const collectionBySlug = (slug: string) =>
  collections.find((c) => c.slug === slug);

export function booksInCollection(c: Collection, all: Book[]): Book[] {
  const found = all.filter(c.matches);
  const pinned = c.pinned ?? [];
  found.sort((a, b) => {
    const pa = pinned.indexOf(a.id);
    const pb = pinned.indexOf(b.id);
    return (pa === -1 ? 999 : pa) - (pb === -1 ? 999 : pb) || a.title.localeCompare(b.title, "vi");
  });
  return found.slice(0, c.limit ?? 12);
}
