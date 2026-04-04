"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES, type Lesson } from "@/lib/lessons-data";

interface SearchResult {
  lesson: Lesson;
  categoryId: string;
  categoryName: string;
  path: string;
}

export function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();

  const buildResults = useCallback((q: string): SearchResult[] => {
    if (!q.trim()) return [];
    const lower = q.toLowerCase();
    const found: SearchResult[] = [];
    for (const cat of CATEGORIES) {
      for (const lesson of cat.lessons) {
        if (
          lesson.title.toLowerCase().includes(lower) ||
          lesson.description.toLowerCase().includes(lower) ||
          cat.name.toLowerCase().includes(lower)
        ) {
          found.push({
            lesson,
            categoryId: cat.id,
            categoryName: cat.name,
            path: `${cat.path}/${lesson.id}`,
          });
          if (found.length >= 10) return found;
        }
      }
    }
    return found;
  }, []);

  useEffect(() => {
    setResults(buildResults(query));
  }, [query, buildResults]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSelect = (path: string) => {
    router.push(path);
    setOpen(false);
    setQuery("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-800 border border-gray-700 text-gray-400 hover:text-gray-200 hover:border-gray-600 transition-colors text-sm"
        aria-label="検索"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <span className="hidden sm:inline">検索</span>
        <kbd className="hidden sm:inline text-xs bg-gray-700 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Modal */}
          <div
            className="relative w-full max-w-xl bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800">
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="レッスンを検索..."
                className="flex-1 bg-transparent text-gray-100 placeholder-gray-500 outline-none text-sm"
              />
              <button
                onClick={() => setOpen(false)}
                className="text-xs text-gray-500 hover:text-gray-300 bg-gray-800 px-2 py-1 rounded font-mono"
              >
                ESC
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {query.trim() === "" ? (
                <p className="text-center text-gray-500 text-sm py-8">
                  キーワードを入力してレッスンを検索
                </p>
              ) : results.length === 0 ? (
                <p className="text-center text-gray-500 text-sm py-8">
                  「{query}」に一致するレッスンが見つかりません
                </p>
              ) : (
                <ul>
                  {results.map((r) => (
                    <li key={`${r.categoryId}-${r.lesson.id}`}>
                      <button
                        className="w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors border-b border-gray-800/50 last:border-0"
                        onClick={() => handleSelect(r.path)}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium text-gray-100">
                            {r.lesson.title}
                          </span>
                          <span className="text-xs text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded shrink-0">
                            {r.categoryName}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                          {r.lesson.description}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
