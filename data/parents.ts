export interface ParentArticle {
  slug: string;
  title: string;
  kicker: string;
  /** Thời gian đọc ước tính (phút) */
  minutes: number;
  sections: { heading: string; paragraphs?: string[]; list?: string[] }[];
  thisWeek: string[];
}

export const parentArticles: ParentArticle[] = [
  {
    slug: "khuyen-khich-be-doc",
    title: "Khuyến khích bé đọc mà không biến việc đọc thành bài tập",
    kicker: "Thói quen đọc đến từ cảm giác “mình muốn”, không phải “mình phải”.",
    minutes: 4,
    sections: [
      {
        heading: "Để bé được chọn",
        paragraphs: [
          "Điều dễ làm nhất, và cũng hiệu quả nhất, là cho bé quyền chọn sách. Bé chọn truyện tranh, sách về khủng long hay một cuốn bạn bè đang truyền tay nhau đều tốt hơn một cuốn “bổ ích” mà bé không muốn mở.",
          "Nếu bố mẹ lo bé chỉ đọc một thể loại, hãy thêm sách mới vào cạnh sách bé thích, thay vì thay thế. Mục “Mở rộng thế giới của bé” trong kết quả gợi ý được làm cho đúng mục đích này.",
        ],
      },
      {
        heading: "Giữ giờ đọc nhỏ và đều",
        paragraphs: [
          "Mười phút mỗi ngày vào một giờ cố định, ví dụ trước khi ngủ, dễ giữ hơn nhiều so với một buổi đọc dài vào cuối tuần. Khi bé còn hứng thú, dừng lại đúng lúc truyện đang hay là cách đơn giản để ngày mai bé tự muốn đọc tiếp.",
        ],
      },
      {
        heading: "Làm gương và để sách ở nơi dễ thấy",
        list: [
          "Để sách ở phòng khách, cạnh giường, trong cặp, những nơi bé hay ngồi.",
          "Bố mẹ cũng đọc, dù chỉ vài phút, ở cạnh bé. Trẻ học thói quen bằng cách nhìn.",
          "Tránh bắt bé tóm tắt hay trả lời câu hỏi sau mỗi lần đọc. Thay vào đó, hỏi một câu thật lòng: “Đoạn nào làm con thích nhất?”",
        ],
      },
    ],
    thisWeek: [
      "Cùng bé chọn một cuốn sách bé tự muốn đọc.",
      "Chọn một khung giờ 10 phút cố định mỗi ngày.",
      "Cất bớt một thiết bị màn hình trong khung giờ đó.",
    ],
  },
  {
    slug: "chon-sach-theo-kha-nang-doc",
    title: "Chọn sách theo khả năng đọc, không chỉ theo lớp",
    kicker: "Hai bé cùng lớp có thể đọc ở hai mức rất khác nhau, và điều đó hoàn toàn bình thường.",
    minutes: 4,
    sections: [
      {
        heading: "Vì sao lớp học chưa đủ để chọn sách",
        paragraphs: [
          "Nhà xuất bản thường ghi độ tuổi hoặc lớp gợi ý, nhưng một bé lớp 3 có thể vừa tự tin đọc truyện dài, vừa có bạn cùng lớp còn cần nhiều hình minh họa. Vì vậy Mầm Đọc dùng lớp như điều kiện lọc ban đầu, rồi mới xét khả năng đọc hiện tại của bé.",
        ],
      },
      {
        heading: "Cách thử nhanh tại hiệu sách",
        paragraphs: [
          "Mở một trang bất kỳ ở giữa sách và để bé đọc to. Đây là cách kiểm tra đơn giản mà nhiều giáo viên vẫn dùng, không phải thước đo chính xác:",
        ],
        list: [
          "Bé đọc trôi chảy, gần như không vấp: cuốn sách này dễ, tốt cho việc đọc thư giãn.",
          "Bé vấp ở vài từ trên một trang nhưng vẫn hiểu câu chuyện: vừa sức, rất đáng thử.",
          "Bé vấp ở nhiều từ, phải dừng liên tục: cuốn này nên để bố mẹ đọc cùng.",
        ],
      },
      {
        heading: "Sách hơi dễ cũng có giá trị",
        paragraphs: [
          "Sách dễ hơn mức hiện tại giúp bé đọc nhanh, tự tin và thấy mình đọc giỏi. Sách khó hơn một chút phù hợp để đọc cùng bố mẹ. Một tủ sách tốt thường có cả hai loại.",
        ],
      },
    ],
    thisWeek: [
      "Cho bé đọc to một trang ở giữa cuốn sách trước khi mua.",
      "Xếp sách trong nhà thành hai nhóm: bé tự đọc được và đọc cùng bố mẹ.",
    ],
  },
  {
    slug: "doc-cung-con",
    title: "Đọc cùng con: ba cách đơn giản",
    kicker: "Bé đã tự đọc được vẫn có thể thích được đọc cùng.",
    minutes: 3,
    sections: [
      {
        heading: "1. Bố mẹ đọc, bé nghe",
        paragraphs: [
          "Với những cuốn hơi khó hoặc dài, bố mẹ đọc to cho bé nghe. Bé tiếp xúc với từ vựng và cốt truyện phong phú hơn mức mình tự đọc được, và giờ đọc trở thành giờ ở bên nhau.",
        ],
      },
      {
        heading: "2. Đọc luân phiên",
        paragraphs: [
          "Mỗi người đọc một trang hoặc một đoạn. Cách này giúp bé luyện đọc thành tiếng mà không bị áp lực phải đọc cả cuốn.",
        ],
      },
      {
        heading: "3. Dừng lại để trò chuyện",
        paragraphs: [
          "Thỉnh thoảng dừng ở chỗ truyện đang hồi hộp và hỏi những câu không có đáp án đúng sai:",
        ],
        list: [
          "Con nghĩ chuyện gì sẽ xảy ra tiếp theo?",
          "Nếu là nhân vật, con sẽ làm gì?",
          "Có điều gì trong truyện giống với chuyện của con không?",
        ],
      },
    ],
    thisWeek: [
      "Chọn một cuốn trong mục “Những cuốn sách nên đọc cùng bố mẹ”.",
      "Thử một lần dừng lại và hỏi bé: “Con nghĩ chuyện gì xảy ra tiếp?”",
    ],
  },
  {
    slug: "kham-pha-so-thich",
    title: "Giúp bé khám phá sở thích đọc của mình",
    kicker: "Sở thích đọc không có sẵn, nó hình thành khi bé được thử nhiều thứ.",
    minutes: 3,
    sections: [
      {
        heading: "Bắt đầu từ những điều bé đã hỏi",
        paragraphs: [
          "Bé hay hỏi về côn trùng, về vũ trụ, về cách máy móc hoạt động? Đó chính là gợi ý cho cuốn sách tiếp theo. Sở thích đọc thường bắt đầu từ sự tò mò có sẵn ngoài đời.",
        ],
      },
      {
        heading: "Cho bé thử, không cần đọc hết",
        paragraphs: [
          "Đến hiệu sách hoặc thư viện, để bé lật thử nhiều cuốn. Việc bỏ dở một cuốn không hợp là chuyện bình thường, và là một phần của việc tìm ra mình thích gì.",
        ],
      },
      {
        heading: "Thêm một “cuốn lạ” trong mỗi vài cuốn quen",
        paragraphs: [
          "Nếu bé đọc nhiều về một chủ đề, thỉnh thoảng thêm một cuốn ở chủ đề khác, kèm một lời mời nhẹ nhàng thay vì yêu cầu. Nếu bé không hứng thú, không sao, lần sau thử lại với cuốn khác.",
        ],
      },
    ],
    thisWeek: [
      "Ghi lại ba điều bé hỏi nhiều nhất trong tuần.",
      "Làm khảo sát của Mầm Đọc cùng bé và xem bé chọn chủ đề nào.",
    ],
  },
];

export const articleBySlug = (slug: string) =>
  parentArticles.find((a) => a.slug === slug);
