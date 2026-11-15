import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "Mầm Đọc: tìm cuốn sách mà bé sẽ muốn đọc tiếp",
    template: "%s · Mầm Đọc",
  },
  description:
    "Mầm Đọc giúp bố mẹ tìm sách phù hợp cho học sinh tiểu học dựa trên lớp, khả năng đọc, sở thích và thói quen đọc của bé.",
  applicationName: "Mầm Đọc",
  openGraph: { title: "Mầm Đọc", description: "Gợi ý sách cho học sinh lớp 1 đến lớp 5 qua năm câu hỏi ngắn.", locale: "vi_VN", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <a
          href="#noi-dung"
          className="visually-hidden focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-cobalt focus:px-4 focus:py-3 focus:text-canvas"
        >
          Bỏ qua đến nội dung chính
        </a>
        <SiteHeader />
        <main id="noi-dung" tabIndex={-1} className="overflow-x-clip outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
