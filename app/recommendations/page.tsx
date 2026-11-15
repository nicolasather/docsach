import type { Metadata } from "next";
import { RecommendationsView } from "@/components/recommendations/RecommendationsView";

export const metadata: Metadata = {
  title: "Sách dành riêng cho bé",
  robots: { index: false },
};

export default function RecommendationsPage() {
  return <RecommendationsView />;
}
