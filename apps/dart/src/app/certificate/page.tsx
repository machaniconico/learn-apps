"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getFinalExamResult, getUserName } from "@/lib/progress";

export default function CertificatePage() {
  const [examResult, setExamResult] = useState<{ score: number; date: string } | null>(null);
  const [userName, setUserName] = useState("");

  useEffect(() => { setExamResult(getFinalExamResult()); setUserName(getUserName()); }, []);

  if (!examResult || examResult.score < 80) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-100 mb-4">修了証明書</h1>
          <p className="text-gray-400 mb-6">最終試験で80点以上を取得すると修了証明書が発行されます。</p>
          <Link href="/final-exam" className="bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors">最終試験を受ける</Link>
        </div>
      </div>
    );
  }

  const date = new Date(examResult.date);
  const dateStr = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-100">修了証明書</h1>
          <p className="text-gray-400 text-sm mt-1">印刷またはPDF保存してご利用ください</p>
        </div>

        <div className="bg-white text-gray-900 rounded-2xl p-12 shadow-2xl border-4 border-amber-400 print:shadow-none print:border-2">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">🎯</span>
              </div>
            </div>

            <div>
              <h2 className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-2">Certificate of Completion</h2>
              <h3 className="text-3xl font-bold text-gray-800">修了証明書</h3>
            </div>

            <div className="py-4">
              <p className="text-gray-500 text-sm mb-2">この証明書は</p>
              <p className="text-2xl font-bold text-teal-600 border-b-2 border-teal-200 inline-block px-8 pb-1">{userName || "学習者"}</p>
              <p className="text-gray-500 text-sm mt-3">が以下のコースを修了したことを証明します</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-1">DartLearn - Dart言語学習</h4>
              <p className="text-gray-500 text-sm">全25カテゴリ・163レッスン</p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div><p className="text-sm text-gray-500">最終試験スコア</p><p className="text-2xl font-bold text-teal-600">{examResult.score}点</p></div>
              <div><p className="text-sm text-gray-500">取得日</p><p className="text-lg font-semibold text-gray-700">{dateStr}</p></div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-400">DartLearn Learning Platform</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button onClick={() => window.print()} className="bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors print:hidden">
            印刷 / PDF保存
          </button>
          <Link href="/dashboard" className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold px-6 py-3 rounded-lg transition-colors print:hidden">
            ダッシュボードに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
