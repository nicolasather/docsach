const STEPS = [
  {
    n: "1",
    title: "Kể về bé",
    text: "Lớp mấy, đọc được đến đâu, thích chủ đề gì và thích đọc kiểu nào. Không cần tên hay ngày sinh.",
  },
  {
    n: "2",
    title: "Mầm Đọc đối chiếu",
    text: "Loại những cuốn chưa hợp với lớp của bé, rồi so sánh phần còn lại với từng câu trả lời của bạn theo một quy tắc cố định, ai cũng kiểm tra được.",
  },
  {
    n: "3",
    title: "Nhận kệ sách riêng",
    text: "Mỗi cuốn đều có lý do rõ ràng vì sao hợp với bé, kèm sách mở rộng thế giới và sách để đọc cùng bố mẹ.",
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="container-page py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">Cách Mầm Đọc gợi ý</p>
          <h2 id="how-title" className="mt-3 text-3xl sm:text-4xl">Gợi ý có lý do, không phải ngẫu nhiên.</h2>
        </div>
        <ol className="lg:col-span-8 lg:pl-8">
          {STEPS.map((s) => (
            <li key={s.n} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-line py-6 first:border-t-0 first:pt-0">
              <span className="font-serif text-5xl font-semibold leading-none text-terracotta" aria-hidden="true">{s.n}</span>
              <div>
                <h3 className="text-xl">{s.title}</h3>
                <p className="mt-1.5 text-ink-soft">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
