"use client";

import { useWishlist } from "@/lib/storage";

export function WishlistButton({
  bookId,
  title,
  variant = "outline",
  className = "",
}: {
  bookId: string;
  title: string;
  variant?: "outline" | "text";
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const saved = has(bookId);
  const base =
    variant === "outline"
      ? `btn ${saved ? "btn-primary" : "btn-outline"}`
      : "inline-flex min-h-11 items-center gap-2 py-2 font-semibold text-forest hover:underline";

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={`${saved ? "Bỏ lưu" : "Lưu"} sách ${title}`}
      onClick={() => toggle(bookId)}
      className={`${base} ${className}`}
    >
      <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
        <path d="M5 3h10v14l-5-3.5L5 17V3Z" strokeLinejoin="round" />
      </svg>
      {saved ? "Đã lưu" : "Lưu sách"}
    </button>
  );
}
