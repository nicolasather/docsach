/** Minh hoạ thương hiệu: một kệ sách với mầm cây. Đây là tranh minh hoạ, không phải bìa sách thật. */
export function HeroArt() {
  const spines: { x: number; w: number; h: number; c: string; band: string; tilt?: number }[] = [
    { x: 30, w: 44, h: 250, c: "#315747", band: "#E4C887" },
    { x: 78, w: 36, h: 300, c: "#E4C887", band: "#315747" },
    { x: 118, w: 52, h: 270, c: "#C96D4F", band: "#F6F2E9" },
    { x: 174, w: 34, h: 215, c: "#EDE7DA", band: "#315747" },
    { x: 212, w: 46, h: 285, c: "#315747", band: "#C96D4F" },
    { x: 262, w: 38, h: 240, c: "#E2DAC8", band: "#C96D4F" },
    { x: 304, w: 50, h: 305, c: "#C96D4F", band: "#E4C887" },
  ];
  const baseY = 400;
  return (
    <svg viewBox="0 0 440 460" role="img" aria-label="Minh hoạ một kệ sách với mầm cây nhỏ mọc phía trên" className="mx-auto h-auto w-full max-w-[28rem]">
      {spines.map((s) => (
        <g key={s.x}>
          <rect x={s.x} y={baseY - s.h} width={s.w} height={s.h} fill={s.c} stroke="#30332D" strokeWidth="2" />
          <rect x={s.x} y={baseY - s.h + 24} width={s.w} height="8" fill={s.band} stroke="#30332D" strokeWidth="1.5" />
          <rect x={s.x} y={baseY - 38} width={s.w} height="8" fill={s.band} stroke="#30332D" strokeWidth="1.5" />
          <rect x={s.x + s.w / 2 - 8} y={baseY - s.h / 2 - 28} width="16" height="56" rx="1" fill="none" stroke="#30332D" strokeWidth="1.5" opacity="0.55" />
        </g>
      ))}
      {/* cuốn sách nghiêng */}
      <g transform={`rotate(14 372 ${baseY})`}>
        <rect x="358" y={baseY - 255} width="42" height="255" fill="#315747" stroke="#30332D" strokeWidth="2" />
        <rect x="358" y={baseY - 231} width="42" height="8" fill="#E4C887" stroke="#30332D" strokeWidth="1.5" />
        <rect x="358" y={baseY - 38} width="42" height="8" fill="#E4C887" stroke="#30332D" strokeWidth="1.5" />
      </g>
      {/* mầm cây mọc từ cuốn sách cao nhất */}
      <g transform="translate(329 95)">
        <path d="M0 20C0 -10 -2 -30 8 -52" fill="none" stroke="#315747" strokeWidth="4" strokeLinecap="round" />
        <path d="M8 -52C32 -86 74 -82 82 -62C66 -38 30 -36 8 -52Z" fill="#315747" stroke="#30332D" strokeWidth="2" />
        <path d="M-1 -12C-26 -38 -62 -38 -72 -22C-58 2 -22 6 -1 -12Z" fill="#C96D4F" stroke="#30332D" strokeWidth="2" />
        <path d="M10 -50C30 -58 52 -62 70 -62" fill="none" stroke="#30332D" strokeWidth="1.3" opacity="0.5" />
      </g>
      {/* kệ */}
      <rect x="10" y={baseY} width="420" height="16" fill="#30332D" />
      <rect x="22" y={baseY + 16} width="396" height="8" fill="#30332D" opacity="0.18" />
    </svg>
  );
}
