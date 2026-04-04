"use client";

import { useState, useMemo } from "react";
import { GLOSSARY_TERMS } from "@/lib/glossary-data";

const ALL_CATEGORIES = ["すべて", "基礎", "ポインタ", "メモリ", "プリプロセッサ", "標準ライブラリ", "データ構造", "ビルド", "入出力"] as const;

const CATEGORY_COLORS: Record<string, string> = {
  "基礎": "bg-teal-500/20 text-teal-400 border-teal-500/30",
  "ポインタ": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "メモリ": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "プリプロセッサ": "bg-violet-500/20 text-violet-400 border-violet-500/30",
  "標準ライブラリ": "bg-green-500/20 text-green-400 border-green-500/30",
  "データ構造": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "ビルド": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  "入出力": "bg-pink-500/20 text-pink-400 border-pink-500/30",
};

export default function GlossaryPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("すべて");

  const filtered = useMemo(() => {
    return GLOSSARY_TERMS.filter((t) => {
      const matchesCategory =
        activeCategory === "すべて" || t.category === activeCategory;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q === "" ||
        t.term.toLowerCase().includes(q) ||
        (t.reading?.toLowerCase().includes(q) ?? false) ||
        t.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">📖</span>
            <h1 className="text-3xl font-bold text-gray-100">C言語用語集</h1>
          </div>
          <p className="text-gray-400">
            C言語プログラミングで頻出する用語を、カテゴリ別にまとめました。
          </p>
          <p className="text-sm text-gray-600 mt-1">
            全{GLOSSARY_TERMS.length}件
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="用語・説明で検索..."
            className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-600 outline-none focus:border-teal-500/50 transition-colors text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                activeCategory === cat
                  ? "bg-teal-500/20 text-teal-400 border-teal-500/40"
                  : "bg-gray-900 text-gray-400 border-gray-700 hover:border-gray-600 hover:text-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        {(query || activeCategory !== "すべて") && (
          <p className="text-sm text-gray-500 mb-4">
            {filtered.length}件を表示中
          </p>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl mb-2">一致する用語が見つかりません</p>
            <p className="text-sm">別のキーワードやカテゴリで試してみてください</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((term) => (
              <div
                key={`${term.term}-${term.category}`}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-gray-100 text-base leading-tight">
                      {term.term}
                    </h3>
                    {term.reading && (
                      <p className="text-xs text-gray-600 mt-0.5">({term.reading})</p>
                    )}
                  </div>
                  <span
                    className={`shrink-0 text-xs px-2 py-0.5 rounded-full border font-medium ${
                      CATEGORY_COLORS[term.category] ?? "bg-gray-700 text-gray-400 border-gray-600"
                    }`}
                  >
                    {term.category}
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {term.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
