"use client";

import { useState } from "react";
import Link from "next/link";
import { saveFinalExamScore, getFinalExamResult } from "@/lib/progress";

interface ExamQuestion { question: string; options: string[]; answer: number; }

const EXAM_QUESTIONS: ExamQuestion[] = [
  { question: "PHPで変数を宣言する際に使う記号は？", options: ["@", "$", "#", "&"], answer: 1 },
  { question: "PHPで文字列を連結する演算子は？", options: ["+", "&", ".", "++"], answer: 2 },
  { question: "配列の要素数を取得する関数は？", options: ["length()", "size()", "count()", "sizeof()"], answer: 2 },
  { question: "PHP 8で追加された、switchの改良版の構文は？", options: ["case式", "match式", "when式", "select式"], answer: 1 },
  { question: "定数を定義するキーワード・関数の組み合わせとして正しいものは？", options: ["let / var", "const / define", "final / static", "immutable / readonly"], answer: 1 },
  { question: "PHPでクラスを継承するキーワードは？", options: ["inherits", "extends", "implements", "uses"], answer: 1 },
  { question: "インターフェースを実装するキーワードは？", options: ["extends", "uses", "implements", "inherits"], answer: 2 },
  { question: "トレイトを使用するキーワードは？", options: ["extends", "implements", "include", "use"], answer: 3 },
  { question: "Null合体演算子の記法は？", options: ["?.", "??", "?:", "!."], answer: 1 },
  { question: "PHPでアロー関数を定義するキーワードは？", options: ["arrow", "lambda", "fn", "func"], answer: 2 },
  { question: "コンストラクタを定義するマジックメソッド名は？", options: ["__init", "__construct", "__new", "__create"], answer: 1 },
  { question: "PDOでSQLインジェクションを防ぐために使う機能は？", options: ["エスケープ文字列", "プリペアドステートメント", "サニタイズ関数", "ファイアウォール"], answer: 1 },
  { question: "パスワードを安全にハッシュ化する関数は？", options: ["md5()", "sha1()", "password_hash()", "crypt()"], answer: 2 },
  { question: "PHP 8.1で追加された列挙型のキーワードは？", options: ["enum", "type", "struct", "enumeration"], answer: 0 },
  { question: "readonlyプロパティが追加されたPHPバージョンは？", options: ["PHP 7.4", "PHP 8.0", "PHP 8.1", "PHP 8.2"], answer: 2 },
  { question: "Composerの設定ファイル名は？", options: ["package.json", "composer.json", "composer.yaml", "packages.json"], answer: 1 },
  { question: "XSS対策で使用するPHP関数は？", options: ["strip_tags()", "htmlspecialchars()", "addslashes()", "urlencode()"], answer: 1 },
  { question: "ジェネレータ関数で値を返すキーワードは？", options: ["return", "yield", "emit", "produce"], answer: 1 },
  { question: "declare(strict_types=1) の効果は？", options: ["変数の型宣言を必須にする", "型の暗黙変換を禁止する", "nullを禁止する", "定数を不変にする"], answer: 1 },
  { question: "PHPの標準的なオートロード規約は？", options: ["PSR-1", "PSR-2", "PSR-4", "PSR-12"], answer: 2 },
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
          <h1 className="text-3xl font-bold text-gray-100 mb-4">PHP最終試験</h1>
          <p className="text-gray-400 mb-2">全{EXAM_QUESTIONS.length}問の総合テストです。80点以上で合格となります。</p>
          {prevResult && (<p className="text-sm text-gray-500 mb-6">前回のスコア: <span className={prevResult.score >= 80 ? "text-green-400" : "text-yellow-400"}>{prevResult.score}点</span></p>)}
          <button onClick={handleStart} className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors">試験を開始する</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-100 mb-6">PHP最終試験</h1>
        <div className="space-y-6">
          {EXAM_QUESTIONS.map((q, qIdx) => (
            <div key={qIdx} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="text-gray-100 font-medium mb-4"><span className="text-gray-500 mr-2">Q{qIdx + 1}.</span>{q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  let cls = "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500 hover:bg-gray-700";
                  if (submitted) { if (optIdx === q.answer) cls = "bg-green-500/20 border-green-500 text-green-300"; else if (optIdx === selected[qIdx] && selected[qIdx] !== q.answer) cls = "bg-red-500/20 border-red-500 text-red-300"; else cls = "bg-gray-800 border-gray-700 text-gray-500"; } else if (selected[qIdx] === optIdx) cls = "bg-indigo-500/20 border-indigo-500 text-indigo-400";
                  return (<button key={optIdx} onClick={() => handleSelect(qIdx, optIdx)} disabled={submitted} className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors ${cls}`}><span className="font-mono mr-2 opacity-60">{String.fromCharCode(65 + optIdx)}.</span>{opt}</button>);
                })}
              </div>
            </div>
          ))}
        </div>
        {!submitted ? (
          <button onClick={handleSubmit} disabled={selected.some((s) => s === null)} className="w-full mt-8 py-4 rounded-xl font-bold text-lg transition-colors bg-indigo-500 hover:bg-indigo-400 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white">
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
