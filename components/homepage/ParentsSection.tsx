import Link from "next/link";
import { parentArticles } from "@/data/parents";

export function ParentsSection() {
  return (
    <section aria-labelledby="parents-title" className="bg-paper-2 py-16 md:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">Góc phụ huynh</p>
          <h2 id="parents-title" className="mt-3 text-3xl sm:text-4xl">Thói quen đọc bắt đầu từ những điều nhỏ.</h2>
          <p className="mt-5 text-ink-soft">
            Không cần giờ đọc dài hay danh sách sách “phải đọc”. Vài phút mỗi ngày, một cuốn sách bé tự chọn và một người lớn ngồi cạnh thường là đủ để bắt đầu.
          </p>
        </div>
        <ul className="lg:col-span-7">
          {parentArticles.map((a) => (
            <li key={a.slug} className="border-t border-line">
              <Link href={`/parents/${a.slug}`} className="group block py-5">
                <span className="block font-serif text-xl font-semibold group-hover:text-forest group-hover:underline">{a.title}</span>
                <span className="mt-1 block text-[0.95rem] text-ink-soft">{a.kicker} · {a.minutes} phút đọc</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
