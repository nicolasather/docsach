/** Hình minh hoạ chủ đề: hình khối phẳng, viền mực, bảng màu của site. */
const S = { stroke: "var(--color-ink)", strokeWidth: 3, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

export function Pictogram({ id, className = "" }: { id: string; className?: string }) {
  const body = (() => {
    switch (id) {
      case "phieu-luu-kham-pha":
        return (<><circle cx="50" cy="50" r="34" fill="var(--color-canvas)" {...S} /><path d="M50 22 62 50 50 78 38 50Z" fill="var(--color-coral)" {...S} /><circle cx="50" cy="50" r="4" fill="var(--color-ink)" /></>);
      case "khoa-hoc-thien-nhien":
        return (<><path d="M20 78C16 40 40 16 80 18c2 40-18 62-60 60Z" fill="var(--color-mint)" {...S} /><path d="M22 76C38 56 52 42 70 28" fill="none" {...S} /></>);
      case "dong-vat":
        return (<><ellipse cx="50" cy="64" rx="20" ry="16" fill="var(--color-canvas)" {...S} /><circle cx="24" cy="44" r="8" fill="var(--color-canvas)" {...S} /><circle cx="40" cy="30" r="8" fill="var(--color-canvas)" {...S} /><circle cx="60" cy="30" r="8" fill="var(--color-canvas)" {...S} /><circle cx="76" cy="44" r="8" fill="var(--color-canvas)" {...S} /></>);
      case "lich-su":
        return (<><path d="M14 36 50 14l36 22Z" fill="var(--color-canvas)" {...S} /><rect x="22" y="40" width="10" height="38" fill="var(--color-canvas)" {...S} /><rect x="45" y="40" width="10" height="38" fill="var(--color-canvas)" {...S} /><rect x="68" y="40" width="10" height="38" fill="var(--color-canvas)" {...S} /><rect x="12" y="78" width="76" height="9" fill="var(--color-sun)" {...S} /></>);
      case "fantasy":
        return (<><path d="M50 10 59 38 88 38 65 55 74 84 50 66 26 84 35 55 12 38 41 38Z" fill="var(--color-sun)" {...S} /></>);
      case "hai-huoc":
        return (<><circle cx="50" cy="50" r="36" fill="var(--color-sun)" {...S} /><circle cx="37" cy="42" r="4.5" fill="var(--color-ink)" /><circle cx="63" cy="42" r="4.5" fill="var(--color-ink)" /><path d="M30 58c6 16 34 16 40 0Z" fill="var(--color-canvas)" {...S} /></>);
      case "ky-nang-cam-xuc":
        return (<path d="M50 84C14 58 14 22 36 20c10 0 14 8 14 8s4-8 14-8c22 2 22 38-14 64Z" fill="var(--color-coral)" {...S} />);
      case "tu-duy-sang-tao":
        return (<><circle cx="50" cy="42" r="24" fill="var(--color-sun)" {...S} /><rect x="38" y="68" width="24" height="12" rx="2" fill="var(--color-canvas)" {...S} /><path d="M50 8v8M16 24l6 6M84 24l-6 6M8 48h8M84 48h8" fill="none" {...S} /></>);
      default:
        return <rect x="20" y="20" width="60" height="60" fill="var(--color-canvas)" {...S} />;
    }
  })();
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {body}
    </svg>
  );
}
