import type { DataStatus } from "@/types/book";

export function DataStatusBadge({ status }: { status: DataStatus }) {
  if (status === "verified") return null;
  const text = status === "demo" ? "Dữ liệu minh hoạ" : "Thông tin chưa đầy đủ";
  return (
    <span className="rounded-sm border border-terracotta-ink/50 px-2 py-0.5 text-sm font-medium text-terracotta-ink">
      {text}
    </span>
  );
}
