"use client";

import { useState } from "react";
import Link from "next/link";
import { saveFinalExamScore, getFinalExamResult } from "@/lib/progress";

interface ExamQuestion { question: string; options: string[]; answer: number; }

const EXAM_QUESTIONS: ExamQuestion[] = [
  { question: "Dartで変数の型を自動推論させるキーワードは？", options: ["let", "auto", "var", "val"], answer: 2 },
  { question: "Dartのnull安全で、null許容型を宣言するには？", options: ["int? x", "int! x", "nullable int x", "int | null x"], answer: 0 },
  { question: "Dart 3で追加された、複数の値をまとめる軽量な型は？", options: ["Tuple", "Struct", "Record", "Pair"], answer: 2 },
  { question: "非同期関数の戻り値の型として正しいものは？", options: ["Async<String>", "Future<String>", "Promise<String>", "Task<String>"], answer: 1 },
  { question: "awaitキーワードが使えるのはどのような関数内か？", options: ["async修飾子が付いた関数", "void関数のみ", "static関数のみ", "どの関数でも使える"], answer: 0 },
  { question: "Dartでリストを作成する正しい方法は？", options: ["List<int> a = (1, 2, 3)", "List<int> a = {1, 2, 3}", "List<int> a = [1, 2, 3]", "List<int> a = <1, 2, 3>"], answer: 2 },
  { question: "Streamを生成する関数で使うキーワードは？", options: ["return*", "yield*", "yield", "async*とyield"], answer: 3 },
  { question: "Dart 3のsealed classの特徴は？", options: ["インスタンス化できない", "継承できない", "同一ライブラリ内でのみサブクラス化できる", "定数のみ持てる"], answer: 2 },
  { question: "Dartでコンストラクタの引数を直接フィールドに代入する構文は？", options: ["コンストラクタプロモーション", "this.パラメータ", "フィールド代入構文", "初期化リスト"], answer: 1 },
  { question: "null合体演算子の記法は？", options: ["?.", "??", "?:", "!."], answer: 1 },
  { question: "Dartでインターフェースを実装するキーワードは？", options: ["extends", "implements", "with", "uses"], answer: 1 },
  { question: "Dartでmixinを使用するキーワードは？", options: ["extends", "implements", "with", "include"], answer: 2 },
  { question: "Dartのジェネリクスで型制約を指定するキーワードは？", options: ["where", "extends", "implements", "is"], answer: 1 },
  { question: "dart:coreに含まれるMapの正しい宣言方法は？", options: ["Map<String, int> m = {}", "Dict<String, int> m = {}", "HashMap<String, int> m = {}", "map<String, int> m = {}"], answer: 0 },
  { question: "Dartのswitch式（Dart 3）で全パターンを網羅しない場合に発生するのは？", options: ["実行時エラー", "コンパイルエラー", "警告のみ", "デフォルト値が返る"], answer: 1 },
  { question: "Dartでfinalとconstの違いは？", options: ["finalは実行時定数、constはコンパイル時定数", "constは実行時定数、finalはコンパイル時定数", "違いはない", "finalはクラスのみ、constは関数のみ"], answer: 0 },
  { question: "Dartのpub.devでパッケージを管理する設定ファイルは？", options: ["package.json", "pubspec.yaml", "dart.yaml", "dependencies.yaml"], answer: 1 },
  { question: "Dartでパターンマッチングを行うswitch文でオブジェクトの型をチェックするには？", options: ["case Type:", "case is Type:", "case Type():", "instanceof Type:"], answer: 2 },
  { question: "Dartのextension methodsの目的は？", options: ["クラスを継承する", "既存の型に新しいメソッドを追加する", "インターフェースを実装する", "mixinを作成する"], answer: 1 },
  { question: "Dartで遅延初期化を示すキーワードは？", options: ["lazy", "deferred", "late", "delayed"], answer: 2 },
];

export default function FinalExamPage() {
  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState<(number | null)[]>(Array(EXAM_QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [prevResult, setPrevResult] = useState(getFinalExamResult());

  const handleStart = () => { setStarted(true); setSubmitted(false); setSelected(Array(EXAM_QUESTIONS.length).fill(null)); };
  const handleSelect = (qIdx: number, optIdx: number) => { if (submitted) return; setSelected((prev) => { const next = [...prev]; next[qIdx] = optIdx; return next; }); };
  const handleSubmit = () => {
    if (selected.some((s) => s === null)) return;
    const correct = selected.filter((s, i) => s === EXAM_QUESTIONS[i].answer).length;
    const finalScore = Math.round((correct / EXAM_QUESTIONS.length) * 100);
    setScore(finalScore);
    setSubmitted(true);
    saveFinalExamScore(finalScore);
    setPrevResult({ score: finalScore, date: new Date().toISOString() });
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-100 mb-4">Dart最終試験</h1>
          <p className="text-gray-400 mb-2">全{EXAM_QUESTIONS.length}問の総合テストです。80点以上で合格となります。</p>
          {prevResult && (<p className="text-sm text-gray-500 mb-6">前回のスコア: <span className={prevResult.score >= 80 ? "text-green-400" : "text-yellow-400"}>{prevResult.score}点</span></p>)}
          <button onClick={handleStart} className="bg-teal-500 hover:bg-teal-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors">試験を開始する</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-100 mb-6">Dart最終試験</h1>
        <div className="space-y-6">
          {EXAM_QUESTIONS.map((q, qIdx) => (
            <div key={qIdx} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="text-gray-100 font-medium mb-4"><span className="text-gray-500 mr-2">Q{qIdx + 1}.</span>{q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  let cls = "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500 hover:bg-gray-700";
                  if (submitted) { if (optIdx === q.answer) cls = "bg-green-500/20 border-green-500 text-green-300"; else if (optIdx === selected[qIdx] && selected[qIdx] !== q.answer) cls = "bg-red-500/20 border-red-500 text-red-300"; else cls = "bg-gray-800 border-gray-700 text-gray-500"; } else if (selected[qIdx] === optIdx) cls = "bg-teal-500/20 border-teal-500 text-teal-400";
                  return (<button key={optIdx} onClick={() => handleSelect(qIdx, optIdx)} disabled={submitted} className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors ${cls}`}><span className="font-mono mr-2 opacity-60">{String.fromCharCode(65 + optIdx)}.</span>{opt}</button>);
                })}
              </div>
            </div>
          ))}
        </div>
        {!submitted ? (
          <button onClick={handleSubmit} disabled={selected.some((s) => s === null)} className="w-full mt-8 py-4 rounded-xl font-bold text-lg transition-colors bg-teal-500 hover:bg-teal-400 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white">
            {selected.some((s) => s === null) ? `あと${selected.filter((s) => s === null).length}問回答してください` : "回答を提出する"}
          </button>
        ) : (
          <div className="mt-8 space-y-6">
            <div className={`p-8 rounded-2xl border text-center ${score >= 80 ? "bg-green-500/10 border-green-500" : "bg-yellow-500/10 border-yellow-500"}`}>
              <p className="text-5xl font-bold text-gray-100 mb-2">{score}点</p>
              <p className={`text-lg ${score >= 80 ? "text-green-400" : "text-yellow-400"}`}>{score >= 80 ? "合格おめでとうございます！" : "もう少しです！復習して再挑戦しましょう。"}</p>
            </div>
            <div className="flex gap-4">
              {score >= 80 && (<Link href="/certificate" className="flex-1 text-center bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 rounded-xl transition-colors">修了証明書を見る</Link>)}
              <button onClick={handleStart} className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-3 rounded-xl transition-colors">もう一度受験する</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
