"use client";

import { useEffect, useRef } from "react";
import { Book3D } from "./Book3D";

const C = {
  coral: "var(--color-coral)",
  sun: "var(--color-sun)",
  canvas: "var(--color-canvas)",
  mint: "var(--color-mint)",
  cobalt: "#2d57e0",
  ink: "var(--color-ink)",
};

/** Gáy sách: hai dải màu và một nhãn tròn, mỗi cuốn một kiểu. */
function Spine({ band, kind }: { band: string; kind: number }) {
  return (
    <>
      <b className="absolute inset-x-0 top-[9%] block" style={{ height: "calc(var(--u) * 2)", background: band }} />
      <b className="absolute inset-x-0 top-[9%] mt-[calc(var(--u)*3.2)] block" style={{ height: "calc(var(--u) * 0.7)", background: band }} />
      {kind % 3 === 0 && (
        <b className="absolute left-1/2 top-[48%] block -translate-x-1/2 rounded-full border-2 border-ink" style={{ width: "calc(var(--u) * 3.6)", height: "calc(var(--u) * 3.6)", background: band }} />
      )}
      {kind % 3 === 1 && <b className="absolute inset-x-[22%] bottom-[10%] block border-2 border-ink" style={{ height: "calc(var(--u) * 9)", background: band }} />}
      {kind % 3 === 2 && <b className="absolute inset-x-0 bottom-[12%] block" style={{ height: "calc(var(--u) * 2)", background: band }} />}
    </>
  );
}

const STANDING = [
  { t: 9, h: 54, c: C.coral, b: C.sun },
  { t: 7, h: 64, c: C.sun, b: C.coral },
  { t: 11, h: 58, c: C.canvas, b: C.cobalt },
  { t: 8, h: 46, c: C.mint, b: C.ink },
  { t: 10, h: 68, c: C.coral, b: C.canvas },
  { t: 7, h: 52, c: C.canvas, b: C.coral },
  { t: 9, h: 60, c: C.sun, b: C.ink },
];

/**
 * Cảnh hero: một kệ sách 3D nghiêng theo con trỏ. Đây là tranh minh hoạ thương hiệu,
 * không phải bìa của sách thật nào.
 */
export function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (reduce.matches) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth; // -0.5..0.5
        const ny = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
        el.style.setProperty("--ry", `${(nx * 22).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${(-ny * 14).toFixed(2)}deg`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="scene relative mx-auto w-full select-none"
      style={{ ["--u" as string]: "clamp(3.3px, 0.52vw + 0.9px, 6.2px)", height: "calc(var(--u) * 100)", maxWidth: "calc(var(--u) * 104)" }}
      role="img"
      aria-label="Minh hoạ một kệ sách ba chiều với những cuốn sách nhiều màu và một mầm cây"
    >
      <div ref={ref} className="hero-rig absolute inset-0 grid place-items-center">
        {/* nền: đĩa mặt trời, phẳng, nằm sau cảnh */}
        <div
          className="sd-drift absolute rounded-full border-2 border-ink bg-sun"
          style={{ width: "calc(var(--u) * 38)", height: "calc(var(--u) * 38)", left: "6%", top: "-2%", transform: "translateZ(calc(var(--u) * -60))", ["--drift-from" as string]: "30px", ["--drift-to" as string]: "-50px" }}
        />
        <div
          className="absolute border-2 border-ink bg-coral"
          style={{ width: "calc(var(--u) * 16)", height: "calc(var(--u) * 16)", right: "4%", top: "10%", transform: "translateZ(calc(var(--u) * -30)) rotate(14deg)", clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
        />

        <div className="relative" style={{ transformStyle: "preserve-3d", width: "calc(var(--u) * 84)", height: "calc(var(--u) * 84)" }}>
          {/* tấm kệ */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{ transformStyle: "preserve-3d" }}>
            <Book3D w={92} h={5} d={40} face={C.sun} side={C.sun} top={C.canvas} />
          </div>

          {/* hàng sách đứng, quay gáy ra trước */}
          <div className="absolute left-[3%] flex items-end" style={{ transformStyle: "preserve-3d", bottom: "calc(var(--u) * 5)", gap: "calc(var(--u) * 0.6)" }}>
            {STANDING.map((b, i) => (
              <div key={i} className="hero-book" style={{ ["--i" as string]: i, transformStyle: "preserve-3d" }}>
                <Book3D w={b.t} h={b.h} d={34} face={b.c} side={C.ink} top={C.canvas} front={<Spine band={b.b} kind={i} />} />
              </div>
            ))}
            {/* cuốn đổ nghiêng */}
            <div className="hero-book" style={{ ["--i" as string]: 7, transformStyle: "preserve-3d" }}>
              <div style={{ transformOrigin: "100% 100%", transform: "rotateZ(14deg) translateX(calc(var(--u) * 1))", transformStyle: "preserve-3d" }}>
                <Book3D w={8} h={58} d={34} face={C.cobalt} side={C.ink} top={C.canvas} front={<Spine band={C.sun} kind={4} />} />
              </div>
            </div>
          </div>

          {/* chồng sách nằm trên kệ, phía trước */}
          <div className="absolute right-[2%]" style={{ transformStyle: "preserve-3d", bottom: "calc(var(--u) * 5)", width: "calc(var(--u) * 36)", transform: "translateZ(calc(var(--u) * 20))" }}>
            <div className="hero-book" style={{ ["--i" as string]: 9, transformStyle: "preserve-3d" }}>
              <Book3D w={36} h={7} d={26} face={C.coral} side={C.ink} top={C.coral} frontPages topPages={false} topFace={<b className="absolute left-[10%] top-[18%] block h-[16%] w-[55%] bg-canvas" />} />
            </div>
            <div className="hero-book" style={{ ["--i" as string]: 10, transformStyle: "preserve-3d", marginLeft: "calc(var(--u) * 3)" }}>
              <Book3D w={32} h={6} d={23} face={C.mint} side={C.ink} top={C.mint} frontPages topPages={false} topFace={<b className="absolute left-[12%] top-[20%] block h-[14%] w-[48%] bg-ink" />} />
            </div>
          </div>

          {/* mầm cây mọc từ chồng sách: ba lớp xếp ở độ sâu khác nhau cho có khối */}
          <div className="sprout absolute" style={{ right: "calc(var(--u) * 10)", bottom: "calc(var(--u) * 18)", width: "calc(var(--u) * 20)", transformStyle: "preserve-3d", transform: "translateZ(calc(var(--u) * 24))" }}>
            {[-1.4, -0.7, 0].map((z, i) => (
              <svg
                key={z}
                viewBox="0 0 80 100"
                className={i === 2 ? "relative block w-full" : "absolute inset-0 block w-full"}
                style={{ transform: `translateZ(calc(var(--u) * ${z}))`, filter: i === 2 ? undefined : "brightness(0.78)" }}
                aria-hidden="true"
              >
                <path d="M38 100C38 70 36 50 42 28" fill="none" stroke="#12172b" strokeWidth="9" strokeLinecap="round" />
                <path d="M38 100C38 70 36 50 42 28" fill="none" stroke="var(--color-mint)" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M42 28C54 6 78 8 80 22C72 38 52 40 42 28Z" fill="var(--color-mint)" stroke="#12172b" strokeWidth="3" strokeLinejoin="round" />
                <path d="M38 62C24 44 6 46 2 56C8 72 26 74 38 62Z" fill="var(--color-sun)" stroke="#12172b" strokeWidth="3" strokeLinejoin="round" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
