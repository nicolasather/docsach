import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

export function SiteFooter() {
  return (
    <footer className="on-dark mt-24 bg-forest text-paper">
      <div className="container-page grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo light />
          <p className="mt-4 max-w-sm font-serif text-xl leading-snug">
            Tìm cuốn sách mà bé sẽ muốn đọc tiếp.
          </p>
        </div>
        <nav aria-label="Liên kết cuối trang" className="md:col-span-3">
          <h2 className="font-sans text-sm font-semibold text-gold">Khám phá</h2>
          <ul className="mt-3 space-y-2">
            <li><Link className="hover:underline" href="/survey">Tìm sách cho bé</Link></li>
            <li><Link className="hover:underline" href="/books">Khám phá sách</Link></li>
            <li><Link className="hover:underline" href="/collections">Bộ sưu tập</Link></li>
            <li><Link className="hover:underline" href="/parents">Góc phụ huynh</Link></li>
            <li><Link className="hover:underline" href="/wishlist">Sách đã lưu</Link></li>
          </ul>
        </nav>
        <div className="md:col-span-4">
          <h2 className="font-sans text-sm font-semibold text-gold">Về dữ liệu và quyền riêng tư</h2>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-paper/90">
            Mầm Đọc không yêu cầu tên, ngày sinh hay trường học của bé và không cần tài khoản. Câu trả lời khảo sát chỉ được giữ tạm trong trình duyệt của bạn và không gửi đi đâu.
          </p>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-paper/90">
            Mầm Đọc không bán sách. Các nút “Mua tại…” dẫn sang nhà sách bên ngoài.
          </p>
        </div>
      </div>
      <div className="border-t border-paper/20">
        <p className="container-page py-5 text-sm text-paper/80">© Mầm Đọc</p>
      </div>
    </footer>
  );
}
