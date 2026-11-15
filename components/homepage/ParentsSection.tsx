import Link from "next/link";
import { parentArticles } from "@/data/parents";

export function ParentsSection() {
  return (
    <section aria-labelledby="parents-title" className="border-y-2 border-ink bg-mint py-16 md:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="parents-title" className="sd-tip text-4xl sm:text-5xl">Góc phụ huynh</h2>
          <p className="mt-5 max-w-sm text-ink">Vài phút mỗi ngày, một cuốn sách bé tự chọn và một người lớn ngồi cạnh thường là đủ để bắt đầu.</p>
        </div>
        <ul className="grid gap-5 lg:col-span-7">
          {parentArticles.map((a, i) => (
            <li key={a.slug} className={i % 2 ? "sd-r" : "sd-l"}>
              <Link href={`/parents/${a.slug}`} className="tile-3d group flex items-center justify-between gap-4 rounded-[12px] border-2 border-ink bg-canvas p-5 sm:p-6">
                <span>
                  <span className="block font-display text-xl font-bold leading-snug group-hover:text-cobalt sm:text-2xl">{a.title}</span>
                  <span className="mt-1 block text-[0.95rem] text-ink-soft">{a.minutes} phút đọc</span>
                </span>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-sun text-xl transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
