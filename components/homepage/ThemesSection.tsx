import Link from "next/link";
import { THEMES } from "@/lib/taxonomy";

export function ThemesSection() {
  return (
    <section aria-labelledby="themes-title" className="bg-paper-2 py-16 md:py-20">
      <div className="container-page">
        <p className="eyebrow">Chủ đề đọc</p>
        <h2 id="themes-title" className="mt-3 max-w-2xl text-3xl sm:text-4xl">Bé của bạn đang tò mò về điều gì?</h2>
        <ul className="mt-10 grid gap-x-12 md:grid-cols-2">
          {THEMES.map((t, i) => (
            <li key={t.id} className="border-t border-line">
              <Link href={`/books?chu-de=${t.id}`} className="group flex items-baseline gap-4 py-5">
                <span className="w-7 shrink-0 font-serif text-lg text-terracotta-ink" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1">
                  <span className="block font-serif text-xl font-semibold group-hover:text-forest group-hover:underline">{t.label}</span>
                  <span className="mt-0.5 block text-[0.95rem] text-ink-soft">{t.note}</span>
                </span>
                <span aria-hidden="true" className="text-forest">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
