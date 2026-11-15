import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collections, collectionBySlug, booksInCollection } from "@/data/collections";
import { books } from "@/data/books";
import { BookCard } from "@/components/books/BookCard";
import { EmptyState } from "@/components/shared/EmptyState";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = collectionBySlug(slug);
  return c ? { title: c.title, description: c.kicker } : { title: "Không tìm thấy bộ sưu tập" };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = collectionBySlug(slug);
  if (!c) notFound();
  const list = booksInCollection(c, books);

  return (
    <div className="container-page py-10 md:py-16">
      <nav aria-label="Đường dẫn" className="text-sm text-ink-soft">
        <Link href="/collections" className="hover:underline">Bộ sưu tập</Link> <span aria-hidden="true">/</span> <span>{c.title}</span>
      </nav>
      <header className="mt-6 grid gap-8 border-b border-line pb-10 lg:grid-cols-12">
        <h1 className="text-4xl sm:text-5xl lg:col-span-6">{c.title}</h1>
        <div className="space-y-4 text-lg text-ink-soft lg:col-span-6">
          {c.intro.map((p) => <p key={p}>{p}</p>)}
        </div>
      </header>
      <div className="mt-8">
        {list.length > 0 ? (
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
            {list.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        ) : (
          <EmptyState title="Bộ sưu tập đang được tuyển chọn" action={{ href: "/collections", label: "Xem bộ sưu tập khác" }}>
            <p>Những cuốn sách đầu tiên cho bộ sưu tập này sẽ xuất hiện khi danh mục được bổ sung.</p>
          </EmptyState>
        )}
      </div>
    </div>
  );
}
