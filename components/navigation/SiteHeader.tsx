"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/shared/Logo";
import { useWishlist } from "@/lib/storage";

const LINKS = [
  { href: "/books", label: "Khám phá sách" },
  { href: "/collections", label: "Bộ sưu tập" },
  { href: "/parents", label: "Góc phụ huynh" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { ids } = useWishlist();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="container-page flex min-h-[4.25rem] items-center justify-between gap-4">
        <Link href="/" aria-label="Mầm Đọc — về trang chủ" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`py-2 text-[0.98rem] font-medium hover:text-forest ${
                isActive(l.href)
                  ? "text-forest underline decoration-terracotta decoration-2 underline-offset-8"
                  : "text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/wishlist"
            className="py-2 text-[0.98rem] font-medium text-ink hover:text-forest"
            aria-label={`Sách đã lưu, ${ids.length} cuốn`}
          >
            Sách đã lưu{ids.length > 0 && <span className="ml-1.5 rounded-sm bg-gold px-1.5 py-0.5 text-sm font-semibold text-ink">{ids.length}</span>}
          </Link>
          <Link href="/survey" className="btn btn-primary">Tìm sách cho bé</Link>
        </nav>

        <button
          type="button"
          className="btn btn-outline lg:hidden"
          aria-expanded={open}
          aria-controls="menu-di-dong"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Đóng" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="menu-di-dong" aria-label="Điều hướng chính" className="border-t border-line bg-paper lg:hidden">
          <ul className="container-page flex flex-col py-3">
            {[...LINKS, { href: "/wishlist", label: `Sách đã lưu${ids.length ? ` (${ids.length})` : ""}` }].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className="block border-b border-line py-3.5 text-lg font-medium"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 pb-2">
              <Link href="/survey" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                Tìm sách cho bé
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
