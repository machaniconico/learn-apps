"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Search } from "@/components/search";

const TOP_ITEMS = [
  { href: "/", label: "ホーム" },
  { href: "/dashboard", label: "ダッシュボード" },
  { href: "/freespace", label: "フリースペース" },
];

const NAV_GROUPS = [
  {
    label: "入門",
    items: [
      { href: "/learn/basics", label: "Python基礎" },
      { href: "/learn/control", label: "制御構文" },
      { href: "/learn/functions", label: "関数" },
    ],
  },
  {
    label: "データ構造",
    items: [
      { href: "/learn/lists", label: "リスト・タプル" },
      { href: "/learn/dicts", label: "辞書・集合" },
      { href: "/learn/strings", label: "文字列操作" },
    ],
  },
  {
    label: "OOP",
    items: [
      { href: "/learn/classes", label: "クラス基礎" },
      { href: "/learn/inheritance", label: "継承・応用" },
    ],
  },
  {
    label: "モジュール",
    items: [
      { href: "/learn/stdlib", label: "標準ライブラリ" },
      { href: "/learn/packages", label: "パッケージ管理" },
    ],
  },
  {
    label: "ファイル・データ",
    items: [
      { href: "/learn/fileio", label: "ファイルI/O" },
      { href: "/learn/dataformats", label: "データ形式" },
      { href: "/learn/regex", label: "正規表現" },
    ],
  },
  {
    label: "Web開発",
    items: [
      { href: "/learn/flask", label: "Flask" },
      { href: "/learn/fastapi", label: "FastAPI" },
      { href: "/learn/django", label: "Django" },
    ],
  },
  {
    label: "データサイエンス",
    items: [
      { href: "/learn/numpy", label: "NumPy" },
      { href: "/learn/pandas", label: "Pandas" },
      { href: "/learn/matplotlib", label: "Matplotlib" },
    ],
  },
  {
    label: "テスト・品質",
    items: [
      { href: "/learn/pytest", label: "テスト(pytest)" },
      { href: "/learn/debug", label: "デバッグ" },
    ],
  },
  {
    label: "応用",
    items: [
      { href: "/learn/async", label: "非同期処理" },
      { href: "/learn/typehints", label: "型ヒント" },
    ],
  },
  {
    label: "スキルアップ",
    items: [
      { href: "/learn/algorithm", label: "アルゴリズム" },
      { href: "/learn/design", label: "設計パターン" },
    ],
  },
  {
    label: "実践",
    items: [
      { href: "/learn/vocabulary", label: "単語帳" },
    ],
  },
];

function DropdownGroup({ group, isActive }: { group: typeof NAV_GROUPS[number]; isActive: (href: string) => boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasActiveItem = group.items.some((item) => isActive(item.href));

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
          hasActiveItem ? "bg-green-500/20 text-green-400" : "text-gray-400 hover:text-gray-100 hover:bg-gray-800"
        }`}
      >
        {group.label}
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-1 min-w-[160px] z-50">
          {group.items.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
              className={`block px-3 py-2 text-xs transition-colors ${
                isActive(item.href) ? "bg-green-500/20 text-green-400" : "text-gray-300 hover:text-gray-100 hover:bg-gray-700"
              }`}
            >{item.label}</Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center font-bold text-lg shrink-0">
            <span className="text-green-400">&lt;</span>
            <span className="text-gray-100">PyLearn</span>
            <span className="text-green-400">/&gt;</span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-2 shrink-0">
            <Search />
            <ThemeToggle />
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-100 hover:bg-gray-800 transition-colors"
              aria-label="メニューを開く"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Desktop nav - separate row, wraps */}
        <nav className="hidden md:flex flex-wrap items-center gap-0.5 pb-2">
          {TOP_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-2.5 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                isActive(item.href)
                  ? "bg-green-500/20 text-green-400"
                  : "text-gray-400 hover:text-gray-100 hover:bg-gray-800"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <span className="mx-1 text-gray-700">|</span>
          {NAV_GROUPS.map((group) => (
            <DropdownGroup key={group.label} group={group} isActive={isActive} />
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-800 bg-gray-900 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {TOP_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-green-500/20 text-green-400"
                    : "text-gray-300 hover:text-gray-100 hover:bg-gray-800"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-800 px-4 py-4 space-y-4">
            {NAV_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-3 py-1.5 rounded text-sm transition-colors ${
                        isActive(item.href)
                          ? "bg-green-500/20 text-green-400"
                          : "text-gray-400 hover:text-gray-100 hover:bg-gray-800"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
