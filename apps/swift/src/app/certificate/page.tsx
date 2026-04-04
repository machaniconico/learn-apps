"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getFinalExamResult,
  getUserName,
  getOverallProgress,
  isCategoryComplete,
} from "@/lib/progress";

const SWIFT_CATEGORIES = [
  { id: "basics", name: "Swift基礎" },
  { id: "control-flow", name: "制御フロー" },
  { id: "functions", name: "関数・クロージャ" },
  { id: "types", name: "型システム" },
  { id: "collections", name: "コレクション" },
  { id: "optionals", name: "Optional" },
  { id: "enums", name: "列挙型" },
  { id: "structs-classes", name: "構造体・クラス" },
  { id: "protocols", name: "プロトコル" },
  { id: "generics", name: "ジェネリクス" },
  { id: "error-handling", name: "エラー処理" },
  { id: "concurrency", name: "並行処理" },
  { id: "memory", name: "メモリ管理" },
  { id: "swiftui-basics", name: "SwiftUI基礎" },
  { id: "swiftui-state", name: "SwiftUI状態管理" },
  { id: "swiftui-layout", name: "SwiftUIレイアウト" },
  { id: "swiftui-data", name: "SwiftUIデータフロー" },
  { id: "networking", name: "ネットワーク" },
  { id: "persistence", name: "データ永続化" },
  { id: "testing", name: "テスト" },
  { id: "spm", name: "パッケージ管理" },
  { id: "debugging", name: "デバッグ" },
  { id: "performance", name: "パフォーマンス" },
  { id: "design-patterns", name: "デザインパターン" },
  { id: "advanced", name: "応用・実践" },
] as const;

function formatDate(isoString: string): string {
  const d = new Date(isoString);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export default function CertificatePage() {
  const [userName, setUserName] = useState("");
  const [examResult, setExamResult] = useState<{ score: number; date: string } | null>(null);
  const [overallProgress, setOverallProgress] = useState<{
    completedLessons: number;
    totalLessons: number;
    completedCategories: number;
    totalCategories: number;
    percent: number;
  }>({
    completedLessons: 0,
    totalLessons: 0,
    completedCategories: 0,
    totalCategories: SWIFT_CATEGORIES.length,
    percent: 0,
  });
  const [completedCategoryNames, setCompletedCategoryNames] = useState<string[]>([]);
  const [isEligible, setIsEligible] = useState(false);

  useEffect(() => {
    function loadData() {
      const categoriesWithCounts = SWIFT_CATEGORIES.map((cat) => ({
        id: cat.id,
        lessonCount: 6,
      }));
      const name = getUserName();
      const exam = getFinalExamResult();
      const overall = getOverallProgress(categoriesWithCounts);
      const completedNames = SWIFT_CATEGORIES.filter((cat) =>
        isCategoryComplete(cat.id, 6)
      ).map((cat) => cat.name);
      const examPassed = exam !== null && exam.score >= 80;
      const allCatsComplete =
        overall.completedCategories >= overall.totalCategories &&
        overall.totalCategories > 0;
      setUserName(name);
      setExamResult(exam);
      setOverallProgress(overall);
      setCompletedCategoryNames(completedNames);
      setIsEligible(examPassed || allCatsComplete);
    }
    loadData();
  }, []);

  if (!isEligible) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-100 mb-3">修了証明書はまだ受け取れません</h1>
            <p className="text-gray-400 text-sm mb-6">
              修了証明書を取得するには、最終試験で80点以上を獲得するか、全カテゴリを修了してください。
            </p>
            <div className="space-y-3">
              <Link
                href="/final-exam"
                className="block w-full bg-orange-500 hover:bg-orange-400 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                最終試験を受ける
              </Link>
              <Link
                href="/dashboard"
                className="block w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 font-semibold py-3 rounded-lg transition-colors"
              >
                ダッシュボードに戻る
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const issueDate = examResult?.date
    ? formatDate(examResult.date)
    : formatDate(new Date().toISOString());

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Action Buttons (outside certificate for print) */}
        <div className="flex flex-wrap gap-4 justify-end mb-6 print:hidden">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            ダッシュボードに戻る
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            印刷する
          </button>
        </div>

        {/* Certificate */}
        <div className="relative bg-white rounded-2xl p-1.5 shadow-2xl shadow-orange-900/20">
          {/* Border layer 1 - outermost */}
          <div className="rounded-xl border-4 border-orange-700 p-1.5">
            {/* Border layer 2 */}
            <div className="rounded-lg border-2 border-orange-500 p-1.5">
              {/* Border layer 3 */}
              <div className="rounded-md border border-orange-400 p-1.5">
                {/* Border layer 4 - innermost */}
                <div className="rounded border border-orange-300/60 bg-gradient-to-br from-orange-50 to-amber-50 px-8 py-10 sm:px-14 sm:py-14">

                  {/* Top decoration */}
                  <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-orange-400" />
                    <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-orange-400" />
                  </div>

                  {/* Title */}
                  <div className="text-center mb-8">
                    <p className="text-sm font-medium tracking-[0.3em] text-orange-700 uppercase mb-3">
                      Certificate of Completion
                    </p>
                    <h1
                      className="text-5xl sm:text-6xl font-bold text-orange-900 tracking-wide mb-2"
                      style={{ fontFamily: "serif" }}
                    >
                      修了証明書
                    </h1>
                    <div className="h-0.5 w-24 bg-gradient-to-r from-orange-400 to-amber-500 mx-auto mt-4" />
                  </div>

                  {/* Recipient */}
                  <div className="text-center mb-8">
                    <p className="text-sm text-orange-700 mb-3">以下の方がプログラムを修了したことを証明します</p>
                    <div className="inline-block border-b-2 border-orange-600 px-8 pb-1 mb-2">
                      <p className="text-3xl sm:text-4xl font-bold text-gray-800" style={{ fontFamily: "serif" }}>
                        {userName || "受講者"}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">殿</p>
                  </div>

                  {/* Program */}
                  <div className="text-center mb-8 bg-white/60 rounded-xl px-6 py-4 border border-orange-200">
                    <p className="text-sm text-orange-700 mb-1">修了プログラム</p>
                    <p className="text-xl font-bold text-orange-900">SwiftLearn Swift言語学習プログラム</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {examResult && (
                      <div className="text-center bg-white/60 rounded-xl px-4 py-4 border border-orange-200">
                        <p className="text-xs text-orange-700 mb-1">最終試験スコア</p>
                        <p className="text-3xl font-bold text-orange-800">
                          {examResult.score}
                          <span className="text-lg font-normal">点</span>
                        </p>
                      </div>
                    )}
                    <div className="text-center bg-white/60 rounded-xl px-4 py-4 border border-orange-200">
                      <p className="text-xs text-orange-700 mb-1">完了レッスン数</p>
                      <p className="text-3xl font-bold text-orange-800">
                        {overallProgress.completedLessons}
                        <span className="text-lg font-normal text-gray-500">
                          {" "}/ {overallProgress.totalLessons}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Completed Categories */}
                  {completedCategoryNames.length > 0 && (
                    <div className="mb-8 bg-white/60 rounded-xl px-5 py-4 border border-orange-200">
                      <p className="text-sm font-medium text-orange-700 mb-3 text-center">修了カテゴリ</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {completedCategoryNames.map((name) => (
                          <span
                            key={name}
                            className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-1 rounded-full border border-orange-200"
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Issue Date */}
                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-500">発行日</p>
                    <p className="text-lg font-semibold text-orange-900">{issueDate}</p>
                  </div>

                  {/* Bottom decoration */}
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-orange-400" />
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-orange-400" />
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="w-2 h-2 rounded-full bg-orange-400" />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-orange-400" />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
