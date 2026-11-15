import type { CSSProperties, ReactNode } from "react";

type Dim = number | string;

/**
 * Khối sách 3D bằng CSS thuần (6 mặt). Không dùng thư viện, không dùng canvas.
 * - w, h, d: rộng, cao, dày (số = đơn vị --u của cảnh, chuỗi = giá trị CSS).
 * - front/back/left/right/top: nội dung tuỳ chọn trên từng mặt.
 */
export function Book3D({
  w,
  h,
  d,
  face = "var(--color-cobalt)",
  side,
  top,
  front,
  topFace,
  frontPages = false,
  topPages = true,
  rightPages = false,
  className = "",
  style,
}: {
  w: Dim;
  h: Dim;
  d: Dim;
  face?: string;
  side?: string;
  top?: string;
  front?: ReactNode;
  topFace?: ReactNode;
  /** Mặt trước là mép giấy (sách nằm ngang, hướng cạnh trang về phía người xem) */
  frontPages?: boolean;
  /** Mặt trên là mép giấy có vạch (sách đứng). Sách nằm thì để false để thấy màu bìa. */
  topPages?: boolean;
  /** Mặt phải là mép giấy (bìa sách nhìn từ phía trước) */
  rightPages?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const u = (v: Dim) => (typeof v === "number" ? `calc(var(--u) * ${v})` : v);
  const vars = {
    "--w": u(w),
    "--h": u(h),
    "--d": u(d),
    "--face": face,
    "--side": side,
    "--top": top,
    ...style,
  } as CSSProperties;
  return (
    <div className={`b3 ${className}`} style={vars} aria-hidden="true">
      <i className={`f-front edge ${frontPages ? "pages" : ""}`}>{front}</i>
      <i className="f-back edge" />
      <i className={`f-right edge ${rightPages ? "pages-v" : ""}`} />
      <i className="f-left edge" />
      <i className={`f-top edge ${topPages ? "pages" : ""}`}>{topFace}</i>
      <i className="f-bottom" />
    </div>
  );
}
