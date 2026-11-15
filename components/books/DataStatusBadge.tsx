import type { DataStatus } from "@/types/book";

export function DataStatusBadge({ status }: { status: DataStatus }) {
  if (status === "verified") return null;
  const text = status === "demo" ? "Dữ liệu minh hoạ" : "Thông tin chưa đầy đủ";
  return (
    <span className="rounded-sm border border-coral-ink/50 px-2 py-0.5 text-sm font-medium text-coral-ink">
      {text}
    </span>
  );
}
