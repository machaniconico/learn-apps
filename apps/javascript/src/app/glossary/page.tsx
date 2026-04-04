"use client";

import { useState, useMemo } from "react";
import { GLOSSARY, CATEGORY_LABELS, type GlossaryCategory, type GlossaryEntry } from "@/lib/glossary-data";

function FlashCard({ entry, isFlipped, onFlip }: { entry: GlossaryEntry; isFlipped: boolean; onFlip: () => void }) {
  const catInfo = CATEGORY_LABELS[entry.category];
  const colorMap: Record<string, string> = {
    orange: "border-orange-500/40 bg-orange-500/5",
    blue: "border-blue-500/40 bg-blue-500/5",
    yellow: "border-yellow-500/40 bg-yellow-500/5",
    purple: "border-purple-500/40 bg-purple-500/5",
    gray: "border-gray-500/40 bg-gray-500/5",
  };
  const textColorMap: Record<string, string> = {
    orange: "text-orange-400",
    blue: "text-blue-400",
    yellow: "text-yellow-400",
    purple: "text-purple-400",
    gray: "text-gray-400",
  };
  const badgeMap: Record<string, string> = {
    orange: "bg-orange-500/20 text-orange-400",
    blue: "bg-blue-500/20 text-blue-400",
    yellow: "bg-yellow-500/20 text-yellow-400",
    purple: "bg-purple-500/20 text-purple-400",
    gray: "bg-gray-500/20 text-gray-400",
  };

  return (
    <div
      onClick={onFlip}
      className={`cursor-pointer rounded-xl border ${colorMap[catInfo.color]} p-5 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg`}
    >
      {/* Front: term + short description */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <span className={`text-lg font-bold font-mono ${textColorMap[catInfo.color]}`}>
            {entry.term}
          </span>
          {entry.reading && (
            <span className="text-gray-500 text-sm ml-2">({entry.reading})</span>
          )}
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeMap[catInfo.color]}`}>
          {catInfo.label}
        </span>
      </div>
      <p className="text-gray-400 text-sm">{entry.shortDesc}</p>

      {/* Back: detailed explanation (shown when flipped) */}
      {isFlipped && (
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <p className="text-gray-300 text-sm leading-relaxed mb-3">{entry.detail}</p>
          {entry.example && (
            <pre className="bg-gray-900/80 rounded-lg p-3 text-xs overflow-x-auto border border-gray-800">
              <code className="text-gray-300 font-mono">{entry.example}</code>
            </pre>
          )}
          {entry.related && entry.related.length > 0 && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-500">関連:</span>
              {entry.related.map((r) => {
                const related = GLOSSARY.find((g) => g.id === r);
                return related ? (
                  <span key={r} className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                    {related.term}
                  </span>
                ) : null;
              })}
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-gray-600 mt-2 text-right">
        {isFlipped ? "クリックで閉じる" : "クリックで詳細を見る"}
      </p>
    </div>
  );
}

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<GlossaryCategory | "all">("all");
  const [flippedId, setFlippedId] = useState<string | null>(null);

  const categories: (GlossaryCategory | "all")[] = ["all", "html", "css", "javascript", "symbol", "general"];

  const filtered = useMemo(() => {
    return GLOSSARY.filter((entry) => {
      const matchCategory = activeCategory === "all" || entry.category === activeCategory;
      const matchSearch =
        search === "" ||
        entry.term.toLowerCase().includes(search.toLowerCase()) ||
        entry.shortDesc.includes(search) ||
        entry.detail.includes(search) ||
        (entry.reading && entry.reading.includes(search));
      return matchCategory && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-2">
          プログラミング単語帳
        </h1>
        <p className="text-gray-400">
          HTML/CSS/JavaScriptの用語・タグ・記号の意味を個別に解説。タップで詳細を表示。
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="用語を検索..."
          className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          const label = cat === "all" ? "すべて" : CATEGORY_LABELS[cat].label;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Count */}
      <p className="text-sm text-gray-500 mb-4">{filtered.length}件の用語</p>

      {/* Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((entry) => (
          <FlashCard
            key={entry.id}
            entry={entry}
            isFlipped={flippedId === entry.id}
            onFlip={() => setFlippedId(flippedId === entry.id ? null : entry.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">該当する用語が見つかりません</p>
          <p className="text-gray-600 text-sm mt-2">検索ワードやカテゴリを変えてみてください</p>
        </div>
      )}
    </div>
  );
}
