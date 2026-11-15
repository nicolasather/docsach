const STEPS = [
  {
    n: "1",
    title: "Kể về bé",
    text: "Lớp mấy, đọc được đến đâu, thích chủ đề gì, thích đọc kiểu nào. Không cần tên hay ngày sinh.",
    bg: "bg-sun",
    art: (
      <svg viewBox="0 0 200 130" className="h-full w-full" aria-hidden="true">
        <g stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round">
          <rect x="14" y="16" width="86" height="30" rx="15" fill="var(--color-canvas)" />
          <rect x="108" y="16" width="70" height="30" rx="15" fill="var(--color-cobalt)" />
          <rect x="30" y="56" width="64" height="30" rx="15" fill="var(--color-coral)" />
          <rect x="102" y="56" width="84" height="30" rx="15" fill="var(--color-canvas)" />
          <rect x="14" y="96" width="76" height="26" rx="13" fill="var(--color-mint)" />
        </g>
      </svg>
    ),
  },
  {
    n: "2",
    title: "Mầm Đọc đối chiếu",
    text: "Loại những cuốn chưa hợp với lớp của bé, rồi chấm phần còn lại theo từng câu trả lời. Quy tắc cố định, ai cũng kiểm tra được.",
    bg: "bg-mint",
    art: (
      <svg viewBox="0 0 200 130" className="h-full w-full" aria-hidden="true">
        <g stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round">
          <rect x="20" y="6" width="26" height="34" fill="var(--color-coral)" transform="rotate(-12 33 23)" />
          <rect x="82" y="2" width="26" height="34" fill="var(--color-sun)" transform="rotate(8 95 19)" />
          <rect x="146" y="8" width="26" height="34" fill="var(--color-cobalt)" transform="rotate(-6 159 25)" />
          <path d="M16 54h168L120 92v30H80V92Z" fill="var(--color-canvas)" />
        </g>
      </svg>
    ),
  },
  {
    n: "3",
    title: "Nhận kệ sách riêng",
    text: "Mỗi cuốn kèm lý do vì sao hợp với bé, cộng sách mở rộng thế giới và sách để đọc cùng bố mẹ.",
    bg: "bg-coral",
    art: (
      <svg viewBox="0 0 200 130" className="h-full w-full" aria-hidden="true">
        <g stroke="var(--color-ink)" strokeWidth="3" strokeLinejoin="round">
          <rect x="18" y="38" width="26" height="76" fill="var(--color-sun)" />
          <rect x="48" y="22" width="22" height="92" fill="var(--color-canvas)" />
          <rect x="74" y="46" width="30" height="68" fill="var(--color-cobalt)" />
          <rect x="108" y="30" width="24" height="84" fill="var(--color-mint)" />
          <rect x="136" y="50" width="28" height="64" fill="var(--color-canvas)" />
          <rect x="8" y="114" width="184" height="12" fill="var(--color-ink)" />
        </g>
      </svg>
    ),
  },
];

/** Ba tấm thẻ xếp chồng khi cuộn: tấm sau đè lên tấm trước, tấm trước lùi sâu và tối đi. */
export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="border-y-2 border-ink bg-canvas-2 py-16 md:py-24">
      <div className="container-page">
        <h2 id="how-title" className="sd-tip max-w-xl text-4xl sm:text-5xl">Gợi ý có lý do, không phải ngẫu nhiên.</h2>
        <ol className="mt-12 grid gap-8 md:mt-16 md:block">
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              className={`${i < 2 ? "sd-stack" : ""} surface-1 grid overflow-hidden md:sticky md:grid-cols-[1.1fr_1fr] md:min-h-[17rem] md:mb-10`}
              style={{ top: `calc(5.5rem + ${i} * 1.1rem)` }}
            >
              <div className="p-7 md:p-10">
                <span className="font-display text-7xl font-bold leading-none text-coral [-webkit-text-stroke:2px_var(--color-ink)] [paint-order:stroke_fill] [text-shadow:5px_5px_0_var(--color-ink)]" aria-hidden="true">{s.n}</span>
                <h3 className="mt-5 text-3xl">{s.title}</h3>
                <p className="mt-3 max-w-md text-ink-soft">{s.text}</p>
              </div>
              <div className={`${s.bg} grid place-items-center border-t-2 border-ink p-8 md:border-l-2 md:border-t-0`}>
                <div className="h-36 w-full max-w-[16rem]">{s.art}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
