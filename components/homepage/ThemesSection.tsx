import Link from "next/link";
import { THEMES } from "@/lib/taxonomy";
import { Pictogram } from "@/components/three-d/Pictogram";

const LOOK = [
  "bg-sun text-ink md:col-span-2",
  "bg-mint text-ink",
  "bg-canvas-2 text-ink",
  "bg-cobalt text-canvas",
  "bg-coral text-ink",
  "bg-canvas text-ink md:col-span-2",
  "bg-mint text-ink md:col-span-2",
  "bg-sun text-ink md:col-span-2",
];

export function ThemesSection() {
  return (
    <section aria-labelledby="themes-title" className="container-page py-16 md:py-24">
      <h2 id="themes-title" className="sd-tip max-w-2xl text-4xl sm:text-5xl">Bé của bạn đang tò mò về điều gì?</h2>
      <ul className="scene mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-4" style={{ perspective: "1600px" }}>
        {THEMES.map((t, i) => (
          <li key={t.id} className={`${LOOK[i % LOOK.length].split(" ").filter((c) => c.startsWith("md:")).join(" ")} ${i % 2 ? "sd-stamp" : "sd-tip"}`}>
            <Link
              href={`/books?chu-de=${t.id}`}
              className={`tile-3d group relative flex h-full min-h-[11.5rem] flex-col justify-between overflow-hidden rounded-[12px] border-2 border-ink p-5 ${LOOK[i % LOOK.length].split(" ").filter((c) => !c.startsWith("md:")).join(" ")}`}
            >
              <Pictogram id={t.id} className="h-16 w-16 transition-transform duration-500 [transition-timing-function:var(--ease-sprout)] group-hover:-rotate-6 group-hover:scale-110" />
              <span>
                <span className="block font-display text-xl font-bold leading-tight sm:text-2xl">{t.label}</span>
                <span className="mt-1 block text-[0.95rem] leading-snug opacity-95">{t.note}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
