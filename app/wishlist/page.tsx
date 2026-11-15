import type { Metadata } from "next";
import { WishlistView } from "@/components/books/WishlistView";

export const metadata: Metadata = { title: "Sách đã lưu" };

export default function WishlistPage() {
  return (
    <div className="container-page py-10 md:py-16">
      <p className="eyebrow">Danh sách đọc</p>
      <h1 className="mt-2 text-4xl sm:text-5xl">Sách đã lưu.</h1>
      <div className="mt-10"><WishlistView /></div>
    </div>
  );
}
