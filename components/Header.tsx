"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/stories", label: "家長故事" },
  { href: "/events", label: "活動" },
  { href: "/groups", label: "地區小組" },
  { href: "/resources", label: "資源" },
  { href: "/about", label: "關於" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="topline">
        <p>少比較 · 多陪伴 · 歡迎不同形狀的家庭</p>
      </div>
      <div className="wrap navwrap">
        <Link href="/" className="brand">
          <span className="seal" aria-hidden="true">輕</span>
          <span>
            <strong className="brand-name">ChillParents</strong>
            <small className="brand-sub">輕鬆爸媽 · 香港</small>
          </span>
        </Link>
        <nav className="nav" aria-label="主要">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/join" className="btn btn-primary header-join">加入社群</Link>
        <button
          className="menu-btn"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "關閉" : "選單"}
        </button>
      </div>
      <div id="mobile-nav" className={open ? "mobile-panel open" : "mobile-panel"}>
        <div className="wrap">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
          <Link href="/join">加入社群</Link>
        </div>
      </div>
    </header>
  );
}
