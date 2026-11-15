# Hướng dẫn thêm sách vào Mầm Đọc

Toàn bộ sách nằm trong **một file duy nhất: `data/books.json`**. Không cần sửa mã nguồn.
Hiện file này để trống: `[]`.

## Quy trình thêm một cuốn

1. Mở `data/books.json`.
2. Dán một khối mẫu bên dưới vào giữa cặp `[` `]`. Nhiều cuốn thì ngăn cách bằng dấu phẩy `,`.
3. Điền thông tin **lấy từ nguồn chính thức** (trang NXB Kim Đồng, FAHASA, Phương Nam…). Không biết thì **xoá hẳn dòng đó**, không điền bừa.
4. Chạy kiểm tra: `npm run kiem-tra-sach`. Lỗi hiện bằng tiếng Việt kèm cách sửa, và được ghi vào `nhat-ky.txt`.
5. Chạy `npm run dev` và mở thử trang cuốn sách.

Cuốn nào sai định dạng sẽ **bị bỏ qua** (website không bị hỏng) và được báo trong bước 4.

## Mẫu một cuốn (thay phần trong ngoặc vuông)

```json
{
  "id": "[mã duy nhất, ví dụ sach-001]",
  "slug": "[địa chỉ trang, chữ thường không dấu, ví dụ ten-sach]",
  "title": "[Tên sách]",
  "author": "[Tác giả]",
  "publisher": "[Nhà xuất bản]",
  "isbn": "[ISBN đã đối chiếu]",
  "coverUrl": "/covers/ten-sach.jpg",
  "gradeRange": { "min": 2, "max": 4 },
  "ageRange": { "min": 7, "max": 10 },
  "readingLevel": 2,
  "genres": ["truyen-ngan"],
  "interests": ["phieu-luu", "dong-vat"],
  "goals": ["giai-tri", "thoi-quen"],
  "format": "can-bang",
  "language": "vi",
  "estimatedReadingTime": { "minMinutes": 30, "maxMinutes": 60 },
  "pageCount": 120,
  "description": "[Mô tả không tiết lộ nội dung quan trọng]",
  "childFriendlyDescription": "[Một câu mô tả dành cho bé]",
  "parentNotes": "[Gợi ý cho bố mẹ, câu hỏi trò chuyện]",
  "contentNotes": "[Lưu ý nội dung nếu có]",
  "sharedReading": true,
  "price": 85000,
  "priceUpdatedAt": "15/11/2026",
  "priceSource": "[Tên nhà sách đã lấy giá]",
  "retailerLinks": [
    { "retailer": "FAHASA", "url": "https://[đường dẫn đúng trang sách]" }
  ],
  "sourceUrl": "https://[trang nguồn đã đối chiếu]",
  "dataStatus": "verified"
}
```

## Bắt buộc và tuỳ chọn

**Bắt buộc:** `id`, `slug`, `title`, `author`, `gradeRange`, `readingLevel`, `genres`, `interests`, `goals`, `format`, `language`, `description`, `dataStatus`.
**Tuỳ chọn** (không biết thì xoá dòng): tất cả còn lại.

## Bảng mã

| Trường | Giá trị hợp lệ |
|---|---|
| `gradeRange` | `min`, `max` từ 1 đến 5 (lớp). Sách ngoài lớp của bé sẽ bị loại khỏi gợi ý |
| `readingLevel` | 1 mới tập đọc · 2 truyện ngắn · 3 đọc khá · 4 sách dài, nhiều nội dung |
| `genres` (phần tử đầu là thể loại chính) | `sach-tranh`, `truyen-tranh`, `truyen-ngan`, `truyen-dai`, `co-tich-dan-gian`, `tho`, `sach-kien-thuc`, `sach-khoa-hoc`, `sach-lich-su-dia-ly`, `ky-nang-song`, `sach-hoat-dong` |
| `interests` | `dong-vat`, `khoa-hoc`, `thien-nhien`, `kham-pha-the-gioi`, `phieu-luu`, `fantasy`, `lich-su`, `cong-nghe`, `hai-huoc`, `tinh-ban-gia-dinh`, `bi-an-giai-do`, `nghe-thuat` |
| `goals` | `thoi-quen`, `giai-tri`, `kien-thuc`, `tu-duy`, `cam-xuc` |
| `format` | `nhieu-tranh`, `can-bang`, `chu-va-truyen`, `nhieu-nhan-vat`, `kien-thuc-hinh-anh` |
| `language` | `vi`, `song-ngu`, `en` |
| `dataStatus` | `verified` (đã đối chiếu, **bắt buộc có `sourceUrl`**), `incomplete` (còn thiếu), `demo` (minh hoạ, website gắn nhãn) |
| `retailer` | `FAHASA`, `Kim Đồng`, `Phương Nam`, hoặc `Khác` (kèm `label` là tên nhà sách) |

## Quy tắc dữ liệu

- **Giá:** chỉ hiển thị khi có đủ `price` + `priceUpdatedAt` (dd/mm/yyyy) + `priceSource`. Thiếu một trong ba thì bỏ cả ba.
- **ISBN:** chỉ hiển thị khi `dataStatus` là `verified`.
- **Link mua sách:** phải bắt đầu bằng `https://` và dẫn đúng trang cuốn sách. Không dùng link affiliate tự tạo.
- **Ảnh bìa:** dùng ảnh bìa thật. Chép file vào `public/covers/` rồi ghi `"coverUrl": "/covers/ten-file.jpg"`. Thiếu ảnh thì website tự hiện bìa thay thế. Cần xác nhận quyền sử dụng ảnh bìa với nhà xuất bản.
- Trước khi công khai, xoá mọi bản ghi `demo`.
