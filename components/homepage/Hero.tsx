import Link from "next/link";
import { HeroScene } from "@/components/three-d/HeroScene";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="on-cobalt relative overflow-hidden border-b-2 border-ink bg-cobalt text-canvas">
      <div className="container-page grid items-center gap-6 pb-14 pt-12 md:pb-20 md:pt-16 lg:grid-cols-12 lg:gap-4 lg:pb-24 lg:pt-20">
        <div className="relative z-10 lg:col-span-6">
          <h1 id="hero-title" className="text-[2.65rem] leading-[1.04] text-canvas sm:text-6xl lg:text-[4.4rem]">
            Tìm cuốn sách mà bé sẽ{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="absolute -inset-x-2 inset-y-[0.12em] -z-0 -rotate-1 border-2 border-ink bg-sun" aria-hidden="true" />
              <span className="relative text-ink">muốn đọc tiếp.</span>
            </span>
          </h1>
          <p className="mt-7 max-w-md text-lg text-canvas/95">
            Lớp 1 đến lớp 5. Năm câu hỏi, khoảng 1–2 phút, không cần tài khoản.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/survey" className="btn btn-light">Làm khảo sát 5 câu</Link>
            <Link href="/collections" className="btn btn-outline">Xem bộ sưu tập</Link>
          </div>
        </div>
        <div className="relative lg:col-span-6">
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
