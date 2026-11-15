"use client";

import Link from "next/link";
import { useMemo } from "react";
import { books } from "@/data/books";
import { isSurveyComplete, useSurveyAnswers } from "@/lib/storage";
import { recommend } from "@/lib/recommendation-engine";
import { FORMAT_SHORT, GRADES, INTEREST_LABEL, LEVEL_SHORT } from "@/lib/taxonomy";
import { EmptyState } from "@/components/shared/EmptyState";
import { RecommendationSection } from "./RecommendationSection";

export function RecommendationsView() {
  const { answers, hydrated } = useSurveyAnswers();
  const complete = isSurveyComplete(answers);
  const result = useMemo(() => (complete ? recommend(books, answers) : null), [complete, answers]);

  if (!hydrated) {
    return <div className="container-page py-24" aria-busy="true"><p className="text-ink-soft">Đang mở kệ sách…</p></div>;
  }

  if (!complete || !result) {
    return (
      <div className="container-page py-16 md:py-24">
        <EmptyState
          title="Chưa có câu trả lời khảo sát"
          action={{ href: "/survey", label: "Làm khảo sát để nhận gợi ý" }}
        >
          <p>Hãy trả lời vài câu hỏi ngắn về bé để Mầm Đọc chọn sách phù hợp.</p>
        </EmptyState>
      </div>
    );
  }

  const grade = GRADES.find((g) => g.id === answers.grade)?.label;
  const shown = result.best.length + result.expand.length + result.together.length;

  return (
    <div className="container-page pb-20">
      <header className="border-b border-line py-10 md:py-16">
        <p className="eyebrow">Kết quả khảo sát</p>
        <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl">Những cuốn sách dành riêng cho bé.</h1>
        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[0.98rem]">
          <div><dt className="inline font-semibold">Lớp: </dt><dd className="inline">{grade?.replace("Lớp ", "")}</dd></div>
          <div><dt className="inline font-semibold">Mức đọc: </dt><dd className="inline">{LEVEL_SHORT[answers.readingLevel!]}</dd></div>
          <div><dt className="inline font-semibold">Chủ đề: </dt><dd className="inline">{answers.interests.map((i) => INTEREST_LABEL[i]).join(", ")}</dd></div>
          <div><dt className="inline font-semibold">Kiểu sách: </dt><dd className="inline">{FORMAT_SHORT[answers.format!]}</dd></div>
        </dl>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/survey" className="btn btn-outline">Chỉnh lại câu trả lời</Link>
          <Link href="/wishlist" className="link-underline self-center font-semibold">Xem sách đã lưu</Link>
        </div>
      </header>

      {books.length === 0 ? (
        <div className="py-12">
          <EmptyState title="Kệ sách đang được chuẩn bị">
            <p>Mầm Đọc chưa có sách nào trong danh mục. Câu trả lời của bạn vẫn được giữ lại, và khi sách được thêm vào bạn có thể quay lại trang này để nhận gợi ý.</p>
          </EmptyState>
        </div>
      ) : result.eligibleCount === 0 ? (
        <div className="py-12">
          <EmptyState title={`Chưa có sách nào dành cho ${grade?.toLowerCase()}`} action={{ href: "/books", label: "Xem toàn bộ sách" }}>
            <p>Danh mục hiện chưa có cuốn nào phù hợp với lớp bé đã chọn. Mầm Đọc không gợi ý sách ngoài khoảng lớp phù hợp.</p>
          </EmptyState>
        </div>
      ) : shown === 0 ? (
        <div className="py-12">
          <EmptyState title="Chưa tìm được cuốn nào thật sự hợp" action={{ href: "/survey", label: "Chỉnh lại câu trả lời" }}>
            <p>Có {result.eligibleCount} cuốn dành cho lớp của bé nhưng chưa cuốn nào khớp rõ với các lựa chọn. Bạn có thể thử đổi chủ đề hoặc kiểu sách.</p>
          </EmptyState>
        </div>
      ) : (
        <>
          <RecommendationSection
            id="phu-hop-nhat"
            eyebrow="A"
            title="Những cuốn sách phù hợp nhất"
            intro="Khớp tốt nhất với lớp, mức đọc, chủ đề và mục tiêu bạn đã chọn."
            items={result.best}
            showBand
          />
          <RecommendationSection
            id="mo-rong"
            eyebrow="B"
            title="Mở rộng thế giới của bé"
            intro="Những chủ đề mới ngoài sở thích hiện tại, vẫn vừa sức đọc của bé."
            items={result.expand}
          />
          <RecommendationSection
            id="doc-cung-bo-me"
            eyebrow="C"
            title="Những cuốn sách nên đọc cùng bố mẹ"
            intro="Sách để cùng đọc, cùng trò chuyện, hoặc hơi vượt mức đọc hiện tại của bé."
            items={result.together}
          />
          <p className="border-t border-line pt-6 text-sm text-ink-soft">
            Mầm Đọc chỉ gợi ý sách trong khoảng lớp phù hợp, rồi so khớp theo chủ đề, mức đọc, kiểu sách, mục tiêu, thời lượng, ngôn ngữ và ngân sách. Nhãn như “Rất hợp với bé” chỉ là mức độ tương đối, không phải điểm số chính xác.
          </p>
        </>
      )}
    </div>
  );
}
