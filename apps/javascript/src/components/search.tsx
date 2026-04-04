"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  HTML_LESSONS, CSS_LESSONS, JS_LESSONS, REACT_LESSONS,
  TYPESCRIPT_LESSONS, GIT_LESSONS, NEXTJS_LESSONS, NODEJS_LESSONS,
  DATABASE_LESSONS, TESTING_LESSONS, DEPLOY_LESSONS, DESIGN_LESSONS,
  ALGORITHM_LESSONS, SECURITY_LESSONS, PROJECT_LESSONS,
  STATE_MGMT_LESSONS, PERFORMANCE_LESSONS, MONITORING_LESSONS,
  INFRA_LESSONS, GRAPHQL_LESSONS, WEBSOCKET_LESSONS,
  AGILE_LESSONS, CODE_REVIEW_LESSONS, OPENAPI_LESSONS, STORYBOOK_LESSONS,
  type Lesson,
} from "@/lib/lessons-data";

interface SearchableLesson extends Lesson {
  categoryLabel: string;
  path: string;
}

const ALL_LESSONS: SearchableLesson[] = [
  ...HTML_LESSONS.map((l) => ({ ...l, categoryLabel: "HTML", path: `/learn/html/${l.id}` })),
  ...CSS_LESSONS.map((l) => ({ ...l, categoryLabel: "CSS", path: `/learn/css/${l.id}` })),
  ...JS_LESSONS.map((l) => ({ ...l, categoryLabel: "JavaScript", path: `/learn/javascript/${l.id}` })),
  ...REACT_LESSONS.map((l) => ({ ...l, categoryLabel: "React", path: `/learn/react/${l.id}` })),
  ...TYPESCRIPT_LESSONS.map((l) => ({ ...l, categoryLabel: "TypeScript", path: `/learn/typescript/${l.id}` })),
  ...GIT_LESSONS.map((l) => ({ ...l, categoryLabel: "Git", path: `/learn/git/${l.id}` })),
  ...NEXTJS_LESSONS.map((l) => ({ ...l, categoryLabel: "Next.js", path: `/learn/nextjs/${l.id}` })),
  ...NODEJS_LESSONS.map((l) => ({ ...l, categoryLabel: "Node.js", path: `/learn/nodejs/${l.id}` })),
  ...DATABASE_LESSONS.map((l) => ({ ...l, categoryLabel: "データベース", path: `/learn/database/${l.id}` })),
  ...TESTING_LESSONS.map((l) => ({ ...l, categoryLabel: "テスト", path: `/learn/testing/${l.id}` })),
  ...DEPLOY_LESSONS.map((l) => ({ ...l, categoryLabel: "デプロイ", path: `/learn/deploy/${l.id}` })),
  ...DESIGN_LESSONS.map((l) => ({ ...l, categoryLabel: "設計パターン", path: `/learn/design/${l.id}` })),
  ...ALGORITHM_LESSONS.map((l) => ({ ...l, categoryLabel: "アルゴリズム", path: `/learn/algorithm/${l.id}` })),
  ...SECURITY_LESSONS.map((l) => ({ ...l, categoryLabel: "セキュリティ", path: `/learn/security/${l.id}` })),
  ...PROJECT_LESSONS.map((l) => ({ ...l, categoryLabel: "実践プロジェクト", path: `/learn/project/${l.id}` })),
  ...STATE_MGMT_LESSONS.map((l) => ({ ...l, categoryLabel: "状態管理", path: `/learn/state-mgmt/${l.id}` })),
  ...PERFORMANCE_LESSONS.map((l) => ({ ...l, categoryLabel: "パフォーマンス", path: `/learn/performance/${l.id}` })),
  ...MONITORING_LESSONS.map((l) => ({ ...l, categoryLabel: "モニタリング", path: `/learn/monitoring/${l.id}` })),
  ...INFRA_LESSONS.map((l) => ({ ...l, categoryLabel: "インフラ", path: `/learn/infra/${l.id}` })),
  ...GRAPHQL_LESSONS.map((l) => ({ ...l, categoryLabel: "GraphQL", path: `/learn/graphql/${l.id}` })),
  ...WEBSOCKET_LESSONS.map((l) => ({ ...l, categoryLabel: "WebSocket", path: `/learn/websocket/${l.id}` })),
  ...AGILE_LESSONS.map((l) => ({ ...l, categoryLabel: "アジャイル", path: `/learn/agile/${l.id}` })),
  ...CODE_REVIEW_LESSONS.map((l) => ({ ...l, categoryLabel: "コードレビュー", path: `/learn/code-review/${l.id}` })),
  ...OPENAPI_LESSONS.map((l) => ({ ...l, categoryLabel: "API仕様書", path: `/learn/openapi/${l.id}` })),
  ...STORYBOOK_LESSONS.map((l) => ({ ...l, categoryLabel: "Storybook", path: `/learn/storybook/${l.id}` })),
];

export function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = query.trim()
    ? ALL_LESSONS.filter(
        (l) =>
          l.title.toLowerCase().includes(query.toLowerCase()) ||
          l.description.toLowerCase().includes(query.toLowerCase()) ||
          l.categoryLabel.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10)
    : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    setQuery("");
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-700 text-gray-500 text-sm hover:border-gray-600 hover:text-gray-400 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">検索</span>
        <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded border border-gray-700 text-[10px] font-mono text-gray-600">
          &#8984;K
        </kbd>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 z-[60]" onClick={close} />

      {/* Modal */}
      <div className="fixed inset-x-4 top-[15%] z-[70] max-w-lg mx-auto" ref={containerRef}>
        <div className="rounded-xl bg-gray-900 border border-gray-700 shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-4 border-b border-gray-800">
            <svg className="w-5 h-5 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="レッスンを検索..."
              className="flex-1 py-3 bg-transparent text-white text-sm outline-none placeholder:text-gray-600"
            />
            <kbd
              onClick={close}
              className="px-1.5 py-0.5 rounded border border-gray-700 text-[10px] font-mono text-gray-600 cursor-pointer hover:text-gray-400"
            >
              ESC
            </kbd>
          </div>

          {query.trim() && (
            <div className="max-h-80 overflow-y-auto p-2">
              {results.length > 0 ? (
                results.map((lesson) => (
                  <Link
                    key={lesson.path}
                    href={lesson.path}
                    onClick={close}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-800 transition-colors group"
                  >
                    <span className="text-xs font-medium text-gray-500 w-20 shrink-0 truncate">
                      {lesson.categoryLabel}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium truncate group-hover:text-indigo-400">
                        {lesson.title}
                      </p>
                      <p className="text-xs text-gray-600 truncate">{lesson.description}</p>
                    </div>
                    <span className="text-gray-700 text-sm">&#8594;</span>
                  </Link>
                ))
              ) : (
                <p className="text-center text-gray-600 py-6 text-sm">
                  見つかりませんでした
                </p>
              )}
            </div>
          )}

          {!query.trim() && (
            <div className="p-4 text-center text-gray-600 text-sm">
              レッスン名やキーワードで検索できます
            </div>
          )}
        </div>
      </div>
    </>
  );
}
