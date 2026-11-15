import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { parentArticles, articleBySlug } from "@/data/parents";

export function generateStaticParams() {
  return parentArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug(slug);
  return a ? { title: a.title, description: a.kicker } : { title: "Không tìm thấy bài viết" };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) notFound();
  const idx = parentArticles.findIndex((x) => x.slug === slug);
  const nextA = parentArticles[(idx + 1) % parentArticles.length];

  return (
    <article className="container-page py-10 md:py-16">
      <nav aria-label="Đường dẫn" className="text-sm text-ink-soft">
        <Link href="/parents" className="hover:underline">Góc phụ huynh</Link>
      </nav>
      <div className="mx-auto mt-6 max-w-2xl">
        <p className="eyebrow">{a.minutes} phút đọc</p>
        <h1 className="mt-2 text-4xl sm:text-5xl">{a.title}</h1>
        <p className="mt-4 font-display text-xl text-cobalt">{a.kicker}</p>

        <div className="mt-10 space-y-9">
          {a.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-2xl">{s.heading}</h2>
              {s.paragraphs?.map((p) => <p key={p} className="mt-3 text-lg">{p}</p>)}
              {s.list && (
                <ul className="mt-3 list-disc space-y-2 pl-6 text-lg marker:text-coral">
                  {s.list.map((li) => <li key={li}>{li}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>

        <aside aria-labelledby="tuan-nay" className="mt-12 border-l-4 border-sun bg-canvas-2 px-6 py-5">
          <h2 id="tuan-nay" className="text-xl">Thử trong tuần này</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-coral">
            {a.thisWeek.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </aside>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <Link href="/survey" className="btn btn-primary">Tìm sách cho bé</Link>
          <Link href={`/parents/${nextA.slug}`} className="link-underline font-semibold">Bài tiếp theo: {nextA.title}</Link>
        </div>
      </div>
    </article>
  );
}
