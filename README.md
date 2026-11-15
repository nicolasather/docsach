# Mầm Đọc

Website gợi ý sách cho học sinh tiểu học (lớp 1–5), tiếng Việt. Phụ huynh trả lời 5 bước khảo sát ngắn, nhận danh sách sách kèm lý do vì sao hợp với bé, rồi sang nhà sách bên ngoài để mua. Không cần tài khoản.

**Trạng thái:** danh mục sách **đang để trống** (`data/books.json` = `[]`). Mọi trang đã chạy và có trạng thái trống. Sách sẽ được thêm dần, xem `docs/HUONG-DAN-THEM-SACH.md`.

## Chạy trên máy

Yêu cầu: Node.js 20 trở lên.

```bash
npm install
npm run dev        # mở http://localhost:3000
```

| Lệnh | Việc làm |
|---|---|
| `npm run dev` | Chạy thử khi đang chỉnh sửa |
| `npm run build` rồi `npm start` | Bản chạy thật |
| `npm run kiem-tra-sach` | Kiểm tra `data/books.json`, báo lỗi tiếng Việt, ghi `nhat-ky.txt` |
| `npm test` | Kiểm thử bộ máy gợi ý, bộ lọc, bộ kiểm tra dữ liệu |
| `npm run lint` / `npm run typecheck` | Kiểm tra mã nguồn |

## Giao diện (bản thiết kế lại)

- Phong cách "bìa sách tranh": bốn màu đặc (xanh cobalt, vàng, san hô, bạc hà) trên nền kem, viền mực, bóng cứng. Không chuyển sắc, không phát sáng, không kính mờ.
- Chữ: Bricolage Grotesque (tiêu đề) và Be Vietnam Pro (nội dung), đều có đủ dấu tiếng Việt.
- Chiều sâu: sách 3D bằng CSS thuần (`components/three-d/Book3D.tsx`, sáu mặt, không thư viện, không canvas). Dùng cho cảnh hero, bìa sách, chồng sách, bậc thang lớp.
- Chuyển động: scroll-driven animation của CSS (`animation-timeline: view()`), mỗi loại một nhịp. Trình duyệt không hỗ trợ thì nội dung hiện sẵn. Tắt hết khi người dùng bật `prefers-reduced-motion`. Chỉ có hero nghiêng theo con trỏ dùng JavaScript (`HeroScene.tsx`).
- Hình hero, bậc thang lớp, chồng sách là tranh minh hoạ thương hiệu, không phải bìa sách thật. Bìa thật chỉ hiện khi `coverUrl` có trong dữ liệu.
- Bảng màu và độ tương phản (WCAG) ghi ở đầu `app/globals.css`.

## Các trang

`/` Trang chủ · `/survey` Khảo sát · `/recommendations` Kết quả · `/books` Khám phá và lọc · `/books/[slug]` Chi tiết sách · `/collections` và `/collections/[slug]` Bộ sưu tập · `/parents` và `/parents/[slug]` Góc phụ huynh · `/wishlist` Sách đã lưu

## Logic gợi ý (`lib/recommendation-engine.ts`, `lib/matching-utils.ts`)

1. **Loại** sách ngoài khoảng lớp của bé (điều kiện bắt buộc, không phải điểm).
2. **Chấm** từng tiêu chí 0–1 rồi nhân trọng số: chủ đề 30 · mức đọc 25 · kiểu sách 15 · mục tiêu 15 · thời lượng 10 · ngôn ngữ 3 + ngân sách 2.
3. Tiêu chí bé bỏ qua, hoặc sách chưa có dữ liệu (ví dụ chưa có giá), **bị bỏ khỏi phép tính** và trọng số được chia lại, không phạt cũng không thưởng.
4. **Xếp hạng** và chia 3 nhóm: *Phù hợp nhất* · *Mở rộng thế giới* (chủ đề ngoài sở thích, vẫn vừa sức) · *Đọc cùng bố mẹ* (sách đánh dấu `sharedReading` hoặc khó hơn mức đọc của bé). Một sách chỉ xuất hiện ở một nhóm.
5. **Lý do** được tạo từ chính các thuộc tính đã khớp. Giao diện không hiển thị phần trăm hay điểm số.

## Dữ liệu và quyền riêng tư

- Sách: `data/books.json` (kiểu dữ liệu: `types/book.ts`, bảng mã: `lib/taxonomy.ts`).
- Bộ sưu tập là **quy tắc lọc** trong `data/collections.ts`, tự có sách khi danh mục được bổ sung.
- Bài Góc phụ huynh: `data/parents.ts` (bản nháp biên tập, cần người phụ trách rà soát trước khi công khai).
- Không hỏi tên, ngày sinh, trường của bé. Câu trả lời khảo sát chỉ nằm trong `sessionStorage` (mất khi đóng tab). Danh sách sách đã lưu nằm trong `localStorage`, chỉ chứa mã sách. Không có analytics hay máy chủ lưu dữ liệu.
- Không có giá, ISBN, đánh giá hay link mua nào được tự sinh. Thiếu dữ liệu thì không hiển thị.

## Triển khai (Vercel)

Import repo này trên vercel.com (Framework: Next.js, các cài đặt mặc định). Không cần biến môi trường.

## Giới hạn hiện tại

- Chưa có sách thật, nên bộ gợi ý mới được kiểm thử bằng dữ liệu thử (trong `scripts/test-engine.ts`).
- Ảnh bìa, giá, link nhà sách cần được xác minh và cấp quyền sử dụng khi thêm sách.
- Chưa kiểm thử tự động trên trình duyệt thật.
