import type { Metadata } from "next";
import Link from "next/link";
import { parentArticles } from "@/data/parents";

export const metadata: Metadata = {
  title: "Góc phụ huynh",
  description: "Gợi ý ngắn gọn để bố mẹ khuyến khích bé đọc, chọn sách theo khả năng đọc và đọc cùng con.",
};

export default function ParentsPage() {
  return (
    <div className="container-page py-10 md:py-16">
      <p className="eyebrow">Góc phụ huynh</p>
      <h1 className="mt-2 max-w-3xl text-4xl sm:text-5xl">Đồng hành cùng bé trên hành trình đọc sách.</h1>
      <ul className="mt-12 max-w-3xl">
        {parentArticles.map((a, i) => (
          <li key={a.slug} className="border-t border-line">
            <Link href={`/parents/${a.slug}`} className="group grid grid-cols-[3rem_1fr] gap-4 py-7">
              <span className="font-display text-3xl text-coral" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="block font-display text-2xl font-semibold group-hover:text-cobalt group-hover:underline">{a.title}</span>
                <span className="mt-1.5 block text-ink-soft">{a.kicker}</span>
                <span className="mt-1 block text-sm text-ink-soft">{a.minutes} phút đọc</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
