"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Search } from "./search";
import { ThemeToggle } from "./theme-toggle";

interface NavGroup {
  label: string;
  items: Array<{ href: string; label: string }>;
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "入門",
    items: [
      { href: "/learn/html", label: "HTML" },
      { href: "/learn/css", label: "CSS" },
      { href: "/learn/javascript", label: "JS" },
    ],
  },
  {
    label: "フロントエンド",
    items: [
      { href: "/learn/react", label: "React" },
      { href: "/learn/typescript", label: "TS" },
      { href: "/learn/nextjs", label: "Next.js" },
      { href: "/learn/state-mgmt", label: "状態管理" },
    ],
  },
  {
    label: "バックエンド",
    items: [
      { href: "/learn/nodejs", label: "Node.js" },
      { href: "/learn/database", label: "DB" },
      { href: "/learn/graphql", label: "GraphQL" },
      { href: "/learn/websocket", label: "WS" },
    ],
  },
  {
    label: "開発ツール",
    items: [
      { href: "/learn/git", label: "Git" },
      { href: "/learn/testing", label: "テスト" },
      { href: "/learn/storybook", label: "Storybook" },
      { href: "/learn/openapi", label: "API仕様" },
    ],
  },
  {
    label: "インフラ・運用",
    items: [
      { href: "/learn/deploy", label: "デプロイ" },
      { href: "/learn/infra", label: "インフラ" },
      { href: "/learn/monitoring", label: "監視" },
      { href: "/learn/security", label: "セキュリティ" },
    ],
  },
  {
    label: "スキルアップ",
    items: [
      { href: "/learn/design", label: "設計" },
      { href: "/learn/algorithm", label: "アルゴリズム" },
      { href: "/learn/performance", label: "性能" },
      { href: "/learn/agile", label: "アジャイル" },
      { href: "/learn/code-review", label: "レビュー" },
    ],
  },
  {
    label: "実践",
    items: [
      { href: "/learn/project", label: "プロジェクト" },
      { href: "/glossary", label: "単語帳" },
    ],
  },
];

const TOP_ITEMS = [
  { href: "/", label: "ホーム" },
  { href: "/dashboard", label: "ダッシュボード" },
  { href: "/playground", label: "フリースペース" },
];

function DropdownGroup({ group, isActive }: { group: NavGroup; isActive: (href: string) => boolean }) {
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
          hasActiveItem ? "bg-indigo-500/20 text-indigo-400" : "text-gray-400 hover:text-gray-100 hover:bg-gray-800"
        }`}
      >
        {group.label}
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-1 min-w-[140px] z-50">
          {group.items.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
              className={`block px-3 py-2 text-xs transition-colors ${
                isActive(item.href) ? "bg-indigo-500/20 text-indigo-400" : "text-gray-300 hover:text-gray-100 hover:bg-gray-700"
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
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top row: Logo + Right side */}
        <div className="h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-white tracking-tight shrink-0">
            <span className="text-indigo-400">&lt;</span>CodeLearn<span className="text-indigo-400">/&gt;</span>
          </Link>

          {/* Search + Theme + Hamburger */}
          <div className="flex items-center gap-2">
            <Search />
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              aria-label="メニューを開く"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
                  ? "bg-indigo-500/20 text-indigo-400"
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

      {/* Mobile menu - categorized */}
      {isOpen && (
        <nav className="md:hidden border-t border-gray-800 bg-gray-900/95 backdrop-blur-md max-h-[80vh] overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 py-3">
            {/* Top items */}
            <div className="flex gap-2 mb-4">
              {TOP_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-semibold text-center transition-colors ${
                    isActive(item.href)
                      ? "bg-indigo-500/15 text-indigo-400"
                      : "text-gray-300 bg-gray-800/50 hover:bg-gray-800"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Grouped items */}
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="mb-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-600 px-1 mb-1.5">
                  {group.label}
                </p>
                <div className="grid grid-cols-3 gap-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium text-center transition-colors ${
                        isActive(item.href)
                          ? "bg-indigo-500/15 text-indigo-400"
                          : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
