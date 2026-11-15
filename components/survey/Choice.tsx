"use client";

import { useId } from "react";

interface Opt<T extends string | number | null> {
  id: T;
  label: string;
}

const tile =
  "flex min-h-[3.5rem] w-full cursor-pointer items-center gap-3 rounded-[4px] border-2 border-line bg-paper px-4 py-3 text-left text-[1.02rem] leading-snug transition-colors hover:border-forest peer-checked:border-forest peer-checked:bg-forest peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-forest peer-disabled:cursor-not-allowed peer-disabled:opacity-45 peer-disabled:hover:border-line peer-checked:[&_svg]:opacity-100";

const Check = () => (
  <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 opacity-0" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="m4 10.5 4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Chọn một đáp án (radio). */
export function SingleChoice<T extends string | number | null>({
  legend,
  hint,
  options,
  value,
  onChange,
  columns = 1,
  large = false,
}: {
  legend: string;
  hint?: string;
  options: Opt<T>[];
  value: T;
  onChange: (v: T) => void;
  columns?: 1 | 2 | 3 | 5;
  large?: boolean;
}) {
  const name = useId();
  const cols = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 5: "grid-cols-2 sm:grid-cols-5" }[columns];
  return (
    <fieldset className="min-w-0">
      <legend className="mb-1 font-serif text-xl font-semibold">{legend}</legend>
      {hint && <p className="mb-3 text-[0.95rem] text-ink-soft">{hint}</p>}
      <div className={`mt-3 grid gap-3 ${cols}`}>
        {options.map((o) => (
          <label key={String(o.id)} className="relative block">
            <input
              type="radio"
              name={name}
              className="peer visually-hidden"
              checked={value === o.id}
              onChange={() => onChange(o.id)}
            />
            <span className={`${tile} ${large ? "min-h-[5.5rem] flex-col justify-center text-center" : ""}`}>
              {large ? o.label : <><span className="flex-1">{o.label}</span><Check /></>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Chọn nhiều đáp án (checkbox), có thể giới hạn số lượng. */
export function MultiChoice<T extends string>({
  legend,
  hint,
  options,
  values,
  onChange,
  max,
  columns = 2,
}: {
  legend: string;
  hint?: string;
  options: Opt<T>[];
  values: T[];
  onChange: (v: T[]) => void;
  max?: number;
  columns?: 1 | 2 | 3;
}) {
  const full = max !== undefined && values.length >= max;
  const cols = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3" }[columns];
  return (
    <fieldset className="min-w-0">
      <legend className="mb-1 font-serif text-xl font-semibold">{legend}</legend>
      {hint && <p className="mb-1 text-[0.95rem] text-ink-soft">{hint}</p>}
      {max !== undefined && (
        <p className="mb-3 text-sm font-semibold text-forest" aria-live="polite">
          Đã chọn {values.length}/{max}
          {full ? ". Bỏ chọn một mục để chọn mục khác." : ""}
        </p>
      )}
      <div className={`grid gap-3 ${cols}`}>
        {options.map((o) => {
          const checked = values.includes(o.id as T);
          return (
            <label key={o.id as string} className="relative block">
              <input
                type="checkbox"
                className="peer visually-hidden"
                checked={checked}
                disabled={full && !checked}
                onChange={() =>
                  onChange(checked ? values.filter((v) => v !== o.id) : [...values, o.id as T])
                }
              />
              <span className={tile}>
                <span className="flex-1">{o.label}</span>
                <Check />
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
