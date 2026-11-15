import Link from "next/link";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="on-dark bg-forest text-paper">
      <div className="container-page py-16 text-center md:py-24">
        <h2 id="cta-title" className="mx-auto max-w-2xl text-3xl text-paper sm:text-5xl">Sẵn sàng tìm cuốn sách tiếp theo của bé?</h2>
        <p className="mx-auto mt-5 max-w-xl text-paper/90">Chỉ năm câu hỏi ngắn. Kết quả hiện ngay, không cần đăng ký.</p>
        <Link href="/survey" className="btn btn-light mt-8">Bắt đầu khảo sát</Link>
      </div>
    </section>
  );
}
