"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/lessons-data";
import {
  getOverallProgress,
  getCategoryCompletionCount,
  getFinalExamResult,
  getUserName,
  setUserName,
} from "@/lib/progress";

const colorDotMap: Record<string, string> = {
  green: "bg-green-500",
  blue: "bg-blue-500",
  yellow: "bg-yellow-500",
  orange: "bg-orange-500",
  purple: "bg-purple-500",
  red: "bg-red-500",
  cyan: "bg-cyan-500",
  pink: "bg-pink-500",
  teal: "bg-teal-500",
  violet: "bg-violet-500",
  indigo: "bg-indigo-500",
};

const colorBarMap: Record<string, string> = {
  green: "bg-green-500",
  blue: "bg-blue-500",
  yellow: "bg-yellow-500",
  orange: "bg-orange-500",
  purple: "bg-purple-500",
  red: "bg-red-500",
  cyan: "bg-cyan-500",
  pink: "bg-pink-500",
  teal: "bg-teal-500",
  violet: "bg-violet-500",
  indigo: "bg-indigo-500",
};

const categoriesWithCounts = CATEGORIES.map((cat) => ({
  id: cat.id,
  lessonCount: cat.lessons.length,
}));

export default function DashboardPage() {
  const [userName, setUserNameState] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [progress, setProgress] = useState({
    completedLessons: 0,
    totalLessons: 0,
    completedCategories: 0,
    totalCategories: CATEGORIES.length,
    percent: 0,
  });
  const [examResult, setExamResult] = useState<{ score: number; date: string } | null>(null);
  const [categoryStats, setCategoryStats] = useState<
    Array<{ id: string; name: string; color: string; path: string; completed: number; total: number; percent: number }>
  >([]);

  const loadData = () => {
    const name = getUserName();
    setUserNameState(name);
    setNameInput(name);

    const overall = getOverallProgress(categoriesWithCounts);
    setProgress(overall);

    const exam = getFinalExamResult();
    setExamResult(exam);

    const stats = CATEGORIES.map((cat) => {
      const { completed, total, percent } = getCategoryCompletionCount(cat.id, cat.lessons.length);
      return {
        id: cat.id,
        name: cat.name,
        color: cat.color,
        path: cat.path,
        completed,
        total,
        percent,
      };
    });
    setCategoryStats(stats);
  };

  useEffect(() => {
    function init() {
      loadData();
    }
    init();

    const onStorage = (e: StorageEvent) => {
      if (e.key === "csharplearn-progress") {
        loadData();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleSaveName = () => {
    const trimmed = nameInput.trim();
    if (trimmed) {
      setUserName(trimmed);
      setUserNameState(trimmed);
    }
    setEditingName(false);
  };

  const circumference = 2 * Math.PI * 80;
  const dashOffset = circumference - (progress.percent / 100) * circumference;

  const examPassed = examResult !== null && examResult.score >= 80;

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-100">学習ダッシュボード</h1>
            <p className="text-gray-400 mt-1">あなたの学習進捗を確認しましょう</p>
          </div>
          <div className="flex items-center gap-3">
            {editingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                  placeholder="お名前を入力"
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-100 text-sm focus:outline-none focus:border-purple-500"
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="bg-purple-500 hover:bg-purple-400 text-gray-950 font-semibold px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  保存
                </button>
                <button
                  onClick={() => setEditingName(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  キャンセル
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditingName(true)}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm transition-colors"
              >
                <span>
                  {userName ? `${userName} さん` : "名前を設定する"}
                </span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Stats + Ring */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="text-sm text-gray-400 mb-1">完了レッスン数</p>
              <p className="text-2xl font-bold text-gray-100">
                {progress.completedLessons}
                <span className="text-lg font-normal text-gray-500"> / {progress.totalLessons}</span>
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="text-sm text-gray-400 mb-1">完了カテゴリ数</p>
              <p className="text-2xl font-bold text-gray-100">
                {progress.completedCategories}
                <span className="text-lg font-normal text-gray-500"> / {progress.totalCategories}</span>
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="text-sm text-gray-400 mb-1">最終試験スコア</p>
              {examResult ? (
                <p className="text-2xl font-bold text-gray-100">
                  {examResult.score}
                  <span className="text-lg font-normal text-gray-500">点</span>
                  {examPassed && (
                    <span className="ml-2 text-sm font-medium text-purple-400">合格</span>
                  )}
                </p>
              ) : (
                <p className="text-2xl font-bold text-gray-500">未受験</p>
              )}
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="text-sm text-gray-400 mb-1">進捗率</p>
              <p className="text-2xl font-bold text-purple-400">
                {progress.percent}
                <span className="text-lg font-normal text-gray-500">%</span>
              </p>
            </div>
          </div>

          {/* Progress Ring */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center">
            <p className="text-sm text-gray-400 mb-4">総合進捗</p>
            <div className="relative inline-flex items-center justify-center">
              <svg width="200" height="200" className="-rotate-90">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="8"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  style={{ transition: "stroke-dashoffset 0.8s ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-4xl font-bold text-gray-100">{progress.percent}%</p>
                <p className="text-xs text-gray-400 mt-1">完了</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/final-exam"
            className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-400 text-gray-950 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            最終試験を受ける
          </Link>
          {examPassed && (
            <Link
              href="/certificate"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              修了証明書を見る
            </Link>
          )}
        </div>

        {/* Category Progress Grid */}
        <div>
          <h2 className="text-xl font-bold text-gray-100 mb-5">カテゴリ別進捗</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryStats.map((cat) => {
              const dotColor = colorDotMap[cat.color] ?? colorDotMap.purple;
              const barColor = colorBarMap[cat.color] ?? colorBarMap.purple;
              const isComplete = cat.percent === 100 && cat.total > 0;

              return (
                <Link
                  key={cat.id}
                  href={cat.path}
                  className="block bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-xl p-4 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dotColor}`} />
                      <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                        {cat.name}
                      </span>
                    </div>
                    {isComplete && (
                      <svg className="w-5 h-5 text-purple-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mb-2">
                    {cat.completed} / {cat.total} 完了
                  </p>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                      style={{ width: `${cat.percent}%` }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
