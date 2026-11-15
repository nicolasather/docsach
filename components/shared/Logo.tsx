export function SproutMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <path d="M16 29V14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M16 15C16 8.5 11 5.5 5 6c0 6.5 4.5 9.5 11 9Z" fill="currentColor" />
      <path d="M16 12c0-5 3.6-8 9-8 0 5.2-3.6 8.2-9 8Z" fill="#C96D4F" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 ${light ? "text-paper" : "text-forest"}`}>
      <SproutMark />
      <span className="font-serif text-[1.45rem] font-bold tracking-tight">Mầm Đọc</span>
    </span>
  );
}
