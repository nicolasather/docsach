import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-ink text-canvas">
      <div className="container-page grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo light />
          <p className="mt-4 max-w-sm font-display text-2xl font-bold leading-snug">Tìm cuốn sách mà bé sẽ muốn đọc tiếp.</p>
        </div>
        <nav aria-label="Liên kết cuối trang" className="md:col-span-3">
          <h2 className="font-sans text-sm font-bold text-sun">Khám phá</h2>
          <ul className="mt-3 space-y-2">
            <li><Link className="hover:underline" href="/survey">Tìm sách cho bé</Link></li>
            <li><Link className="hover:underline" href="/books">Khám phá sách</Link></li>
            <li><Link className="hover:underline" href="/collections">Bộ sưu tập</Link></li>
            <li><Link className="hover:underline" href="/parents">Góc phụ huynh</Link></li>
            <li><Link className="hover:underline" href="/wishlist">Sách đã lưu</Link></li>
          </ul>
        </nav>
        <div className="md:col-span-4">
          <h2 className="font-sans text-sm font-bold text-sun">Dữ liệu và quyền riêng tư</h2>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-canvas/90">
            Không hỏi tên, ngày sinh hay trường của bé. Câu trả lời khảo sát chỉ nằm trong trình duyệt của bạn, không gửi đi đâu.
          </p>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-canvas/90">Mầm Đọc không bán sách. Nút “Mua tại…” dẫn sang nhà sách bên ngoài.</p>
        </div>
      </div>
      <div className="border-t border-canvas/25">
        <p className="container-page py-5 text-sm text-canvas/80">© {year} Mầm Đọc</p>
      </div>
    </footer>
  );
}
