export function ProgressIndicator({ step, total, labels }: { step: number; total: number; labels: string[] }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-semibold text-forest" aria-hidden="true">
          Bước {step + 1} / {total}
        </p>
        <p className="text-sm text-ink-soft" aria-hidden="true">{labels[step]}</p>
      </div>
      <div
        role="progressbar"
        aria-label="Tiến độ khảo sát"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={step + 1}
        aria-valuetext={`Bước ${step + 1} trên ${total}: ${labels[step]}`}
        className="mt-2 grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${total}, 1fr)` }}
      >
        {Array.from({ length: total }, (_, i) => (
          <span key={i} className={`h-1.5 rounded-[1px] transition-colors ${i <= step ? "bg-forest" : "bg-paper-3"}`} />
        ))}
      </div>
    </div>
  );
}
