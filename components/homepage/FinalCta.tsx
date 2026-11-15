import Link from "next/link";
import { BookPile } from "@/components/three-d/BookPile";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="bg-sun">
      <div className="container-page grid items-center gap-8 py-16 md:grid-cols-[1.4fr_1fr] md:py-24">
        <div className="sd-l">
          <h2 id="cta-title" className="max-w-xl text-4xl sm:text-5xl">Cuốn sách tiếp theo của bé bắt đầu từ năm câu hỏi.</h2>
          <Link href="/survey" className="btn btn-primary mt-8">Bắt đầu khảo sát</Link>
        </div>
        <div className="sd-r hidden md:block"><BookPile count={5} variant={1} /></div>
      </div>
    </section>
  );
}
