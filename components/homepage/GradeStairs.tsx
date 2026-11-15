import Link from "next/link";
import { Book3D } from "@/components/three-d/Book3D";

const STEP = [
  { g: 1, h: 26, c: "var(--color-mint)" },
  { g: 2, h: 34, c: "var(--color-sun)" },
  { g: 3, h: 42, c: "var(--color-coral)" },
  { g: 4, h: 50, c: "var(--color-cobalt)" },
  { g: 5, h: 58, c: "var(--color-canvas-3)" },
];

/** Năm cuốn sách cao dần = năm lớp. Bấm vào để lọc sách theo lớp. */
export function GradeStairs() {
  return (
    <section aria-labelledby="grade-title" className="container-page py-16 md:py-24">
      <h2 id="grade-title" className="sd-tip max-w-md text-4xl sm:text-5xl">Bé học lớp mấy?</h2>
      <ul className="scene mt-12 flex items-end justify-between gap-2 sm:gap-6" style={{ ["--u" as string]: "clamp(2.6px, 0.5vw, 5px)" }}>
        {STEP.map((s, i) => (
          <li key={s.g} className={i % 2 ? "sd-r" : "sd-l"}>
            <Link href={`/books?lop=${s.g}`} className="group flex flex-col items-center" aria-label={`Sách cho lớp ${s.g}`}>
              <span className="book-tilt block" style={{ perspective: "800px" }}>
                <span className="block transition-transform duration-500 [transform:rotateY(-18deg)] group-hover:[transform:rotateY(-38deg)_translateY(-8px)] group-focus-visible:[transform:rotateY(-38deg)_translateY(-8px)]" style={{ transformStyle: "preserve-3d", transitionTimingFunction: "var(--ease-flip)" }}>
                  <Book3D w={22} h={s.h} d={5} face={s.c} side="var(--color-ink)" top="var(--color-canvas)" front={<span className="grid h-full place-items-center font-display text-[calc(var(--u)*11)] font-bold leading-none text-ink">{s.g}</span>} />
                </span>
              </span>
              <span className="mt-5 border-t-[3px] border-ink pt-2 font-display text-lg font-bold group-hover:text-cobalt sm:text-2xl">Lớp {s.g}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
