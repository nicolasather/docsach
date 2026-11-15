import { EmptyState } from "@/components/shared/EmptyState";

export default function NotFound() {
  return (
    <div className="container-page py-20">
      <EmptyState title="Không tìm thấy trang này" action={{ href: "/books", label: "Khám phá sách" }}>
        <p>Đường dẫn có thể đã thay đổi hoặc cuốn sách chưa có trong danh mục. Bạn có thể quay lại trang chủ hoặc tìm sách khác.</p>
      </EmptyState>
    </div>
  );
}
