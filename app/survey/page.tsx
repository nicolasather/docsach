import type { Metadata } from "next";
import { SurveyFlow } from "@/components/survey/SurveyFlow";

export const metadata: Metadata = {
  title: "Tìm sách cho bé",
  description: "Năm câu hỏi ngắn để Mầm Đọc gợi ý sách phù hợp với lớp, khả năng đọc và sở thích của bé.",
};

export default function SurveyPage() {
  return <SurveyFlow />;
}
