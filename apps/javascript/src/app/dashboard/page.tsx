"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES, getAllLessons } from "@/lib/lessons-data";
import {
  getCategoryCompletionCount,
  isCategoryComplete,
  getOverallProgress,
  getFinalExamResult,
  getUserName,
  setUserName,
} from "@/lib/progress";

const COLOR_MAP: Record<string, { bar: string; text: string; ring: string }> = {
  orange: { bar: "bg-orange-500", text: "text-orange-400", ring: "stroke-orange-500" },
  blue: { bar: "bg-blue-500", text: "text-blue-400", ring: "stroke-blue-500" },
  yellow: { bar: "bg-yellow-500", text: "text-yellow-400", ring: "stroke-yellow-500" },
  green: { bar: "bg-green-500", text: "text-green-400", ring: "stroke-green-500" },
  purple: { bar: "bg-purple-500", text: "text-purple-400", ring: "stroke-purple-500" },
  red: { bar: "bg-red-500", text: "text-red-400", ring: "stroke-red-500" },
  cyan: { bar: "bg-cyan-500", text: "text-cyan-400", ring: "stroke-cyan-500" },
  pink: { bar: "bg-pink-500", text: "text-pink-400", ring: "stroke-pink-500" },
  teal: { bar: "bg-teal-500", text: "text-teal-400", ring: "stroke-teal-500" },
  violet: { bar: "bg-violet-500", text: "text-violet-400", ring: "stroke-violet-500" },
  indigo: { bar: "bg-indigo-500", text: "text-indigo-400", ring: "stroke-indigo-500" },
};

function getColor(color: string) {
  return COLOR_MAP[color] || COLOR_MAP.blue;
}

export default function DashboardPage() {
  const [mounted] = useState(() => typeof window !== "undefined");
  const [name, setName] = useState(() => typeof window !== "undefined" ? getUserName() : "");

  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="animate-pulse h-8 w-48 bg-gray-800 rounded mb-8" />
      </div>
    );
  }

  const categoriesWithCounts = CATEGORIES.map((cat) => ({
    id: cat.id,
    lessonCount: getAllLessons(cat.id).length,
  }));

  const overall = getOverallProgress(categoriesWithCounts);
  const examResult = getFinalExamResult();
  const allComplete = overall.completedCategories === overall.totalCategories;
  const examPassed = examResult !== null && examResult.score >= 80;
  const showCertificate = allComplete || examPassed;

  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (overall.percent / 100) * circumference;

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setName(v);
    setUserName(v);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-white mb-8">
        学習ダッシュボード
      </h1>

      {/* User name + overall progress */}
      <div className="grid md:grid-cols-[1fr_auto] gap-8 mb-10">
        <div className="space-y-6">
          {/* Name input */}
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              お名前（修了証明書に表示されます）
            </label>
            <input
              id="userName"
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="あなたのお名前"
              className="w-full max-w-sm px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-gray-900 border border-gray-800">
              <p className="text-sm text-gray-400">完了レッスン</p>
              <p className="text-2xl font-bold text-white">
                {overall.completedLessons}
                <span className="text-sm text-gray-500">
                  /{overall.totalLessons}
                </span>
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gray-900 border border-gray-800">
              <p className="text-sm text-gray-400">完了カテゴリ</p>
              <p className="text-2xl font-bold text-white">
                {overall.completedCategories}
                <span className="text-sm text-gray-500">
                  /{overall.totalCategories}
                </span>
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gray-900 border border-gray-800">
              <p className="text-sm text-gray-400">最終試験</p>
              <p className="text-2xl font-bold text-white">
                {examResult ? `${examResult.score}点` : "未受験"}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gray-900 border border-gray-800">
              <p className="text-sm text-gray-400">全体進捗</p>
              <p className="text-2xl font-bold text-indigo-400">
                {overall.percent}%
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/final-exam"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
            >
              最終試験を受ける
            </Link>
            {showCertificate && (
              <Link
                href="/certificate"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-medium transition-colors"
              >
                修了証明書を見る
              </Link>
            )}
          </div>
        </div>

        {/* Progress ring */}
        <div className="flex items-center justify-center">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="currentColor"
                className="text-gray-800"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                className="stroke-indigo-500 transition-all duration-700"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {overall.percent}%
              </span>
              <span className="text-xs text-gray-400">完了</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category grid */}
      <h2 className="text-xl font-bold text-white mb-4">カテゴリ別進捗</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((cat) => {
          const lessons = getAllLessons(cat.id);
          const total = lessons.length;
          const { completed, percent } = getCategoryCompletionCount(
            cat.id,
            total
          );
          const complete = isCategoryComplete(cat.id, total);
          const colors = getColor(cat.color);

          return (
            <Link
              key={cat.id}
              href={cat.path}
              className="group p-4 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h3
                  className={`font-semibold ${colors.text} group-hover:underline`}
                >
                  {cat.name}
                </h3>
                {complete && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-medium">
                    完了
                  </span>
                )}
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-gray-800 mb-2">
                <div
                  className={`h-full rounded-full ${colors.bar} transition-all duration-500`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              <p className="text-sm text-gray-400">
                {completed}/{total} レッスン完了
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
