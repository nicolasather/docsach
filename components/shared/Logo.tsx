export function SproutMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect x="2" y="2" width="36" height="36" rx="8" fill="var(--color-sun)" stroke="var(--color-ink)" strokeWidth="2.5" />
      <path d="M20 33V19" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M20 20C20 12 14 9 8 10c0 8 5 11 12 10Z" fill="var(--color-mint)" stroke="var(--color-ink)" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M20 16c0-6 4-9 11-9 0 6-4 9-11 9Z" fill="var(--color-coral)" stroke="var(--color-ink)" strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${light ? "text-canvas" : "text-ink"}`}>
      <SproutMark />
      <span className="font-display text-[1.5rem] font-bold leading-none">Mầm Đọc</span>
    </span>
  );
}
