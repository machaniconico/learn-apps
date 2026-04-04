"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES, getAllLessons } from "@/lib/lessons-data";
import {
  getFinalExamResult,
  getUserName,
  getOverallProgress,
  isCategoryComplete,
} from "@/lib/progress";

export default function CertificatePage() {
  const [mounted] = useState(() => typeof window !== "undefined");

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="animate-pulse h-8 w-64 bg-gray-800 rounded mb-8" />
      </div>
    );
  }

  const examResult = getFinalExamResult();
  const passed = examResult !== null && examResult.score >= 80;

  if (!passed) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-extrabold text-white mb-4">
          修了証明書
        </h1>
        <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800">
          <p className="text-gray-300 text-lg mb-6">
            修了証明書を取得するには、最終試験に合格する必要があります（80点以上）。
          </p>
          <Link
            href="/final-exam"
            className="inline-block px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
          >
            最終試験を受ける
          </Link>
        </div>
      </div>
    );
  }

  const userName = getUserName() || "受講者";
  const completionDate = examResult.date
    ? new Date(examResult.date).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  const categoriesWithCounts = CATEGORIES.map((cat) => ({
    id: cat.id,
    name: cat.name,
    lessonCount: getAllLessons(cat.id).length,
  }));

  const overall = getOverallProgress(
    categoriesWithCounts.map((c) => ({ id: c.id, lessonCount: c.lessonCount }))
  );

  const completedCategories = categoriesWithCounts.filter((cat) =>
    isCategoryComplete(cat.id, cat.lessonCount)
  );

  function handlePrint() {
    window.print();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Print button - hidden in print */}
      <div className="flex justify-between items-center mb-8 print:hidden">
        <h1 className="text-3xl font-extrabold text-white">修了証明書</h1>
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
          >
            PDFをダウンロード
          </button>
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition-colors"
          >
            ダッシュボードに戻る
          </Link>
        </div>
      </div>

      <p className="text-sm text-gray-400 mb-4 print:hidden">
        ※「PDFをダウンロード」ボタンを押すと印刷ダイアログが開きます。「PDFに保存」を選択してください。画像として保存する場合はスクリーンショットをご利用ください。
      </p>

      {/* Certificate */}
      <div
        id="certificate"
        className="relative bg-white text-gray-900 rounded-2xl overflow-hidden print:rounded-none print:shadow-none"
      >
        {/* Decorative border */}
        <div className="absolute inset-0 p-3">
          <div className="w-full h-full border-4 border-amber-400 rounded-xl" />
        </div>
        <div className="absolute inset-0 p-5">
          <div className="w-full h-full border border-amber-300 rounded-lg" />
        </div>

        <div className="relative px-12 py-16 text-center">
          {/* Header decoration */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-0.5 bg-amber-400" />
            <div className="w-3 h-3 rounded-full border-2 border-amber-400 mx-3 -mt-1" />
            <div className="w-16 h-0.5 bg-amber-400" />
          </div>

          {/* Title */}
          <h2 className="text-4xl font-bold tracking-widest text-gray-800 mb-2">
            修了証明書
          </h2>
          <p className="text-sm text-gray-500 tracking-wider mb-10">
            CERTIFICATE OF COMPLETION
          </p>

          {/* Body */}
          <p className="text-gray-600 mb-4">この証明書は</p>
          <p className="text-3xl font-bold text-gray-900 mb-4 border-b-2 border-amber-400 inline-block pb-2 px-8">
            {userName}
          </p>
          <p className="text-gray-600 mb-8">殿が以下の課程を修了したことを証明します。</p>

          {/* Program name */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 mx-auto max-w-lg">
            <p className="text-lg font-bold text-indigo-700 mb-1">
              CodeLearn プログラミング学習プログラム
            </p>
            <p className="text-gray-600">全課程修了</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8 max-w-md mx-auto">
            <div>
              <p className="text-2xl font-bold text-indigo-600">
                {examResult.score}
                <span className="text-sm">点</span>
              </p>
              <p className="text-xs text-gray-500">最終試験スコア</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-600">
                {overall.completedLessons}
              </p>
              <p className="text-xs text-gray-500">完了レッスン数</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-600">
                {completedCategories.length}
              </p>
              <p className="text-xs text-gray-500">完了カテゴリ数</p>
            </div>
          </div>

          {/* Completed categories */}
          {completedCategories.length > 0 && (
            <div className="mb-8">
              <p className="text-sm font-medium text-gray-500 mb-3">
                修了カテゴリ
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {completedCategories.map((cat) => (
                  <span
                    key={cat.id}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Date */}
          <p className="text-gray-500 mb-8">{completionDate}</p>

          {/* Footer decoration */}
          <div className="flex justify-center mb-2">
            <div className="w-16 h-0.5 bg-amber-400" />
            <div className="w-3 h-3 rounded-full border-2 border-amber-400 mx-3 -mt-1" />
            <div className="w-16 h-0.5 bg-amber-400" />
          </div>

          <p className="text-xs text-gray-400 tracking-wider">
            <span className="text-indigo-500">&lt;</span>
            CodeLearn
            <span className="text-indigo-500">/&gt;</span>
          </p>
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          header,
          .print\\:hidden {
            display: none !important;
          }
          #certificate {
            box-shadow: none;
            border-radius: 0;
          }
          @page {
            margin: 1cm;
            size: A4 landscape;
          }
        }
      `}</style>
    </div>
  );
}
